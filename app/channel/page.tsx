// app/channel/page.tsx
export default function ChannelIndex() {
  return (
    <div style={{minHeight:'100vh',background:'#7B0F24',color:'#FFF9F0',padding:24}}>
      <h1 style={{fontSize:28,marginBottom:12}}>Channel index OK</h1>
      <p>Click the test link below to try the dynamic route.</p>
      <p style={{marginTop:12}}>
        <a href="/channel/sample" style={{color:'#FFD700',textDecoration:'underline'}}>
          Go to /channel/sample
        </a>
      </p>
    </div>
  );
}
