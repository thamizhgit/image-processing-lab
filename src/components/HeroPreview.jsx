import { motion } from 'framer-motion';
import { ArrowDown, Grid3x3 } from 'lucide-react';

const KERNEL = [
  [-1, 0, 1],
  [-2, 0, 2],
  [-1, 0, 1],
];

function MiniImage({ label, gradient }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`h-16 w-24 overflow-hidden rounded-md border border-white/[0.08] ${gradient ? 'checkerboard' : ''}`}
      >
        {gradient ? (
          <div className="h-full w-full bg-gradient-to-br from-indigo-500 via-cyan-400 to-pink-400" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-secondary">
            <div className="grid grid-cols-4 gap-0.5 p-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor: `rgba(99, 102, 241, ${0.2 + (i % 4) * 0.2})`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="text-[10px] font-medium tracking-wide text-text-dim">{label}</span>
    </div>
  );
}

function MiniKernel() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-md border border-white/[0.08] bg-bg-card p-2">
        <div className="grid grid-cols-3 gap-1">
          {KERNEL.flat().map((val, i) => (
            <div
              key={i}
              className={`flex h-6 w-6 items-center justify-center rounded text-[9px] font-mono font-medium ${
                val > 0
                  ? 'bg-cyan/10 text-cyan'
                  : val < 0
                    ? 'bg-red-500/10 text-red-400'
                    : 'text-text-dim'
              }`}
            >
              {val}
            </div>
          ))}
        </div>
      </div>
      <span className="text-[10px] font-medium tracking-wide text-text-dim">3×3 Kernel</span>
    </div>
  );
}

export default function HeroPreview() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-bg-card/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <Grid3x3 className="h-4 w-4 text-accent" />
        <span className="text-xs font-medium tracking-wider text-text-muted">
          PROCESSING PIPELINE
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <MiniImage label="Original" gradient />
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-text-dim" />
        </motion.div>
        <MiniImage label="Pixel Grid" />
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.3 }}
        >
          <ArrowDown className="h-4 w-4 text-text-dim" />
        </motion.div>
        <MiniKernel />
        <motion.div
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.6 }}
        >
          <ArrowDown className="h-4 w-4 text-text-dim" />
        </motion.div>
        <MiniImage label="Processed" gradient={false} />
      </div>
    </div>
  );
}
