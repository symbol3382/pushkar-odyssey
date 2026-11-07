/** Soft overlays that keep the photo visible while giving text a readable zone. */
export function HeroScrim({
  tone = 'bottom',
}: {
  tone?: 'bottom' | 'page' | 'card';
}) {
  if (tone === 'page') {
    return (
      <>
        <div className="absolute inset-0 bg-ink/25" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-cream from-[12%] via-ink/35 via-[42%] to-ink/15"
          aria-hidden
        />
      </>
    );
  }

  if (tone === 'card') {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/10 to-transparent"
        aria-hidden
      />
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-ink/15" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
        aria-hidden
      />
    </>
  );
}
