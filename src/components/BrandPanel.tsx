import React from 'react'
import CephreceLogo from './CephreceLogo'
import { Award, Dna, Activity, ShieldCheck, MapPin, Building2 } from 'lucide-react'

export const BrandPanel: React.FC = () => {
  return (
    <aside className="relative flex flex-col justify-between h-full w-full bg-gradient-to-br from-[#0A131F] via-[#0D1B2A] to-[#1B263B] text-white p-8 md:p-12 lg:p-16 overflow-hidden select-none">
      {/* Background Scientific & Geometric Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Glow ambient light */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1BA6A6]/20 blur-[100px] animate-pulse-slow" />
        <div className="absolute -bottom-40 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#158383]/15 blur-[120px]" />

        {/* Concentric Circles (HLA/Antigen affinity representation) */}
        <div className="absolute top-1/4 -right-24 w-[380px] h-[380px] rounded-full border border-[#1BA6A6]/15 opacity-70" />
        <div className="absolute top-1/4 -right-16 w-[300px] h-[300px] rounded-full border border-dashed border-[#1BA6A6]/25 opacity-60" />
        <div className="absolute top-1/4 -right-8 w-[220px] h-[220px] rounded-full border border-[#1BA6A6]/20 opacity-50" />
        <div className="absolute top-1/4 right-0 w-[140px] h-[140px] rounded-full bg-[#1BA6A6]/5 border border-[#1BA6A6]/30 opacity-60" />

        {/* Molecular Grid Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="molecular-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#1BA6A6" />
              <path
                d="M 2 2 L 24 24 M 24 24 L 44 2"
                stroke="#1BA6A6"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#molecular-grid)" />
        </svg>

        {/* Subtle Wave lines (biological flow) */}
        <svg
          className="absolute bottom-16 -left-10 w-[600px] h-48 opacity-[0.14]"
          viewBox="0 0 600 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 100 C 150 40, 300 160, 450 80 C 525 40, 580 90, 600 100"
            stroke="#1BA6A6"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 130 C 140 70, 290 190, 440 110 C 515 70, 570 120, 600 130"
            stroke="#1BA6A6"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            fill="none"
          />
        </svg>
      </div>

      {/* Header with Logo */}
      <div className="relative z-10 flex flex-col items-start gap-4 transition-all duration-700">
        <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-lg shadow-black/20">
          <CephreceLogo variant="light" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1BA6A6]/15 border border-[#1BA6A6]/30 text-[#4EE0E0] text-xs font-medium tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1BA6A6] animate-ping" />
          50 Anos Dedicados à Ciência e à Vida (1975–2025)
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto py-8 lg:py-12 flex flex-col gap-6 max-w-xl">
        <div className="space-y-3">
          <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#1BA6A6]">
            Histocompatibilidade & Imunogenética
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
            Centro de Pesquisas em Doenças Hepato Renais do Ceará
          </h1>
          <div className="inline-block">
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1BA6A6] via-[#4EE0E0] to-white">
              CEPH/RECE
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal">
          O <strong className="text-white font-semibold">Laboratório de HLA</strong> é referência no
          suporte de alta precisão a transplantes de rim, coração, pulmão e pâncreas, credenciado no
          Sistema Nacional de Transplantes (SNT) com rigor científico e excelência diagnóstica.
        </p>

        {/* Institutional scientific highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#1BA6A6]/20 text-[#4EE0E0] shrink-0">
              <Dna className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Análise Molecular</p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Tipificação HLA de alta resolução e compatibilidade
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#1BA6A6]/20 text-[#4EE0E0] shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">+12.000 Exames/Ano</p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Agilidade e rastreabilidade na emissão de laudos
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#1BA6A6]/20 text-[#4EE0E0] shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Pioneirismo em Transplante</p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                1º transplante renal do N/NE (1977)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-[#1BA6A6]/20 text-[#4EE0E0] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Credenciamento SNT</p>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Portaria MS nº 3.196 / Central de Transplantes CE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Footer */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#1BA6A6] shrink-0" />
          <span>Rua Prof. Costa Mendes, 1611 • Fortaleza – CE</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <Building2 className="w-3.5 h-3.5 text-[#1BA6A6] shrink-0" />
          <span>CNPJ 05.312.376/0001-55</span>
          <span className="text-slate-600">•</span>
          <span>CEBAS Saúde</span>
        </div>
      </div>
    </aside>
  )
}

export default BrandPanel
