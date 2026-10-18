export function BulletList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <h2 className="mt-10 font-display text-2xl text-ink">{title}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-ink-soft">
            <span className="text-bhagwa" aria-hidden>
              ✦
            </span>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export function TextBlock({ title, text }: { title: string; text?: string }) {
  if (!text) return null;
  return (
    <>
      <h2 className="mt-10 font-display text-2xl text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
    </>
  );
}

export function Gallery({
  images,
  title,
}: {
  title: string;
  images: { src: string; alt: string; srcSet?: string }[];
}) {
  if (images.length === 0) return null;
  return (
    <>
      <h2 className="mt-10 font-display text-2xl text-ink">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {images.map((image) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            srcSet={image.srcSet}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-video w-full rounded-sm object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
}
