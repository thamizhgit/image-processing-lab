import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';

export default function ProcessingOverlay({ status }) {
  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-bg-primary/70 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-3">
            {status === 'processing' ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin text-accent" />
                <p className="text-sm font-medium text-text-muted">Processing image...</p>
                <div className="h-1 w-32 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  />
                </div>
              </>
            ) : (
              <>
                <Check className="h-6 w-6 text-emerald-400" />
                <p className="text-sm font-medium text-emerald-400">Processing complete</p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
