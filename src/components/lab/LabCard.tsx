import React from 'react'
import { cn } from '@/lib/utils'

interface LabCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'highlight' | 'interactive'
  noPadding?: boolean
}

export const LabCard = React.forwardRef<HTMLDivElement, LabCardProps>(
  ({ children, className, variant = 'default', noPadding = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border transition-all duration-150',
          variant === 'default' &&
            'bg-white border-[#E5EBEF] shadow-[0_1px_3px_rgba(16,42,56,0.03)]',
          variant === 'subtle' && 'bg-[#F8FAFB] border-[#E5EBEF]',
          variant === 'highlight' &&
            'bg-white border-[#087F8C]/30 shadow-[0_4px_12px_rgba(8,127,140,0.06)]',
          variant === 'interactive' &&
            'bg-white border-[#E5EBEF] hover:border-[#CBD8E0] hover:shadow-[0_4px_16px_rgba(16,42,56,0.05)] cursor-pointer',
          !noPadding && 'p-5 sm:p-6',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

LabCard.displayName = 'LabCard'

export const LabCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 pb-4 border-b border-[#EEF3F6]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const LabCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h3 className={cn('text-sm font-semibold text-[#172B36] tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
}

export const LabCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <p className={cn('text-xs text-[#596E79] mt-0.5', className)} {...props}>
      {children}
    </p>
  )
}

export const LabCardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('pt-4', className)} {...props}>
      {children}
    </div>
  )
}

export default LabCard
