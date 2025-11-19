// app/api/delete-channel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminStorage, getUidFromRequestAuthorizationHeader } from "@/lib/firebaseAdmin";

// Delete docs in a collection where channelId == channelId
async function deleteCollectionByChannel(
  collectionName: string,
  channelId: string
): Promise<void> {
  const snap = await adminDb
    .collection(collectionName)
    .where("channelId", "==", channelId)
    .get();

  if (snap.empty) return;

  const batch = adminDb.batch();
  snap.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
}

// Delete storage files under channels/{channelId}/
async function deleteStorageByPrefix(prefix: string): Promise<void> {
  try {
    const bucket = adminStorage.bucket();
    const [files] = await bucket.getFiles({ prefix });
    if (!files || files.length === 0) return;

    await Promise.all(files.map((file) => file.delete()));
  } catch (err) {
    console.error("Error deleting storage for prefix", prefix, err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const uid = await getUidFromRequestAuthorizationHeader(authHeader);

    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Optionally the client can send a channelId in the body.
    // For now we just accept it but also handle the case where it's missing.
    let channelId: string | null = null;
    try {
      const body = await req.json();
      if (body && typeof body.channelId === "string") {
        channelId = body.channelId;
      }
    } catch {
      // no body, that's fine
    }

    // If no channelId given, just pick the first channel owned by this user
    if (!channelId) {
      const channelsSnap = await adminDb
        .collection("channels")
        .where("ownerUid", "==", uid)
        .limit(1)
        .get();

      if (channelsSnap.empty) {
        return NextResponse.json(
          { error: "No creator channel found for this user." },
          { status: 404 }
        );
      }

      channelId = channelsSnap.docs[0].id;
    }

    // 1) Delete the channel document itself
    const channelRef = adminDb.collection("channels").doc(channelId);
    await channelRef.delete();

    // 2) Delete all docs tied to this channel
    const channelCollections = [
      "videos",
      "shorts",
      "posts",
      "thumbnails",
      "comments",
      "likes",
      "follows",
    ];
    for (const col of channelCollections) {
      await deleteCollectionByChannel(col, channelId);
    }

    // 3) Delete storage (thumbnails, channel media)
    await deleteStorageByPrefix(`channels/${channelId}/`);

    // TODO: Delete any Cloudflare R2 objects for this channel later.

    return NextResponse.json({ success: true, channelId });
  } catch (err: any) {
    console.error("Error deleting channel", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete channel" },
      { status: 500 }
    );
  }
}
