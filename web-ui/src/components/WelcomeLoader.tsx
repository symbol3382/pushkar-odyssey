import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../content/site';
import { markWelcomeSeen } from '../lib/welcome';

interface WelcomeLoaderProps {
  onDone: () => void;
}

export function WelcomeLoader({ onDone }: WelcomeLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        markWelcomeSeen();
        setVisible(false);
        window.setTimeout(onDone, 450);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [onDone]);

  const progressWidth = `${String(progress)}%`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-maroon-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          aria-label="Loading Pushkar Tour"
        >
          <div className="mandala-bg absolute inset-0 opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-bhagwa/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 bottom-1/4 size-64 rounded-full bg-gold/20 blur-3xl"
            aria-hidden
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <motion.span
              className="mb-6 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-bhagwa-light to-bhagwa font-display text-2xl text-cream shadow-xl shadow-bhagwa/40"
              animate={{ rotate: [0, 6, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              प
            </motion.span>
            <p className="font-display text-4xl text-cream sm:text-5xl">Namaste</p>
            <p className="mt-2 font-display text-2xl text-gold-soft sm:text-3xl">{site.brandName}</p>
            <p className="mt-3 max-w-sm text-sm text-sand/75">{site.tagline}</p>

            <div className="mt-10 h-1 w-48 overflow-hidden rounded-full bg-cream/15 sm:w-64">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-bhagwa via-gold to-bhagwa-light"
                style={{ width: progressWidth }}
              />
            </div>
            <p className="mt-3 text-xs tracking-[0.25em] text-sand/50 uppercase">Opening the gates</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
