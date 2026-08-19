import { RotateCcw, Sparkles, Download } from 'lucide-react';

export default function ActionBar({
  hasImage,
  onReset,
  onApply,
  onDownload,
  isProcessing,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.08] bg-bg-card p-4">
      <button
        onClick={onReset}
        disabled={!hasImage}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:border-white/[0.15] hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw className="h-4 w-4" />
        Reset
      </button>

      <button
        onClick={onApply}
        disabled={!hasImage || isProcessing}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
      >
        <Sparkles className="h-4 w-4" />
        Apply Filter
      </button>

      <button
        onClick={onDownload}
        disabled={!hasImage}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:border-white/[0.15] hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Download className="h-4 w-4" />
        Download Result
      </button>
    </div>
  );
}
