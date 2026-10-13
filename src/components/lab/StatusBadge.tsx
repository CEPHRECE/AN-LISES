import React from 'react'
import { cn } from '@/lib/utils'

export type StatusVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'neutral'

interface StatusBadgeProps {
  children: React.ReactNode
  variant?: StatusVariant
  size?: 'sm' | 'md'
  dot?: boolean
  pulse?: boolean
  className?: string
}

const variantStyles: Record<StatusVariant, { badge: string; dot: string }> = {
  default: {
    badge: 'bg-[#EEF3F6] text-[#172B36] border-[#D9E3EA]',
    dot: 'bg-[#596E79]',
  },
  primary: {
    badge: 'bg-[#E6F4F6] text-[#087F8C] border-[#B8E2E7]',
    dot: 'bg-[#087F8C]',
  },
  success: {
    badge: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
    dot: 'bg-[#10B981]',
  },
  warning: {
    badge: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    dot: 'bg-[#F59E0B]',
  },
  danger: {
    badge: 'bg-[#FFE4E6] text-[#9F1239] border-[#FECDD3]',
    dot: 'bg-[#F43F5E]',
  },
  info: {
    badge: 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]',
    dot: 'bg-[#3B82F6]',
  },
  neutral: {
    badge: 'bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]',
    dot: 'bg-[#94A3B8]',
  },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = true,
  pulse = false,
  className,
}) => {
  const styles = variantStyles[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-md transition-colors',
        size === 'sm' ? 'text-[11px] px-2 py-0.5 gap-1.5' : 'text-xs px-2.5 py-1 gap-2',
        styles.badge,
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          {pulse && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                styles.dot,
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-1.5 w-1.5', styles.dot)} />
        </span>
      )}
      <span>{children}</span>
    </span>
  )
}

export default StatusBadge
