import React from 'react'
import CephreceLogo from '@/components/CephreceLogo'
import BrandPanel from '@/components/BrandPanel'
import LoginForm from '@/components/LoginForm'

/**
 * Login Page - Laboratório de HLA (CEPH/RECE)
 *
 * Responsive layout:
 * - Desktop (>1024px): Two-panel layout (~55% brand on left, ~45% auth on right)
 * - Tablet (641px - 1024px): Compact brand panel and adjusted auth panel
 * - Mobile (<=640px): Brand panel transforms into a compact header with logo and dark-turquoise gradient,
 *   full-width centered form with 20px padding.
 */
const Index: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] antialiased selection:bg-[#1BA6A6]/20 selection:text-[#0D1B2A]">
      {/*
        MOBILE COMPACT HEADER (<=640px) 
        Shown only on small screens as per spec
      */}
      <header className="block sm:hidden w-full bg-gradient-to-r from-[#0A131F] via-[#0D1B2A] to-[#16334D] text-white px-5 py-5 border-b border-white/10 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <CephreceLogo variant="light" />
          <div className="text-right">
            <span className="inline-block px-2 py-0.5 rounded-full bg-[#1BA6A6]/20 text-[#4EE0E0] text-[10px] font-semibold tracking-wide border border-[#1BA6A6]/30">
              HLA • Transplantes
            </span>
          </div>
        </div>
        <p className="mt-2.5 text-[11px] text-slate-300 leading-snug">
          Centro de Pesquisas em Doenças Hepato Renais do Ceará — CEPH/RECE
        </p>
      </header>

      {/*
        BRAND PANEL (Left Panel)
        Visible on Tablet (641px+) and Desktop
        Takes ~55% on desktop, ~45% on tablet
      */}
      <div className="hidden sm:flex sm:w-[45%] lg:w-[55%] shrink-0 min-h-[600px] lg:min-h-screen">
        <BrandPanel />
      </div>

      {/*
        AUTHENTICATION PANEL (Right Panel)
        Takes ~45% on desktop, ~55% on tablet, 100% on mobile
        Centers form with max-width 420px (380px on tablet)
      */}
      <main className="flex-1 flex flex-col justify-center items-center w-full px-5 py-8 sm:px-8 lg:px-12 bg-white relative">
        {/* Subtle decorative dot grid background on auth panel for high scientific refinement */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#1BA6A6 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Content container */}
        <div className="relative z-10 w-full max-w-[420px] sm:max-w-[380px] lg:max-w-[420px] flex-1 flex flex-col justify-center">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

export default Index
