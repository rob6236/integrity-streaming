// app/api/delete-account/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  adminAuth,
  adminDb,
  adminStorage,
  getUidFromRequestAuthorizationHeader,
} from "@/lib/firebaseAdmin";

// Delete all documents in a collection where a field matches the uid
async function deleteCollectionByOwner(
  collectionName: string,
  uid: string
): Promise<void> {
  const snap = await adminDb
    .collection(collectionName)
    .where("ownerUid", "==", uid)
    .get();

  if (snap.empty) return;

  const batch = adminDb.batch();
  snap.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
}

// Delete all storage files under a prefix
async function deleteStorageByPrefix(prefix: string): Promise<void> {
  try {
    const bucket = adminStorage.bucket();
    const [files] = await bucket.getFiles({ prefix });

    if (!files || files.length === 0) return;

    await Promise.all(files.map((file) => file.delete()));
  } catch (err) {
    console.error("Error deleting storage files for prefix", prefix, err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const uid = await getUidFromRequestAuthorizationHeader(authHeader);

    if (!uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1) Delete the user profile document
    const userDocRef = adminDb.collection("users").doc(uid);
    const userDoc = await userDocRef.get();

    let ownedChannelIds: string[] = [];

    if (userDoc.exists) {
      const data = userDoc.data() || {};
      if (Array.isArray(data.channelIds)) {
        ownedChannelIds = data.channelIds;
      } else if (typeof data.primaryChannelId === "string") {
        ownedChannelIds = [data.primaryChannelId];
      }
    }

    // 2) Delete any channels owned by this user
    const channelsSnap = await adminDb
      .collection("channels")
      .where("ownerUid", "==", uid)
      .get();

    channelsSnap.forEach((doc) => {
      ownedChannelIds.push(doc.id);
    });

    const batch = adminDb.batch();
    if (userDoc.exists) batch.delete(userDocRef);
    channelsSnap.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // 3) Delete content documents owned by this user
    const collectionsToClean = [
      "videos",
      "shorts",
      "posts",
      "thumbnails",
      "comments",
      "likes",
      "follows",
    ];

    for (const col of collectionsToClean) {
      await deleteCollectionByOwner(col, uid);
    }

    // 4) Delete storage files
    // Assumes you store under users/{uid}/ and channels/{channelId}/
    await deleteStorageByPrefix(`users/${uid}/`);

    const uniqueChannelIds = Array.from(new Set(ownedChannelIds));
    for (const channelId of uniqueChannelIds) {
      await deleteStorageByPrefix(`channels/${channelId}/`);
    }

    // TODO: If you also store large video files in Cloudflare R2,
    // you can add deletion calls here later using the video keys.

    // 5) Finally delete the Auth user
    await adminAuth.deleteUser(uid);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Error deleting account", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete account" },
      { status: 500 }
    );
  }
}
