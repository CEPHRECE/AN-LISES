/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'

// CPDHRCE Lab Layout & Pages
import LabGlobalLayout from './components/lab/LabGlobalLayout'
import CentralLaboratorialHome from './pages/lab/CentralLaboratorialHome'
import FilaExamesPage from './pages/lab/FilaExamesPage'
import DetalheExamePage from './pages/lab/DetalheExamePage'
import RastreabilidadePage from './pages/lab/RastreabilidadePage'
import RetestesPage from './pages/lab/RetestesPage'
import IndicadoresPage from './pages/lab/IndicadoresPage'
import FontesDadosPage from './pages/lab/FontesDadosPage'
import ConfiguracoesPage from './pages/lab/ConfiguracoesPage'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Portal de Login existente preservado integralmente */}
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
        </Route>

        {/* CPDHRCE | Central Laboratorial - Tronco da Aplicação */}
        <Route path="/app" element={<LabGlobalLayout />}>
          <Route index element={<CentralLaboratorialHome />} />
          <Route path="fila" element={<FilaExamesPage />} />
          <Route path="fila/:id" element={<DetalheExamePage />} />
          <Route path="rastreabilidade" element={<RastreabilidadePage />} />
          <Route path="retestes" element={<RetestesPage />} />
          <Route path="indicadores" element={<IndicadoresPage />} />
          <Route path="fontes" element={<FontesDadosPage />} />
          <Route path="configuracoes" element={<ConfiguracoesPage />} />
        </Route>

        {/* Rotas canônicas diretas solicitadas: /exames e /exames/:id */}
        <Route element={<LabGlobalLayout />}>
          <Route path="/exames" element={<FilaExamesPage />} />
          <Route path="/exames/:id" element={<DetalheExamePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
