/** Splits a headline into words that rise into place when their chapter becomes active. */
export function Words({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  return (
    <>
      <span className="sr-only-text" style={srOnly}>
        {text}
      </span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="w">
              <span style={{ '--i': i } as React.CSSProperties}>{word}</span>
            </span>{' '}
          </span>
        ))}
      </span>
    </>
  );
}

const srOnly: React.CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  border: 0,
};
