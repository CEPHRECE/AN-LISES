import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FlaskConical,
  Activity,
  Layers,
  ArrowRight,
  GitBranch,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
  FileSpreadsheet,
  Info,
} from 'lucide-react'
import { PageHeader } from '@/components/lab/PageHeader'
import {
  LabCard,
  LabCardHeader,
  LabCardTitle,
  LabCardDescription,
  LabCardContent,
} from '@/components/lab/LabCard'
import { MetricCard } from '@/components/lab/MetricCard'
import { StatusBadge } from '@/components/lab/StatusBadge'
import { LabTable } from '@/components/lab/LabTable'
import { FilterBar } from '@/components/lab/FilterBar'
import { ExamDetailDrawer } from '@/components/lab/ExamDetailDrawer'
import { MOCK_METRICS, MOCK_EXAM_SAMPLES, LAB_FLOW_STEPS, LabExamSample } from '@/data/labMockData'

export const CentralLaboratorialHome: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('todos')
  const [selectedExam, setSelectedExam] = useState<LabExamSample | null>(null)

  // Filter options for quick switching
  const filterOptions = [
    { label: 'Todos os Exames', value: 'todos', count: MOCK_EXAM_SAMPLES.length },
    {
      label: 'Em Sequenciamento',
      value: 'sequenciamento',
      count: MOCK_EXAM_SAMPLES.filter((s) => s.currentStep === 'sequenciamento').length,
    },
    {
      label: 'Retestes',
      value: 'reteste',
      count: MOCK_EXAM_SAMPLES.filter((s) => s.needsRetest).length,
    },
    {
      label: 'Tx Imediato',
      value: 'transplante_imediato',
      count: MOCK_EXAM_SAMPLES.filter((s) => s.priority === 'transplante_imediato').length,
    },
  ]

  // Filtered dataset
  const filteredExams = MOCK_EXAM_SAMPLES.filter((exam) => {
    const matchesSearch =
      exam.protocolNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.sampleId.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.targetLoci.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.operatorName.toLowerCase().includes(searchValue.toLowerCase())

    if (!matchesSearch) return false

    if (selectedFilter === 'todos') return true
    if (selectedFilter === 'reteste') return exam.needsRetest
    if (selectedFilter === 'transplante_imediato') return exam.priority === 'transplante_imediato'
    return exam.currentStep === selectedFilter
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Page Header with Title, Description and Clean Action */}
      <PageHeader
        title="Central Laboratorial"
        description="Plataforma de acompanhamento operacional de exames de histocompatibilidade e imunogenética. Rastreie etapas de processamento, identifique pendências em bancada e investigue retestes com máxima precisão."
        badge={
          <StatusBadge variant="primary" size="sm">
            Ambiente Operacional
          </StatusBadge>
        }
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/app/fila"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-[#087F8C] hover:bg-[#066974] transition-colors shadow-sm"
            >
              <span>Ver Fila Completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        }
      />

      {/* 2. Key Operational Metrics (Refined B2B Healthtech Style) */}
      <section aria-labelledby="indicadores-rapidos" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="indicadores-rapidos"
            className="text-xs font-semibold uppercase tracking-wider text-[#596E79]"
          >
            Visão Consolidada do Turno
          </h2>
          <span className="text-[11px] text-[#8A9BA8] font-mono">
            Última sincronização de bancada: agora
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_METRICS.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              change={metric.change}
              trend={metric.trend}
              subtext={metric.subtext}
            />
          ))}
        </div>
      </section>

      {/* 3. Operational Pipeline / Processing Flow Overview */}
      <section aria-labelledby="fluxo-processamento" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="fluxo-processamento"
              className="text-sm font-semibold text-[#172B36] tracking-tight"
            >
              Etapas do Processamento Analítico
            </h2>
            <p className="text-xs text-[#596E79] mt-0.5">
              Distribuição das amostras em tempo real por bancada e fase da rotina HLA
            </p>
          </div>

          <Link
            to="/app/rastreabilidade"
            className="text-xs font-medium text-[#087F8C] hover:text-[#066974] flex items-center gap-1"
          >
            <span>Mapa de Rastreabilidade</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {LAB_FLOW_STEPS.map((flow, idx) => (
            <div
              key={flow.step}
              className="p-3.5 rounded-xl bg-white border border-[#E5EBEF] hover:border-[#CBD8E0] transition-all flex flex-col justify-between space-y-3 lab-card-hover group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#8A9BA8]">0{idx + 1}</span>
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-[#EEF3F6] text-[#172B36] group-hover:bg-[#E6F4F6] group-hover:text-[#087F8C] transition-colors">
                  {flow.activeCount}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-medium text-[#172B36] leading-snug">{flow.label}</h4>
                <p className="text-[10px] text-[#8A9BA8] mt-1 line-clamp-2 leading-relaxed">
                  {flow.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EEF3F6] text-[10px] text-[#596E79] font-mono flex items-center justify-between">
                <span>Média</span>
                <span className="text-[#172B36] font-medium">{flow.averageTime}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Active Samples Table & Filter Area */}
      <section aria-labelledby="tabela-amostras" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2
              id="tabela-amostras"
              className="text-sm font-semibold text-[#172B36] tracking-tight"
            >
              Amostras em Acompanhamento
            </h2>
            <p className="text-xs text-[#596E79] mt-0.5">
              Selecione qualquer linha para abrir a gaveta de detalhamento e rastreabilidade
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#596E79] bg-white border border-[#E5EBEF] px-2.5 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Controle de Qualidade Ativo</span>
            </span>
          </div>
        </div>

        {/* Filter component */}
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filterOptions={filterOptions}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
          totalCount={filteredExams.length}
          onRefresh={() => setSearchValue('')}
        />

        {/* Structured lab table */}
        <LabTable
          exams={filteredExams}
          selectedExamId={selectedExam?.id}
          onSelectExam={(exam) => setSelectedExam(exam)}
        />
      </section>

      {/* 5. Design System Showcase & Architectural Foundation Banner */}
      <section aria-labelledby="fundacao-tecnica" className="pt-4">
        <LabCard variant="subtle" className="border-dashed">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#102A38] text-white">
                  Design System CPDHRCE
                </span>
                <span className="text-xs text-[#596E79]">Fundação Front-End Premium</span>
              </div>
              <h3 className="text-base font-semibold text-[#172B36]">
                Arquitetura Modular Preparada para Expansão
              </h3>
              <p className="text-xs text-[#596E79] leading-relaxed">
                Tokens de cor padronizados (off-white <code>#F8FAFB</code>, petróleo{' '}
                <code>#102A38</code>, teal <code>#087F8C</code> e bordas <code>#E5EBEF</code>),
                componentes atômicos de laboratório (Badges, Cards, Filtros, Tabelas e Drawers) e
                navegação pronta para acoplar os motores de sequenciamento e chamadas genômicas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                to="/app/retestes"
                className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#EEF3F6] border border-[#E5EBEF] text-[#172B36] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Módulo Retestes</span>
              </Link>
              <Link
                to="/app/indicadores"
                className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#EEF3F6] border border-[#E5EBEF] text-[#172B36] rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Indicadores TAT</span>
              </Link>
              <Link
                to="/"
                className="px-3 py-1.5 text-xs font-medium text-[#596E79] hover:text-[#172B36] transition-colors flex items-center gap-1"
              >
                <span>Tela de Login</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </LabCard>
      </section>

      {/* 6. Detail Drawer for Selected Sample */}
      <ExamDetailDrawer exam={selectedExam} onClose={() => setSelectedExam(null)} />
    </div>
  )
}

export default CentralLaboratorialHome
