import { motion } from 'framer-motion';

export default function NeighborhoodMatrix({ neighborhood, selectedPixel }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
      <h3 className="mb-4 text-xs font-semibold tracking-wider text-text-muted">
        3 × 3 NEIGHBOURHOOD
      </h3>

      {!neighborhood ? (
        <p className="py-8 text-center text-sm text-text-muted">
          Select a pixel to view its neighbourhood.
        </p>
      ) : (
        <motion.div
          key={selectedPixel ? `${selectedPixel.x}-${selectedPixel.y}` : 'empty'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mx-auto max-w-[240px]">
            <div className="grid grid-cols-3 gap-1.5">
              {neighborhood.flat().map((value, i) => {
                const isCenter = i === 4;
                return (
                  <div
                    key={i}
                    className={`relative flex aspect-square items-center justify-center rounded-lg border font-mono text-sm font-medium ${
                      isCenter
                        ? 'border-accent/60 bg-accent/15 text-accent'
                        : 'border-white/[0.08] bg-bg-secondary text-text-muted'
                    }`}
                  >
                    {value}
                    {isCenter && (
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-sans font-medium text-accent">
                        Selected Pixel
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
