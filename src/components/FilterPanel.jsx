import { Check } from 'lucide-react';
import { FILTER_GROUPS, FILTERS } from '../utils/kernels';

export default function FilterPanel({ selectedFilter, onSelectFilter, disabled }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold tracking-wider text-text-muted">FILTERS</h3>
      <div className="space-y-4">
        {Object.entries(FILTER_GROUPS).map(([key, group]) => (
          <div key={key}>
            <p className="mb-2 text-[10px] font-semibold tracking-widest text-text-dim">
              {group.label}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {group.filters.map((filterId) => {
                const filter = FILTERS[filterId];
                const isSelected = selectedFilter === filterId;
                return (
                  <button
                    key={filterId}
                    disabled={disabled}
                    onClick={() => onSelectFilter(filterId)}
                    className={`relative flex items-center justify-between rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                      disabled
                        ? 'cursor-not-allowed opacity-40'
                        : 'cursor-pointer hover:border-white/[0.15]'
                    } ${
                      isSelected
                        ? 'border-accent/60 bg-accent/10 text-text'
                        : 'border-white/[0.08] bg-bg-secondary text-text-muted'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {filter.name}
                    {isSelected && <Check className="h-3.5 w-3.5 text-accent" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
