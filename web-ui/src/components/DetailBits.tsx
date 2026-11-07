import { useState } from 'react';
import { ImageLightbox } from './ImageLightbox';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <h2 className="mt-10 font-display text-2xl text-ink">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => {
              setActiveIndex(index);
            }}
            className="group relative overflow-hidden rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bhagwa"
            aria-label={`View ${image.alt || 'gallery image'} fullscreen`}
          >
            <img
              src={image.src}
              alt={image.alt}
              srcSet={image.srcSet}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {activeIndex !== null ? (
        <ImageLightbox
          images={images}
          index={activeIndex}
          onIndexChange={setActiveIndex}
          onClose={() => {
            setActiveIndex(null);
          }}
        />
      ) : null}
    </>
  );
}
