import { Layers, Sun, Moon, RotateCcw } from 'lucide-react';

export default function Navbar({ page, onNavigate, theme, onToggleTheme, onReset, showReset = false }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-text transition-colors hover:text-accent"
          aria-label="Go to home"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15">
            <Layers className="h-4 w-4 text-accent" />
          </div>
          <span className="text-sm font-semibold tracking-tight">ImageLab</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('lab')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              page === 'lab'
                ? 'bg-white/[0.06] text-text'
                : 'text-text-muted hover:text-text'
            }`}
          >
            Lab
          </button>
          <button
            onClick={() => onNavigate('how-it-works')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              page === 'how-it-works'
                ? 'bg-white/[0.06] text-text'
                : 'text-text-muted hover:text-text'
            }`}
          >
            How It Works
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] text-text-muted transition-colors hover:border-white/[0.15] hover:text-text"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {showReset && (
            <button
              onClick={onReset}
              className="flex h-8 items-center gap-1.5 rounded-md border border-white/[0.08] px-2.5 text-xs font-medium text-text-muted transition-colors hover:border-white/[0.15] hover:text-text"
              aria-label="Reset lab"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
