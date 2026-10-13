import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Search,
  Bell,
  ChevronRight,
  Menu,
  Command,
  HelpCircle,
  FlaskConical,
  Activity,
  Layers,
} from 'lucide-react'
import { LAB_NAVIGATION_ITEMS } from './LabSidebar'

interface LabHeaderProps {
  onOpenMobileMenu: () => void
  onOpenCommand?: () => void
}

export const LabHeader: React.FC<LabHeaderProps> = ({ onOpenMobileMenu, onOpenCommand }) => {
  const location = useLocation()

  // Determine current breadcrumb
  const currentNavItem = LAB_NAVIGATION_ITEMS.find(
    (item) =>
      item.path === location.pathname ||
      (item.path !== '/app' && location.pathname.startsWith(item.path)),
  )

  return (
    <header className="h-16 border-b border-[#E5EBEF] bg-white sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between select-none">
      {/* Left: Mobile menu toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-[#596E79] hover:text-[#172B36] hover:bg-[#F8FAFB] transition-colors"
          aria-label="Abrir menu lateral"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Clean Linear/Vercel Breadcrumb */}
        <nav aria-label="Navegação estrutural" className="flex items-center gap-1.5 text-xs">
          <Link
            to="/app"
            className="text-[#8A9BA8] hover:text-[#172B36] transition-colors font-medium flex items-center gap-1"
          >
            <span>CPDHRCE</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#CBD8E0]" />
          <span className="text-[#172B36] font-semibold">
            {currentNavItem ? currentNavItem.label : 'Central Laboratorial'}
          </span>
        </nav>
      </div>

      {/* Center/Right: Quick Search Command trigger, Notifications, User info */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Bar / Command Palette trigger */}
        <button
          type="button"
          onClick={onOpenCommand}
          className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#F8FAFB] hover:bg-[#EEF3F6] border border-[#E5EBEF] text-[#8A9BA8] hover:text-[#172B36] text-xs transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="font-normal">Buscar exame, protocolo ou loco...</span>
          <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#CBD8E0] rounded text-[#596E79] shadow-2xs">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] font-medium text-[#065F46]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>Equipamentos Online</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            title="Notificações operacionais"
            className="p-2 rounded-lg text-[#596E79] hover:text-[#172B36] hover:bg-[#F8FAFB] border border-transparent hover:border-[#E5EBEF] transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E11D48] ring-2 ring-white" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-[#E5EBEF]" />

        {/* Quick User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#102A38] text-[#3AC0CE] flex items-center justify-center text-xs font-semibold ring-1 ring-[#1E3E50]">
            RM
          </div>
          <div className="hidden xl:block text-left">
            <p className="text-xs font-medium text-[#172B36] leading-tight">Dra. Raquel M.</p>
            <p className="text-[10px] text-[#8A9BA8] leading-tight">Biomédica HLA</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LabHeader
