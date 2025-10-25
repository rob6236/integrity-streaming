export default function CreatePage() {
  const burgundy = "#7B0F24";
  const gold = "#FFD700";

  return (
    <main
      className="min-h-[calc(100vh-0px)] p-6 text-white"
      style={{
        backgroundColor: burgundy,
        boxShadow: `inset 0 0 0 2px ${gold}`,
      }}
    >
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Create</h1>
        <p className="mt-3 opacity-90">
          Creator tools are coming soon. This page is just a placeholder so the
          <span className="font-semibold"> Create </span>button navigates.
        </p>
      </div>
    </main>
  );
}
