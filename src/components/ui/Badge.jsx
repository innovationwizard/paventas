export default function Badge({ children, color, bg }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 50,
      fontSize: 11, fontWeight: 600, color, background: bg, letterSpacing: '0.03em',
      fontFamily: "'DM Sans', sans-serif",
    }}>{children}</span>
  );
}
