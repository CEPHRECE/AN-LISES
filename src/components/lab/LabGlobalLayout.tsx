import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { LabSidebar } from './LabSidebar'
import { LabHeader } from './LabHeader'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Search, ArrowRight, Dna, FileText } from 'lucide-react'
import { MOCK_EXAM_SAMPLES } from '@/data/labMockData'

export const LabGlobalLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [commandSearch, setCommandSearch] = useState('')

  // Filter samples for quick command palette
  const filteredCommandSamples = MOCK_EXAM_SAMPLES.filter(
    (s) =>
      s.protocolNumber.toLowerCase().includes(commandSearch.toLowerCase()) ||
      s.sampleId.toLowerCase().includes(commandSearch.toLowerCase()) ||
      s.targetLoci.toLowerCase().includes(commandSearch.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex w-full text-[#172B36] font-sans antialiased">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block">
        <LabSidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer content */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#102A38] z-10">
            <LabSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <LabHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCommand={() => setCommandPaletteOpen(true)}
        />

        {/* Dynamic Outlet Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Quick Search Dialog (Linear-style Command Palette) */}
      <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
        <DialogContent className="max-w-lg p-0 bg-white border border-[#E5EBEF] overflow-hidden shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Pesquisa Rápida da Central Laboratorial</DialogTitle>
            <DialogDescription>
              Localize protocolos, amostras e exames por número ou loco.
            </DialogDescription>
          </DialogHeader>

          {/* Search Input */}
          <div className="p-3.5 border-b border-[#E5EBEF] flex items-center gap-2.5 bg-[#F8FAFB]">
            <Search className="w-4 h-4 text-[#8A9BA8] shrink-0" />
            <input
              type="text"
              value={commandSearch}
              onChange={(e) => setCommandSearch(e.target.value)}
              placeholder="Digite o protocolo, ID da amostra ou loco (ex: HLA-2025 ou DRB1)..."
              className="w-full text-xs sm:text-sm bg-transparent border-none text-[#172B36] placeholder-[#8A9BA8] focus:outline-none"
              autoFocus
            />
          </div>

          {/* Results list */}
          <div className="max-h-72 overflow-y-auto p-2 divide-y divide-[#EEF3F6]">
            {filteredCommandSamples.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#8A9BA8]">
                Nenhuma amostra encontrada para "{commandSearch}".
              </div>
            ) : (
              filteredCommandSamples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setCommandPaletteOpen(false)
                    // Navigate or alert
                  }}
                  className="w-full text-left p-2.5 hover:bg-[#F8FAFB] rounded-lg transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-[#E6F4F6] text-[#087F8C]">
                      <Dna className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#172B36] group-hover:text-[#087F8C]">
                          {sample.protocolNumber}
                        </span>
                        <span className="text-[10px] text-[#596E79] font-mono">
                          {sample.sampleId}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8A9BA8]">
                        {sample.stepName} • {sample.targetLoci}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-3.5 h-3.5 text-[#CBD8E0] group-hover:text-[#087F8C] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))
            )}
          </div>

          <div className="p-2.5 bg-[#F8FAFB] border-t border-[#E5EBEF] flex items-center justify-between text-[11px] text-[#8A9BA8]">
            <span>Pressione ESC para fechar</span>
            <span className="font-mono">Central Laboratorial CPDHRCE</span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default LabGlobalLayout
