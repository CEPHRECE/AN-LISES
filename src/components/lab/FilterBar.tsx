import React from 'react'
import { Search, SlidersHorizontal, RotateCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  filterOptions?: FilterOption[]
  selectedFilter?: string
  onFilterSelect?: (value: string) => void
  actions?: React.ReactNode
  onRefresh?: () => void
  totalCount?: number
  className?: string
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Filtrar por protocolo, amostra ou loco...',
  filterOptions = [],
  selectedFilter,
  onFilterSelect,
  actions,
  onRefresh,
  totalCount,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-[#E5EBEF] shadow-[0_1px_2px_rgba(16,42,56,0.02)]',
        className,
      )}
    >
      <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search input with clean Linear-style focus */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9BA8] pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm bg-[#F8FAFB] hover:bg-white text-[#172B36] placeholder-[#8A9BA8] rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/15 focus:bg-white transition-all"
          />
        </div>

        {/* Filter chips */}
        {filterOptions.length > 0 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filterOptions.map((opt) => {
              const active = selectedFilter === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onFilterSelect?.(opt.value)}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 border',
                    active
                      ? 'bg-[#102A38] text-white border-[#102A38]'
                      : 'bg-[#F8FAFB] text-[#596E79] border-[#E5EBEF] hover:bg-[#EEF3F6] hover:text-[#172B36]',
                  )}
                >
                  <span>{opt.label}</span>
                  {opt.count !== undefined && (
                    <span
                      className={cn(
                        'px-1.5 py-0.2 rounded text-[10px] font-mono',
                        active ? 'bg-white/20 text-white' : 'bg-[#E5EBEF] text-[#596E79]',
                      )}
                    >
                      {opt.count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#EEF3F6]">
        {totalCount !== undefined && (
          <span className="text-xs text-[#8A9BA8] font-mono pr-2">
            {totalCount} {totalCount === 1 ? 'registro' : 'registros'}
          </span>
        )}

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            title="Atualizar dados"
            className="p-1.5 rounded-lg border border-[#E5EBEF] bg-white hover:bg-[#F8FAFB] text-[#596E79] hover:text-[#172B36] transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        )}

        {actions}
      </div>
    </div>
  )
}

export default FilterBar
