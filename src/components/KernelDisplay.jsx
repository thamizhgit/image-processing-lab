import { motion } from 'framer-motion';
import { FILTERS, formatKernelValue } from '../utils/kernels';

export default function KernelDisplay({ filterId }) {
  const filter = FILTERS[filterId];

  if (!filter || filter.type === 'none') {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
        <h3 className="mb-1 text-xs font-semibold tracking-wider text-text-muted">KERNEL</h3>
        <p className="mb-4 text-xs text-text-dim">No kernel applied</p>
        <p className="py-8 text-center text-sm text-text-muted">
          Select a spatial or edge detection filter to view its kernel.
        </p>
      </div>
    );
  }

  if (filter.type === 'point') {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
        <h3 className="mb-1 text-xs font-semibold tracking-wider text-text-muted">KERNEL</h3>
        <p className="mb-4 text-xs text-text-dim">{filter.name} • Point Operation</p>
        <div className="rounded-lg border border-white/[0.08] bg-bg-secondary p-4 font-mono text-sm text-text-muted">
          {filter.id === 'grayscale' && (
            <div className="space-y-1">
              <p>gray = 0.299R + 0.587G + 0.114B</p>
            </div>
          )}
          {filter.id === 'invert' && (
            <div className="space-y-1">
              <p>output = 255 − input</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const kernel = filter.kernel;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
      <h3 className="mb-1 text-xs font-semibold tracking-wider text-text-muted">KERNEL</h3>
      <p className="mb-4 text-xs text-text-dim">
        {filter.name} • 3 × 3
      </p>

      <motion.div
        key={filterId}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mx-auto max-w-[240px]"
      >
        <div className="grid grid-cols-3 gap-1.5">
          {kernel.flat().map((value, i) => (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-lg border font-mono text-sm font-medium ${
                value > 0
                  ? 'border-cyan/20 bg-cyan/8 text-cyan'
                  : value < 0
                    ? 'border-red-500/20 bg-red-500/8 text-red-400'
                    : 'border-white/[0.08] bg-bg-secondary text-text-dim'
              }`}
            >
              {formatKernelValue(value)}
            </div>
          ))}
        </div>
      </motion.div>

      <p className="mt-4 text-center text-[11px] text-text-dim">Kernel Size: 3 × 3</p>
    </div>
  );
}
