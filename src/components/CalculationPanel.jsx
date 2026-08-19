import { motion } from 'framer-motion';
import { formatKernelValue } from '../utils/kernels';

function formatWeight(weight) {
  if (Math.abs(weight - 1 / 9) < 0.001) return '1/9';
  return formatKernelValue(weight);
}

export default function CalculationPanel({ calculation, filterName, hasKernel }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
      <h3 className="mb-1 text-xs font-semibold tracking-wider text-text-muted">
        PIXEL CALCULATION
      </h3>
      <p className="mb-4 text-xs text-text-dim">
        {hasKernel ? 'Neighbourhood × Kernel' : 'Point operation'}
      </p>

      {!calculation ? (
        <p className="py-8 text-center text-sm text-text-muted">
          Select a pixel and filter to see the calculation.
        </p>
      ) : calculation.type === 'point' ? (
        <motion.div
          key={calculation.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3 font-mono text-sm"
        >
          <div className="rounded-lg border border-white/[0.08] bg-bg-secondary p-4 text-text-muted">
            {calculation.formula}
          </div>
          <div className="border-t border-white/[0.08] pt-4">
            <p className="mb-1 text-[10px] font-sans font-semibold tracking-widest text-text-dim">
              OUTPUT PIXEL
            </p>
            <p className="font-mono text-2xl font-semibold text-accent">{calculation.result}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={calculation.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-bg-secondary p-4 font-mono text-xs leading-relaxed text-text-muted sm:text-sm">
            {calculation.rows.map((row, rowIdx) => (
              <div key={rowIdx} className={rowIdx > 0 ? 'mt-1' : ''}>
                {rowIdx > 0 && <span className="text-text-dim">+ </span>}
                <span>
                  (
                  {row
                    .filter((t) => t.weight !== 0)
                    .map((t, i) => (
                      <span key={i}>
                        {i > 0 && ' + '}
                        ({t.value} × {formatWeight(t.weight)})
                      </span>
                    ))}
                  {row.every((t) => t.weight === 0) && '0'}
                  )
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/[0.08] pt-4">
            <p className="mb-1 text-[10px] font-semibold tracking-widest text-text-dim">
              OUTPUT PIXEL
            </p>
            <p className="font-mono text-2xl font-semibold text-accent">{calculation.result}</p>
            {filterName && (
              <p className="mt-1 text-[11px] text-text-dim">via {filterName}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
