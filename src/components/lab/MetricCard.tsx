import React from 'react'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { LabCard } from './LabCard'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger'
  subtext?: string
  icon?: React.ReactNode
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  change,
  trend,
  subtext,
  icon,
  className,
}) => {
  return (
    <LabCard
      className={cn('relative overflow-hidden flex flex-col justify-between group', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium text-[#596E79] uppercase tracking-wider">{label}</span>
        {icon && (
          <div className="p-1.5 rounded-md bg-[#F1F5F8] text-[#102A38] border border-[#E5EBEF]">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172B36] font-mono">
          {value}
        </span>
        {unit && <span className="text-xs font-normal text-[#8A9BA8]">{unit}</span>}
      </div>

      {(change || subtext) && (
        <div className="mt-3 pt-3 border-t border-[#EEF3F6] flex items-center justify-between text-xs">
          {change && (
            <div
              className={cn(
                'inline-flex items-center gap-1 font-medium',
                trend === 'up' && 'text-[#059669]',
                trend === 'down' && 'text-[#087F8C]',
                trend === 'neutral' && 'text-[#D97706]',
                !trend && 'text-[#596E79]',
              )}
            >
              {trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5" />}
              {trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}

          {subtext && (
            <span
              className={cn(
                'text-[#8A9BA8]',
                change ? 'text-[11px] text-right max-w-[65%] truncate' : 'text-xs leading-relaxed',
              )}
            >
              {subtext}
            </span>
          )}
        </div>
      )}
    </LabCard>
  )
}

export default MetricCard
