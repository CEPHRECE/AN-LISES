import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ListOrdered,
  GitBranch,
  RotateCcw,
  BarChart3,
  Database,
  Settings,
  Dna,
  LogOut,
  ChevronRight,
  ShieldCheck,
  FlaskConical,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  badgeVariant?: 'default' | 'teal' | 'amber'
}

export const LAB_NAVIGATION_ITEMS: NavItem[] = [
  {
    id: 'visao-geral',
    label: 'Visão Geral',
    path: '/app',
    icon: LayoutDashboard,
  },
  {
    id: 'fila-exames',
    label: 'Fila de Exames',
    path: '/app/fila',
    icon: ListOrdered,
    badge: 48,
    badgeVariant: 'default',
  },
  {
    id: 'rastreabilidade',
    label: 'Rastreabilidade',
    path: '/app/rastreabilidade',
    icon: GitBranch,
  },
  {
    id: 'retestes',
    label: 'Retestes',
    path: '/app/retestes',
    icon: RotateCcw,
    badge: 5,
    badgeVariant: 'amber',
  },
  {
    id: 'indicadores',
    label: 'Indicadores',
    path: '/app/indicadores',
    icon: BarChart3,
  },
  {
    id: 'fontes-dados',
    label: 'Fontes de Dados',
    path: '/app/fontes',
    icon: Database,
  },
  {
    id: 'configuracoes',
    label: 'Configurações',
    path: '/app/configuracoes',
    icon: Settings,
  },
]

interface LabSidebarProps {
  currentPath?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
  onCloseMobile?: () => void
}

export const LabSidebar: React.FC<LabSidebarProps> = ({ className, onCloseMobile }) => {
  return (
    <aside
      className={cn(
        'w-64 flex-shrink-0 bg-[#102A38] text-white flex flex-col justify-between border-r border-[#1E3E50] select-none h-full',
        className,
      )}
    >
      {/* Top Section: Identity CPDHRCE */}
      <div>
        <div className="h-16 px-5 border-b border-[#1E3E50] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#087F8C] flex items-center justify-center text-white shadow-sm ring-1 ring-white/10">
              <FlaskConical className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm tracking-tight text-white font-mono">
                  CPDHRCE
                </span>
                <span className="text-[10px] font-medium px-1.5 py-0.2 bg-[#087F8C]/30 text-[#3AC0CE] rounded border border-[#087F8C]/40">
                  HLA
                </span>
              </div>
              <span className="text-[11px] text-[#8BA2AF] truncate max-w-[150px]">
                Central Laboratorial
              </span>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A7788]">
            Operação Laboratorial
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1">
          {LAB_NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/app'}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[#1D455B] text-white shadow-sm'
                      : 'text-[#8BA2AF] hover:text-white hover:bg-[#163647]',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-[#3AC0CE]' : 'text-[#8BA2AF] group-hover:text-white',
                        )}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={cn(
                          'text-[10px] font-mono px-1.5 py-0.5 rounded transition-colors',
                          item.badgeVariant === 'amber'
                            ? 'bg-[#D97706]/30 text-[#FBBF24] border border-[#D97706]/40'
                            : isActive
                              ? 'bg-white/15 text-white'
                              : 'bg-[#163647] text-[#8BA2AF] group-hover:text-white',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Active indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#3AC0CE] rounded-r-full" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>
      </div>

      {/* Bottom Section: Demonstrative User Profile & System Status */}
      <div className="p-3 border-t border-[#1E3E50] space-y-2">
        {/* Compliance indicator */}
        <div className="px-3 py-2 rounded-lg bg-[#0C202B] border border-[#1E3E50]/80 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-[#8BA2AF]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3AC0CE]" />
            <span>Ambiente B2B Seguro</span>
          </div>
          <span className="text-[10px] font-mono text-[#3AC0CE]">v1.0.0</span>
        </div>

        {/* User Card */}
        <div className="px-3 py-2 rounded-lg bg-[#163647]/60 flex items-center justify-between group hover:bg-[#163647] transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#087F8C] flex items-center justify-center text-xs font-semibold text-white shrink-0">
              DR
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">Dra. Raquel M.</p>
              <p className="text-[10px] text-[#8BA2AF] truncate">Bancada Imunogenética</p>
            </div>
          </div>

          <NavLink
            to="/"
            title="Voltar ao portal de login"
            className="p-1.5 rounded text-[#8BA2AF] hover:text-white hover:bg-[#1D455B] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>
    </aside>
  )
}

export default LabSidebar
