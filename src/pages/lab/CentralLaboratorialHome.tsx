import React, { useState, useMemo } from 'react'
import {
  FileText,
  Clock,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  Info,
  Activity,
  FileCheck2,
  Workflow,
  Search,
  CheckCircle,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { PageHeader } from '@/components/lab/PageHeader'
import {
  LabCard,
  LabCardHeader,
  LabCardTitle,
  LabCardDescription,
  LabCardContent,
} from '@/components/lab/LabCard'
import { MetricCard } from '@/components/lab/MetricCard'
import { StatusBadge, StatusVariant } from '@/components/lab/StatusBadge'
import { ExamDetailDrawer } from '@/components/lab/ExamDetailDrawer'
import {
  MOCK_EXAM_SAMPLES,
  MOCK_PERIOD_DATA,
  OPERATIONAL_JOURNEY_STEPS,
  PeriodFilterOption,
  OperationalJourneyStep,
  OperationalSituation,
  LabExamSample,
} from '@/data/labMockData'
import { cn } from '@/lib/utils'

export const CentralLaboratorialHome: React.FC = () => {
  // Estado de controle de período
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilterOption>('7d')

  // Filtros da tabela de exames
  const [tableSearch, setTableSearch] = useState('')
  const [tableStepFilter, setTableStepFilter] = useState<string>('todos')
  const [tableSituationFilter, setTableSituationFilter] = useState<string>('todos')

  // Detalhamento do exame (drawer)
  const [selectedExam, setSelectedExam] = useState<LabExamSample | null>(null)

  // Dados consolidados do período selecionado
  const periodData = MOCK_PERIOD_DATA[selectedPeriod]

  // Mapeamento de situações para badges discretos
  const getSituationBadge = (situation: OperationalSituation) => {
    switch (situation) {
      case 'aguardando_analise':
        return (
          <StatusBadge variant="info" size="sm" dot>
            Aguardando análise
          </StatusBadge>
        )
      case 'aguardando_revisao':
        return (
          <StatusBadge variant="warning" size="sm" dot>
            Aguardando revisão
          </StatusBadge>
        )
      case 'reteste_solicitado':
        return (
          <StatusBadge variant="danger" size="sm" pulse>
            Reteste solicitado
          </StatusBadge>
        )
      case 'concluido':
        return (
          <StatusBadge variant="success" size="sm" dot>
            Concluído
          </StatusBadge>
        )
      case 'em_dia':
      default:
        return (
          <StatusBadge variant="neutral" size="sm" dot>
            Em dia
          </StatusBadge>
        )
    }
  }

  // Mapeamento legível das etapas da jornada
  const getJourneyStepName = (stepId: OperationalJourneyStep) => {
    const found = OPERATIONAL_JOURNEY_STEPS.find((s) => s.id === stepId)
    return found ? found.name : stepId
  }

  // Filtragem da tabela de exames
  const filteredExams = useMemo(() => {
    return MOCK_EXAM_SAMPLES.filter((exam) => {
      // Busca por código, tipo ou protocolo
      const matchesSearch =
        tableSearch === '' ||
        exam.protocolNumber.toLowerCase().includes(tableSearch.toLowerCase()) ||
        exam.sampleId.toLowerCase().includes(tableSearch.toLowerCase()) ||
        exam.examType.toLowerCase().includes(tableSearch.toLowerCase()) ||
        exam.methodology.toLowerCase().includes(tableSearch.toLowerCase())

      if (!matchesSearch) return false

      // Filtro por etapa da jornada
      if (tableStepFilter !== 'todos' && exam.journeyStep !== tableStepFilter) {
        return false
      }

      // Filtro por situação
      if (tableSituationFilter !== 'todos' && exam.situation !== tableSituationFilter) {
        return false
      }

      return true
    })
  }, [tableSearch, tableStepFilter, tableSituationFilter])

  // Custom Tooltip minimalista para o gráfico Recharts
  const CustomChartTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    payload?: Array<{ value: number; dataKey: string; name: string; color: string }>
    label?: string
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#102A38] text-white border border-[#1E3E50] rounded-lg p-2.5 shadow-lg text-xs space-y-1.5">
          <p className="font-medium text-[#CBD8E0] border-b border-[#1E3E50] pb-1 font-mono">
            {label}
          </p>
          {payload.map((item) => (
            <div key={item.dataKey} className="flex items-center justify-between gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#8BA2AF]">{item.name}:</span>
              </span>
              <span className="font-mono font-medium text-white">{item.value}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* =========================================================================
          1. TOPO: Título, Descrição Curta, Filtro de Período e Ambiente Demonstrativo
          ========================================================================= */}
      <section aria-labelledby="overview-heading" className="space-y-4">
        {/* Identificação discreta de ambiente demonstrativo */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EEF3F6] border border-[#D9E3EA] text-[#596E79]">
            <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
            <span className="font-medium text-[#172B36]">Ambiente demonstrativo</span>
            <span className="text-[#8A9BA8]">•</span>
            <span className="text-[11px] text-[#596E79]">
              Dados simulados para acompanhamento operacional do laboratório (sem finalidade
              clínica)
            </span>
          </div>

          <div className="text-[11px] text-[#8A9BA8] font-mono">
            Sincronização simulada: {new Date().toLocaleDateString('pt-BR')} • Versão do fluxo v1.0
          </div>
        </div>

        {/* Page Header integrado com filtro de período */}
        <PageHeader
          title="Visão Geral"
          description="Central de acompanhamento da rotina laboratorial: monitore exames ativos, identifique pendências por etapa e acompanhe a distribuição do fluxo operacional."
          actions={
            <div className="flex items-center gap-2 bg-white border border-[#E5EBEF] p-1 rounded-lg shadow-sm">
              <span className="text-[11px] font-medium text-[#596E79] px-2 flex items-center gap-1.5 hidden sm:inline-flex">
                <Calendar className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Período:</span>
              </span>
              {(
                [
                  { id: '7d', label: '7 dias' },
                  { id: '15d', label: '15 dias' },
                  { id: '30d', label: '30 dias' },
                  { id: '90d', label: '90 dias' },
                ] as const
              ).map((period) => {
                const isActive = selectedPeriod === period.id
                return (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => setSelectedPeriod(period.id)}
                    className={cn(
                      'px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                      isActive
                        ? 'bg-[#102A38] text-white shadow-xs'
                        : 'text-[#596E79] hover:text-[#172B36] hover:bg-[#F8FAFB]',
                    )}
                  >
                    {period.label}
                  </button>
                )
              })}
            </div>
          }
        />
      </section>

      {/* =========================================================================
          2. PRIMEIRA SEÇÃO — Indicadores (4 KPIs compactos e contextuais)
          ========================================================================= */}
      <section aria-labelledby="kpis-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2
            id="kpis-heading"
            className="text-xs font-semibold uppercase tracking-wider text-[#596E79]"
          >
            Indicadores da Central • {periodData.periodLabel}
          </h2>
          <span className="text-[11px] text-[#8A9BA8]">
            Visão quantitativa de acompanhamento em tempo real
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Exames em acompanhamento */}
          <MetricCard
            label="Exames em acompanhamento"
            value={periodData.summary.totalEmAcompanhamento}
            unit="amostras"
            icon={<Activity className="w-4 h-4 text-[#087F8C]" />}
            subtext="Total de amostras transitando ativamente pelo fluxo laboratorial"
          />

          {/* KPI 2: Aguardando análise */}
          <MetricCard
            label="Aguardando análise"
            value={periodData.summary.aguardandoAnalise}
            unit="amostras"
            icon={<Layers className="w-4 h-4 text-[#087F8C]" />}
            subtext="Amostras processadas na bancada e prontas para avaliação técnica"
          />

          {/* KPI 3: Aguardando revisão */}
          <MetricCard
            label="Aguardando revisão"
            value={periodData.summary.aguardandoRevisao}
            unit="amostras"
            icon={<FileCheck2 className="w-4 h-4 text-[#D97706]" />}
            subtext="Etapa de validação por especialista antes do encerramento"
          />

          {/* KPI 4: Retestes registrados no período */}
          <MetricCard
            label="Retestes registrados"
            value={periodData.summary.retestesPeriodo}
            unit="casos"
            icon={<RotateCcw className="w-4 h-4 text-[#E11D48]" />}
            subtext="Sinalizações de repetição técnica para controle de qualidade no período"
          />
        </div>
      </section>

      {/* =========================================================================
          3. SEGUNDA SEÇÃO — Fluxo operacional (Jornada Horizontal Elegante)
          ========================================================================= */}
      <section aria-labelledby="fluxo-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2
              id="fluxo-heading"
              className="text-sm font-semibold text-[#172B36] tracking-tight flex items-center gap-2"
            >
              <Workflow className="w-4 h-4 text-[#087F8C]" />
              <span>Jornada Operacional do Exame</span>
            </h2>
            <p className="text-xs text-[#596E79] mt-0.5">
              Distribuição demonstrativa de amostras pelas 5 etapas do fluxo laboratorial
            </p>
          </div>
          <span className="text-[11px] text-[#8A9BA8] font-mono">
            Acompanhamento de fluxo de trabalho • Informativo
          </span>
        </div>

        {/* Visualização horizontal das etapas da jornada */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {OPERATIONAL_JOURNEY_STEPS.map((step, idx) => {
            const count = periodData.summary.distribuicaoJornada[step.id]
            const isLast = idx === OPERATIONAL_JOURNEY_STEPS.length - 1

            return (
              <div
                key={step.id}
                className="relative bg-white border border-[#E5EBEF] rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all hover:border-[#087F8C]/40 hover:shadow-xs group"
              >
                {/* Cabeçalho da etapa com numeração e contador */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium text-[#8A9BA8]">
                    ETAPA 0{step.order}
                  </span>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E6F4F6] text-[#087F8C] border border-[#B8E2E7]">
                    {count} {count === 1 ? 'exame' : 'exames'}
                  </span>
                </div>

                {/* Nome e descrição da etapa */}
                <div>
                  <h3 className="text-xs font-semibold text-[#172B36] group-hover:text-[#087F8C] transition-colors leading-tight">
                    {step.name}
                  </h3>
                  <p className="text-[11px] text-[#596E79] mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Barra de proporção sutil */}
                <div className="pt-2 border-t border-[#EEF3F6] flex items-center justify-between text-[10px] text-[#8A9BA8]">
                  <span>Proporção na central</span>
                  <span className="font-mono font-medium text-[#172B36]">
                    {Math.round((count / periodData.summary.totalEmAcompanhamento) * 100)}%
                  </span>
                </div>

                {/* Seta horizontal indicativa para telas grandes */}
                {!isLast && (
                  <div
                    className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-white border border-[#CBD8E0] items-center justify-center text-[#596E79] shadow-2xs pointer-events-none"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Concentração de pendências operacionais */}
        <LabCard variant="subtle" className="border-dashed bg-[#F8FAFB]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5EBEF]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#087F8C]" />
              <span className="text-xs font-semibold text-[#172B36]">
                Concentração de Pendências por Etapa ({periodData.periodLabel})
              </span>
            </div>
            <span className="text-[11px] text-[#8A9BA8]">
              Indicador operacional para priorização da equipe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
            {periodData.summary.pendenciasPorEtapa.map((p) => (
              <div
                key={p.etapaId}
                className="bg-white border border-[#E5EBEF] rounded-lg p-3 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#172B36]">{p.etapaNome}</span>
                  <span className="text-xs font-mono font-semibold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.2 rounded">
                    {p.totalPendencias} pendências
                  </span>
                </div>
                <p className="text-[11px] text-[#596E79] leading-snug">{p.destaque}</p>
              </div>
            ))}
          </div>
        </LabCard>
      </section>

      {/* =========================================================================
          4. TERCEIRA SEÇÃO — Atividade laboratorial (Gráfico Recharts)
          ========================================================================= */}
      <section aria-labelledby="grafico-heading" className="space-y-3">
        <LabCard>
          <LabCardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <LabCardTitle className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#087F8C]" />
                <span id="grafico-heading">Atividade Laboratorial • {periodData.periodLabel}</span>
              </LabCardTitle>
              <LabCardDescription>
                Volume diário/periódico de exames acompanhados e retestes registrados na rotina
              </LabCardDescription>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#087F8C]" />
                <span className="text-[#172B36]">Exames Acompanhados</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-[#E11D48]" />
                <span className="text-[#172B36]">Retestes Registrados</span>
              </div>
            </div>
          </LabCardHeader>

          <LabCardContent>
            <div className="w-full h-72 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={periodData.timeSeries}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EBEF" />
                  <XAxis
                    dataKey="dateLabel"
                    tick={{ fill: '#596E79', fontSize: 11 }}
                    axisLine={{ stroke: '#E5EBEF' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#596E79', fontSize: 11 }}
                    axisLine={{ stroke: '#E5EBEF' }}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomChartTooltip />} cursor={{ fill: '#F1F5F8' }} />
                  <Bar
                    dataKey="examesAcompanhados"
                    name="Exames Acompanhados"
                    fill="#087F8C"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  />
                  <Bar
                    dataKey="retestesRegistrados"
                    name="Retestes Registrados"
                    fill="#E11D48"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 pt-3 border-t border-[#EEF3F6] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#8A9BA8] gap-2">
              <span>
                Total no período:{' '}
                {periodData.timeSeries.reduce((acc, c) => acc + c.examesAcompanhados, 0)} exames
                acompanhados e{' '}
                {periodData.timeSeries.reduce((acc, c) => acc + c.retestesRegistrados, 0)} retestes
              </span>
              <span className="italic">
                Visualização quantitativa operacional — não reflete decisões clínicas.
              </span>
            </div>
          </LabCardContent>
        </LabCard>
      </section>

      {/* =========================================================================
          5. QUARTA SEÇÃO — Exames que precisam de acompanhamento (Tabela Compacta)
          ========================================================================= */}
      <section aria-labelledby="tabela-heading" className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 id="tabela-heading" className="text-sm font-semibold text-[#172B36] tracking-tight">
              Exames que Precisam de Acompanhamento
            </h2>
            <p className="text-xs text-[#596E79] mt-0.5">
              Amostras ativas na rotina com detalhamento de etapa, situação e última atualização
            </p>
          </div>

          <span className="text-xs text-[#8A9BA8] font-mono">
            {filteredExams.length}{' '}
            {filteredExams.length === 1 ? 'exame listado' : 'exames listados'}
          </span>
        </div>

        {/* Barra de Filtros Operacionais */}
        <div className="p-3 bg-white rounded-xl border border-[#E5EBEF] shadow-2xs space-y-2.5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Input de busca */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9BA8]" />
              <input
                type="text"
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Buscar por código de exame, protocolo ou tipo..."
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F8FAFB] text-[#172B36] placeholder-[#8A9BA8] rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C] focus:bg-white transition-all"
              />
            </div>

            {/* Filtro por Situação Operacional */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#596E79] text-[11px] shrink-0 font-medium">Situação:</span>
              <select
                value={tableSituationFilter}
                onChange={(e) => setTableSituationFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-[#F8FAFB] text-[#172B36] text-xs rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C]"
              >
                <option value="todos">Todas as situações</option>
                <option value="aguardando_analise">Aguardando análise</option>
                <option value="aguardando_revisao">Aguardando revisão</option>
                <option value="reteste_solicitado">Reteste solicitado</option>
                <option value="em_dia">Em dia</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Filtro por Etapa Atual */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#596E79] text-[11px] shrink-0 font-medium">Etapa:</span>
              <select
                value={tableStepFilter}
                onChange={(e) => setTableStepFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-[#F8FAFB] text-[#172B36] text-xs rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C]"
              >
                <option value="todos">Todas as etapas</option>
                <option value="recebimento">Recebimento</option>
                <option value="processamento">Processamento</option>
                <option value="analise">Análise</option>
                <option value="revisao">Revisão</option>
                <option value="encerramento">Encerramento</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela Compacta com as Colunas Solicitadas:
            Código do exame, Tipo de exame, Data de entrada, Etapa atual, Situação, Última atualização */}
        <div className="w-full bg-white rounded-xl border border-[#E5EBEF] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5EBEF] bg-[#F8FAFB] text-[11px] font-semibold uppercase tracking-wider text-[#596E79]">
                  <th scope="col" className="py-3 px-4">
                    Código do exame
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Tipo de exame
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Data de entrada
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Etapa atual
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Situação
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Última atualização
                  </th>
                  <th scope="col" className="py-3 px-4 text-right">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEF3F6] text-xs">
                {filteredExams.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#8A9BA8]">
                      <div className="max-w-xs mx-auto space-y-2">
                        <FileText className="w-8 h-8 text-[#CBD8E0] mx-auto" />
                        <p className="font-medium text-[#596E79]">Nenhum exame encontrado</p>
                        <p className="text-[11px] text-[#8A9BA8]">
                          Tente ajustar a busca textual ou os filtros de etapa e situação
                          operacional.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredExams.map((exam) => {
                    const isSelected = selectedExam?.id === exam.id

                    return (
                      <tr
                        key={exam.id}
                        onClick={() => setSelectedExam(exam)}
                        className={cn(
                          'transition-colors cursor-pointer group',
                          isSelected ? 'bg-[#F0F8FA]' : 'hover:bg-[#F8FAFB]',
                          exam.needsRetest && 'border-l-4 border-l-[#E11D48]',
                        )}
                      >
                        {/* 1. Código do exame (Mono) */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-[#172B36] group-hover:text-[#087F8C] transition-colors">
                              {exam.protocolNumber}
                            </span>
                            {exam.needsRetest && (
                              <span
                                title="Reteste sinalizado"
                                className="inline-flex p-0.5 rounded bg-red-100 text-[#E11D48]"
                              >
                                <AlertTriangle className="w-3 h-3" />
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#8A9BA8] font-mono mt-0.5">
                            ID: {exam.sampleId}
                          </div>
                        </td>

                        {/* 2. Tipo de exame (Nomes genéricos para as metodologias) */}
                        <td className="py-3 px-4">
                          <div className="font-medium text-[#172B36]">{exam.examType}</div>
                          <div className="text-[11px] text-[#596E79] font-mono mt-0.5 truncate max-w-[200px]">
                            {exam.methodology}
                          </div>
                        </td>

                        {/* 3. Data de entrada */}
                        <td className="py-3 px-4 text-[#596E79] font-mono text-[11px]">
                          {exam.arrivalDate}
                        </td>

                        {/* 4. Etapa atual da jornada */}
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#F1F5F9] text-[#1E3E50] border border-[#E2E8F0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />
                            <span>{getJourneyStepName(exam.journeyStep)}</span>
                          </span>
                          <div className="text-[10px] text-[#8A9BA8] mt-1 truncate max-w-[160px]">
                            {exam.stepName}
                          </div>
                        </td>

                        {/* 5. Situação Operacional */}
                        <td className="py-3 px-4">{getSituationBadge(exam.situation)}</td>

                        {/* 6. Última atualização */}
                        <td className="py-3 px-4 text-[#596E79]">
                          <div className="flex items-center gap-1 text-[11px]">
                            <Clock className="w-3 h-3 text-[#8A9BA8]" />
                            <span>{exam.lastUpdate}</span>
                          </div>
                        </td>

                        {/* Ação */}
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedExam(exam)
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#087F8C] hover:text-[#044C54] hover:bg-[#E6F4F6] rounded-md transition-colors"
                          >
                            <span>Detalhar</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Gaveta Lateral (Drawer) de Detalhamento do Exame Selecionado
          ========================================================================= */}
      <ExamDetailDrawer exam={selectedExam} onClose={() => setSelectedExam(null)} />
    </div>
  )
}

export default CentralLaboratorialHome
