import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
} from 'react';
import { createPortal } from 'react-dom';
import {
  HiMiniChevronLeft,
  HiMiniChevronRight,
  HiMiniMinus,
  HiMiniPlus,
  HiMiniXMark,
} from 'react-icons/hi2';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.35;

export interface LightboxImage {
  src: string;
  alt: string;
  srcSet?: string;
}

export function ImageLightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  const count = images.length;
  const safeIndex = count === 0 ? 0 : ((index % count) + count) % count;
  const active = images[safeIndex] as LightboxImage | undefined;
  const canNavigate = count > 1;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && canNavigate) {
        onIndexChange((safeIndex - 1 + count) % count);
      }
      if (event.key === 'ArrowRight' && canNavigate) {
        onIndexChange((safeIndex + 1) % count);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [canNavigate, count, safeIndex, onClose, onIndexChange]);

  if (active === undefined) return null;

  const goPrev = () => {
    if (!canNavigate) return;
    onIndexChange((safeIndex - 1 + count) % count);
  };

  const goNext = () => {
    if (!canNavigate) return;
    onIndexChange((safeIndex + 1) % count);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={active.alt || 'Image preview'}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] inline-flex size-11 items-center justify-center rounded-sm bg-cream/15 text-cream transition hover:bg-cream/25"
        aria-label="Close image"
      >
        <HiMiniXMark className="size-6" aria-hidden />
      </button>

      {canNavigate ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="absolute top-1/2 left-3 z-[110] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-sm bg-cream/15 text-cream transition hover:bg-cream/25 sm:left-5"
            aria-label="Previous image"
          >
            <HiMiniChevronLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute top-1/2 right-3 z-[110] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-sm bg-cream/15 text-cream transition hover:bg-cream/25 sm:right-5"
            aria-label="Next image"
          >
            <HiMiniChevronRight className="size-6" aria-hidden />
          </button>
          <p className="absolute top-4 left-4 z-[110] rounded-sm bg-cream/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-cream">
            {safeIndex + 1} / {count}
          </p>
        </>
      ) : null}

      <LightboxStage key={active.src} image={active} />
    </div>,
    document.body,
  );
}

function LightboxStage({ image }: { image: LightboxImage }) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '+' || event.key === '=') {
        setZoom((value) => clampZoom(value + ZOOM_STEP));
      }
      if (event.key === '-' || event.key === '_') {
        setZoom((value) => clampZoom(value - ZOOM_STEP));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const changeZoom = (next: number) => {
    const clamped = clampZoom(next);
    setZoom(clamped);
    if (clamped <= MIN_ZOOM) setOffset({ x: 0, y: 0 });
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const direction = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    changeZoom(zoom + direction);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (zoom <= MIN_ZOOM) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    setDragging(true);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    const current = drag.current;
    if (current?.pointerId !== event.pointerId) return;
    setOffset({
      x: current.originX + (event.clientX - current.startX),
      y: current.originY + (event.clientY - current.startY),
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLImageElement>) => {
    const current = drag.current;
    if (current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="contents" onWheel={onWheel}>
      <div className="absolute bottom-4 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2 rounded-sm bg-cream/15 p-1.5 backdrop-blur-sm">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            changeZoom(zoom - ZOOM_STEP);
          }}
          className="inline-flex size-10 items-center justify-center rounded-sm text-cream transition hover:bg-cream/20 disabled:opacity-40"
          aria-label="Zoom out"
          disabled={zoom <= MIN_ZOOM}
        >
          <HiMiniMinus className="size-5" aria-hidden />
        </button>
        <span className="min-w-14 text-center text-xs font-semibold tracking-wide text-cream">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            changeZoom(zoom + ZOOM_STEP);
          }}
          className="inline-flex size-10 items-center justify-center rounded-sm text-cream transition hover:bg-cream/20 disabled:opacity-40"
          aria-label="Zoom in"
          disabled={zoom >= MAX_ZOOM}
        >
          <HiMiniPlus className="size-5" aria-hidden />
        </button>
      </div>

      <img
        src={image.src}
        alt={image.alt}
        srcSet={image.srcSet}
        sizes="100vw"
        draggable={false}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onDoubleClick={(event) => {
          event.stopPropagation();
          changeZoom(zoom > MIN_ZOOM ? MIN_ZOOM : 2);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`max-h-[min(92vh,920px)] max-w-[min(96vw,1200px)] object-contain select-none ${
          zoom > MIN_ZOOM ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
        }`}
        style={{
          transform: `translate3d(${String(offset.x)}px, ${String(offset.y)}px, 0) scale(${String(zoom)})`,
          transition: dragging ? 'none' : 'transform 160ms ease-out',
        }}
      />
    </div>
  );
}

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}
