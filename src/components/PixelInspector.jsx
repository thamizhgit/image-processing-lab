import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

export default function PixelInspector({ pixel }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-bg-card p-5">
      <h3 className="mb-4 text-xs font-semibold tracking-wider text-text-muted">
        PIXEL INSPECTOR
      </h3>

      {!pixel ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <MousePointerClick className="h-8 w-8 text-text-dim" />
          <p className="text-sm text-text-muted">
            Click any pixel in the image to inspect it.
          </p>
        </div>
      ) : (
        <motion.div
          key={`${pixel.x}-${pixel.y}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <Stat label="X" value={pixel.x} />
          <Stat label="Y" value={pixel.y} />
          <div className="col-span-2">
            <p className="mb-2 text-[10px] font-semibold tracking-widest text-text-dim">RGB</p>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-lg border border-white/[0.08]"
                style={{ backgroundColor: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})` }}
                aria-hidden="true"
              />
              <p className="font-mono text-lg font-semibold text-text">
                {pixel.r}{' '}
                <span className="text-text-dim">{pixel.g}</span>{' '}
                <span className="text-text-dim">{pixel.b}</span>
              </p>
            </div>
          </div>
          <Stat label="Intensity" value={pixel.intensity} className="col-span-2" large />
        </motion.div>
      )}
    </div>
  );
}

function Stat({ label, value, className = '', large = false }) {
  return (
    <div className={className}>
      <p className="mb-1 text-[10px] font-semibold tracking-widest text-text-dim">{label}</p>
      <p className={`font-mono font-semibold text-text ${large ? 'text-2xl' : 'text-xl'}`}>
        {value}
      </p>
    </div>
  );
}
