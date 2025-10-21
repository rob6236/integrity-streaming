// app/(protected)/studio/page.tsx
import RequireAuth from '../../_components/RequireAuth';
export const dynamic = 'force-dynamic';

export default function StudioPage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px' }}>
      <RequireAuth>
        <h1>Studio</h1>
        <p>Only visible when signed in.</p>
      </RequireAuth>
    </main>
  );
}
