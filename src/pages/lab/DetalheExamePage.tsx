import React, { useMemo, useState } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Dna,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Info,
  HelpCircle,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  Workflow,
  Sparkles,
  AlertCircle,
  Database,
  Search,
  Filter,
} from 'lucide-react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import {
  LabCard,
  LabCardHeader,
  LabCardTitle,
  LabCardDescription,
  LabCardContent,
} from '@/components/lab/LabCard'
import {
  MOCK_EXAM_SAMPLES,
  OPERATIONAL_JOURNEY_STEPS,
  LabExamSample,
  OperationalJourneyStep,
  OperationalSituation,
  ExamJourneyStepDetail,
  ExamHistoryEvent,
  OccurrenceCauseClassification,
  StepExecutionState,
  buildDefaultJourneySteps,
  buildDefaultHistoryEvents,
} from '@/data/labMockData'
import { cn } from '@/lib/utils'

export const DetalheExamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Preservação do retorno para a fila com filtros
  const returnQuery = searchParams.get('from') || ''

  // Busca o exame pelo ID ou pelo Protocolo
  const exam = useMemo(() => {
    if (!id) return null
    return (
      MOCK_EXAM_SAMPLES.find(
        (e) =>
          e.id.toLowerCase() === id.toLowerCase() ||
          e.protocolNumber.toLowerCase() === id.toLowerCase(),
      ) || null
    )
  }, [id])

  // Etapas e eventos completos do exame
  const journeySteps: ExamJourneyStepDetail[] = useMemo(() => {
    if (!exam) return []
    if (exam.journeyStepsDetails && exam.journeyStepsDetails.length > 0) {
      return exam.journeyStepsDetails
    }
    return buildDefaultJourneySteps(exam)
  }, [exam])

  const historyEvents: ExamHistoryEvent[] = useMemo(() => {
    if (!exam) return []
    if (exam.historyEvents && exam.historyEvents.length > 0) {
      return exam.historyEvents
    }
    return buildDefaultHistoryEvents(exam)
  }, [exam])

  // Etapa selecionada na Jornada para inspeção detalhada
  const [selectedStepId, setSelectedStepId] = useState<OperationalJourneyStep>(() => {
    if (exam) return exam.journeyStep
    return 'processamento'
  })

  // Aba ativa na seção de conteúdo: Visão Geral / Etapas / Ocorrências e Retestes / Histórico
  const [activeTab, setActiveTab] = useState<'geral' | 'etapas' | 'ocorrencias' | 'historico'>(
    'geral',
  )

  // Filtro de causas no histórico de ocorrências
  const [causeFilter, setCauseFilter] = useState<'todas' | OccurrenceCauseClassification>('todas')

  // Se o exame não for encontrado
  if (!exam) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-base font-semibold text-[#172B36]">Exame não localizado</h2>
        <p className="text-xs text-[#596E79]">
          O identificador informado não corresponde a nenhum exame demonstrativo ativo.
        </p>
        <button
          type="button"
          onClick={() => navigate(returnQuery ? `/exames?${returnQuery}` : '/exames')}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#102A38] text-white hover:bg-[#1D455B] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retornar para a Fila de Exames</span>
        </button>
      </div>
    )
  }

  // Detalhe da etapa atualmente inspecionada
  const activeStepDetail = journeySteps.find((s) => s.stepId === selectedStepId) || journeySteps[0]

  // Eventos filtrados para ocorrências
  const filteredEvents = historyEvents.filter((ev) => {
    if (causeFilter === 'todas') return true
    return ev.causeClassification === causeFilter
  })

  const occurrencesWithCauses = historyEvents.filter((ev) => ev.causeClassification !== undefined)

  // Helpers visuais
  const getStepStateBadge = (state: StepExecutionState) => {
    switch (state) {
      case 'concluido':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
            <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
            <span>Concluído</span>
          </span>
        )
      case 'em_andamento':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#087F8C] bg-[#E6F4F6] px-2 py-0.5 rounded border border-[#B8E2E7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C] animate-pulse" />
            <span>Em andamento</span>
          </span>
        )
      case 'alerta':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9F1239] bg-[#FFE4E6] px-2 py-0.5 rounded border border-[#FECDD3]">
            <AlertTriangle className="w-3 h-3 text-[#E11D48]" />
            <span>Alerta / Reteste</span>
          </span>
        )
      case 'pendente':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#596E79] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]">
            <Clock className="w-3 h-3 text-[#8A9BA8]" />
            <span>Pendente</span>
          </span>
        )
    }
  }

  const getCauseBadge = (classification?: OccurrenceCauseClassification) => {
    switch (classification) {
      case 'confirmada':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9F1239] bg-[#FFE4E6] px-2 py-0.5 rounded border border-[#FECDD3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
            <span>Causa confirmada</span>
          </span>
        )
      case 'provavel':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#92400E] bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#FDE68A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
            <span>Causa provável</span>
          </span>
        )
      case 'nao_determinada':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#475569] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#CBD5E1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64748B]" />
            <span>Causa não determinada</span>
          </span>
        )
      case 'informativa':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#044C54] bg-[#E6F4F6] px-2 py-0.5 rounded border border-[#B8E2E7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />
            <span>Informativa</span>
          </span>
        )
    }
  }

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

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* =========================================================================
          1. BARRA SUPERIOR: Voltar para Fila + Identificação de Ambiente Demonstrativo
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <button
          type="button"
          onClick={() => navigate(returnQuery ? `/exames?${returnQuery}` : '/exames')}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#596E79] hover:text-[#172B36] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 text-[#8A9BA8] group-hover:text-[#172B36] group-hover:-translate-x-0.5 transition-all" />
          <span>Voltar para a Fila de Exames</span>
          {returnQuery && (
            <span className="text-[10px] text-[#8A9BA8] bg-[#EEF3F6] px-1.5 py-0.2 rounded font-mono">
              filtros preservados
            </span>
          )}
        </button>

        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EEF3F6] border border-[#D9E3EA] text-[#596E79]">
          <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
          <span className="font-medium text-[#172B36]">Ambiente demonstrativo</span>
          <span className="text-[#8A9BA8]">•</span>
          <span className="text-[11px] text-[#596E79]">
            Visualização de rastreabilidade e histórico operacional (dados fictícios, sem finalidade
            clínica)
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. CABEÇALHO DO EXAME:
             Código do exame, Tipo, Identificador da amostra, Etapa atual, Data de entrada, Situação
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-[#E5EBEF] p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-4 border-b border-[#EEF3F6]">
          {/* Identificação principal */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#172B36] tracking-tight">
                {exam.protocolNumber}
              </span>
              {getSituationBadge(exam.situation)}
              {exam.needsRetest && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#E11D48] bg-[#FFE4E6] px-2.5 py-0.5 rounded border border-[#FECDD3]">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reteste Operacional Sinalizado</span>
                </span>
              )}
              {exam.priority === 'transplante_imediato' && (
                <StatusBadge variant="danger" size="sm" pulse>
                  Transplante Imediato
                </StatusBadge>
              )}
            </div>

            <p className="text-sm font-medium text-[#172B36]">{exam.examType}</p>
            <p className="text-xs text-[#596E79] font-mono">
              Metodologia: {exam.methodology} • Loci: {exam.targetLoci} • Indicação:{' '}
              {exam.indication}
            </p>
          </div>

          {/* Atributos rápidos de status */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 text-xs shrink-0">
            <div className="p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] space-y-0.5 min-w-[140px]">
              <span className="text-[10px] uppercase font-semibold text-[#8A9BA8] tracking-wider block">
                Amostra Sintética
              </span>
              <span className="font-mono font-semibold text-[#172B36] text-xs">
                {exam.sampleId}
              </span>
              <span className="text-[10px] text-[#596E79] block truncate max-w-[130px]">
                {exam.pseudonym}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] space-y-0.5 min-w-[140px]">
              <span className="text-[10px] uppercase font-semibold text-[#8A9BA8] tracking-wider block">
                Data de Entrada
              </span>
              <span className="font-mono font-semibold text-[#172B36] text-xs">
                {exam.arrivalDate}
              </span>
              <span className="text-[10px] text-[#596E79] block">Última: {exam.lastUpdate}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#E6F4F6]/60 border border-[#B8E2E7] space-y-0.5 min-w-[140px]">
              <span className="text-[10px] uppercase font-semibold text-[#044C54] tracking-wider block">
                Etapa Atual
              </span>
              <span className="font-semibold text-[#087F8C] text-xs block truncate">
                {exam.stepName}
              </span>
              <span className="text-[10px] text-[#596E79] block font-mono">
                Progresso: {exam.stepProgress}%
              </span>
            </div>
          </div>
        </div>

        {/* Alerta de Reteste Detalhado se aplicável */}
        {exam.needsRetest && (
          <div className="p-3.5 rounded-lg bg-[#FFE4E6]/70 border border-[#FECDD3] text-[#9F1239] space-y-1.5 text-xs">
            <div className="flex items-center gap-2 font-semibold">
              <AlertTriangle className="w-4 h-4 text-[#E11D48] shrink-0" />
              <span>Sinalização Operacional: Reteste em Investigação Técnica</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#881337] pl-6">
              <strong>Motivo registrado:</strong> {exam.retestReason}
            </p>
            <p className="text-[10px] text-[#9F1239] pl-6 italic">
              Aviso de controle de qualidade: a sinalização não solicita nem executa retestes
              automaticamente; serve apenas para acompanhamento da rotina de conferência.
            </p>
          </div>
        )}

        {/* Navegação entre seções da página de detalhe */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#EEF3F6] overflow-x-auto scrollbar-none">
          {[
            { id: 'geral', label: 'Visão Geral e Jornada', icon: Workflow },
            { id: 'etapas', label: 'Detalhamento das 5 Etapas', icon: Layers },
            {
              id: 'ocorrencias',
              label: 'Ocorrências e Retestes',
              icon: AlertTriangle,
              badge: exam.needsRetest ? '1' : undefined,
            },
            { id: 'historico', label: 'Histórico Completo de Eventos', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-[#102A38] text-white shadow-2xs'
                    : 'text-[#596E79] hover:text-[#172B36] hover:bg-[#F8FAFB]',
                )}
              >
                <Icon
                  className={cn('w-3.5 h-3.5', isActive ? 'text-[#3AC0CE]' : 'text-[#8A9BA8]')}
                />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#E11D48] text-white">
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* =========================================================================
          3. SEÇÃO PRINCIPAL — Jornada do Exame (Timeline Interativa)
             Recebimento → Processamento → Análise → Revisão → Encerramento
             Ao selecionar uma etapa, apresenta painel rico:
             Nome da etapa, Data e horário registrados, Estado, Responsável fictício ou perfil,
             Ocorrências, Informações ausentes, Referência da origem demonstrativa.
             Etapas provisórias configuráveis.
          ========================================================================= */}
      <section aria-labelledby="jornada-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2
              id="jornada-heading"
              className="text-sm font-semibold text-[#172B36] tracking-tight flex items-center gap-2"
            >
              <Workflow className="w-4 h-4 text-[#087F8C]" />
              <span>Jornada Operacional do Exame</span>
            </h2>
            <p className="text-xs text-[#596E79] mt-0.5">
              Clique em qualquer etapa abaixo para inspecionar os registros operacionais,
              responsáveis e informações pendentes.
            </p>
          </div>

          <span className="text-[11px] text-[#8A9BA8] font-mono">
            Etapas provisórias configuráveis CPDHRCE
          </span>
        </div>

        {/* Timeline Horizontal das 5 etapas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {journeySteps.map((step, idx) => {
            const isSelected = selectedStepId === step.stepId
            const isLast = idx === journeySteps.length - 1

            return (
              <button
                key={step.stepId}
                type="button"
                onClick={() => {
                  setSelectedStepId(step.stepId)
                  if (activeTab === 'ocorrencias' || activeTab === 'historico') {
                    setActiveTab('geral')
                  }
                }}
                className={cn(
                  'text-left relative bg-white rounded-xl p-4 border transition-all space-y-2.5 group cursor-pointer shadow-2xs',
                  isSelected
                    ? 'border-[#087F8C] ring-2 ring-[#087F8C]/20 shadow-sm bg-[#F0F8FA]/30'
                    : 'border-[#E5EBEF] hover:border-[#CBD8E0] hover:bg-[#F8FAFB]',
                  step.state === 'alerta' && !isSelected && 'border-l-4 border-l-[#E11D48]',
                )}
              >
                {/* Cabeçalho da etapa */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#8A9BA8] font-medium">
                    0{step.order}. ETAPA
                  </span>
                  {getStepStateBadge(step.state)}
                </div>

                {/* Nome da etapa */}
                <div>
                  <h3
                    className={cn(
                      'text-xs font-semibold leading-tight transition-colors',
                      isSelected ? 'text-[#087F8C]' : 'text-[#172B36] group-hover:text-[#087F8C]',
                    )}
                  >
                    {step.stepName}
                  </h3>
                  <p className="text-[11px] text-[#596E79] mt-1 line-clamp-2 leading-snug">
                    {step.technicalNotes ||
                      OPERATIONAL_JOURNEY_STEPS.find((s) => s.id === step.stepId)?.description}
                  </p>
                </div>

                {/* Timestamp e responsável rápido */}
                <div className="pt-2 border-t border-[#EEF3F6] flex flex-col text-[10px] text-[#8A9BA8]">
                  <span>{step.timestamp ? step.timestamp.split(' ')[0] : 'Não iniciada'}</span>
                  <span className="truncate text-[#596E79]">
                    {step.responsibleName || 'Aguardando atribuição'}
                  </span>
                </div>

                {/* Seta horizontal indicativa entre blocos (telas grandes) */}
                {!isLast && (
                  <div
                    className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-white border border-[#CBD8E0] items-center justify-center text-[#596E79] shadow-2xs pointer-events-none"
                    aria-hidden="true"
                  >
                    <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* =========================================================================
            PAINEL DA ETAPA SELECIONADA:
            Nome da etapa, Data e horário registrados, Estado, Responsável fictício ou perfil,
            Ocorrências, Informações ausentes, Referência da origem demonstrativa.
            ========================================================================= */}
        <div className="bg-white rounded-xl border border-[#087F8C]/30 p-5 shadow-xs space-y-5">
          {/* Topo do painel da etapa */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EEF3F6]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E6F4F6] text-[#087F8C] flex items-center justify-center shrink-0">
                <Workflow className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#8A9BA8]">
                    ETAPA 0{activeStepDetail.order} DE 05
                  </span>
                  <span className="text-[#8A9BA8]">•</span>
                  {getStepStateBadge(activeStepDetail.state)}
                </div>
                <h3 className="text-base font-semibold text-[#172B36]">
                  {activeStepDetail.stepName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#596E79]">Referência de Origem:</span>
              <span className="font-mono font-medium text-[#172B36] bg-[#F1F5F9] px-2 py-1 rounded border border-[#E2E8F0]">
                {activeStepDetail.sourceReference}
              </span>
            </div>
          </div>

          {/* Grid de atributos da etapa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Responsável Fictício ou Perfil */}
            <div className="p-3.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] space-y-1.5">
              <span className="text-[10px] font-semibold text-[#8A9BA8] uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Responsável Técnico / Perfil</span>
              </span>
              <p className="text-xs font-semibold text-[#172B36]">
                {activeStepDetail.responsibleName || 'Aguardando designação de operador'}
              </p>
              <p className="text-[11px] text-[#596E79]">
                {activeStepDetail.responsibleRole || 'Bancada operacional da central'}
              </p>
            </div>

            {/* Data e Horário Registrados */}
            <div className="p-3.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] space-y-1.5">
              <span className="text-[10px] font-semibold text-[#8A9BA8] uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Data e Horário Registrados</span>
              </span>
              <p className="text-xs font-mono font-semibold text-[#172B36]">
                {activeStepDetail.timestamp || 'Registro ainda não emitido'}
              </p>
              <p className="text-[11px] text-[#596E79]">
                {activeStepDetail.timestamp
                  ? 'Carimbo de tempo certificado em rotina'
                  : 'Etapa aguardando avanço do fluxo'}
              </p>
            </div>

            {/* Estado Operacional e Configuração Provisória */}
            <div className="p-3.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] space-y-1.5">
              <span className="text-[10px] font-semibold text-[#8A9BA8] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Status da Etapa Provisória</span>
              </span>
              <p className="text-xs font-semibold text-[#172B36] capitalize">
                {activeStepDetail.state.replace('_', ' ')}
              </p>
              <p className="text-[11px] text-[#596E79]">
                Mapeamento flexível para procedimentos laboratoriais
              </p>
            </div>
          </div>

          {/* Ocorrências e Informações Ausentes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ocorrências Registradas nesta Etapa */}
            <div className="p-4 rounded-lg border border-[#E5EBEF] bg-[#F8FAFB] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#172B36] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Ocorrências Registradas ({activeStepDetail.occurrences.length})</span>
                </span>
                <span className="text-[10px] text-[#8A9BA8]">Acompanhamento da bancada</span>
              </div>

              {activeStepDetail.occurrences.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#8A9BA8] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Nenhuma ocorrência registrada nesta etapa.</span>
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {activeStepDetail.occurrences.map((oc, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#9F1239] bg-[#FFE4E6]/50 p-2 rounded border border-[#FECDD3] flex items-start gap-2"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{oc}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Informações Ausentes / Pendentes nesta Etapa */}
            <div className="p-4 rounded-lg border border-[#E5EBEF] bg-[#F8FAFB] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#172B36] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#087F8C]" />
                  <span>
                    Informações Ausentes / Pendências ({activeStepDetail.missingInformation.length})
                  </span>
                </span>
                <span className="text-[10px] text-[#8A9BA8]">Checklist operacional</span>
              </div>

              {activeStepDetail.missingInformation.length === 0 ? (
                <div className="py-4 text-center text-xs text-[#065F46] flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Nenhuma pendência ou informação ausente.</span>
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {activeStepDetail.missingInformation.map((info, i) => (
                    <li
                      key={i}
                      className="text-xs text-[#596E79] bg-white p-2 rounded border border-[#E5EBEF] flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{info}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Métricas de QC da etapa quando existirem */}
          {activeStepDetail.qcMetrics && activeStepDetail.qcMetrics.length > 0 && (
            <div className="p-3.5 rounded-lg bg-[#EEF3F6]/60 border border-[#D9E3EA] space-y-2">
              <span className="text-[10px] font-semibold text-[#596E79] uppercase tracking-wider block">
                Parâmetros Analíticos da Etapa (Demonstrativos)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeStepDetail.qcMetrics.map((qc, i) => (
                  <div
                    key={i}
                    className="bg-white p-2.5 rounded-md border border-[#E5EBEF] space-y-0.5"
                  >
                    <span className="text-[10px] text-[#8A9BA8] block">{qc.label}</span>
                    <span className="text-xs font-mono font-semibold text-[#172B36]">
                      {qc.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nota técnica de conformidade */}
          <div className="pt-2 text-[11px] text-[#8A9BA8] flex items-center justify-between border-t border-[#EEF3F6]">
            <span>
              Configuração: As etapas são provisórias e facilmente configuráveis após mapeamento
              real dos procedimentos laboratoriais.
            </span>
            <span className="font-mono text-[#087F8C]">CPDHRCE • rastreabilidade v1.0</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SEÇÃO SECUNDÁRIA — Histórico e Ocorrências
             Timeline de eventos mostrando alterações, movimentações e registros fictícios do exame.
             Previsão visual para identificar:
             - Ocorrência registrada
             - Reteste associado
             - Causa confirmada
             - Causa provável
             - Causa não determinada
             Aviso explícito: não determina automaticamente causas nem solicita reteste.
          ========================================================================= */}
      <section aria-labelledby="historico-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2
              id="historico-heading"
              className="text-sm font-semibold text-[#172B36] tracking-tight flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-[#087F8C]" />
              <span>Histórico de Eventos e Ocorrências do Exame</span>
            </h2>
            <p className="text-xs text-[#596E79] mt-0.5">
              Rastreabilidade cronológica com classificação demonstrativa de causas de ocorrências e
              retestes associados.
            </p>
          </div>

          {/* Filtro de causas para o histórico */}
          <div className="flex items-center gap-1.5 text-xs bg-white p-1 rounded-lg border border-[#E5EBEF] shadow-2xs">
            <span className="text-[#596E79] text-[11px] font-medium px-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#087F8C]" />
              <span>Causas:</span>
            </span>
            {(
              [
                { id: 'todas', label: 'Todas' },
                { id: 'confirmada', label: 'Confirmada' },
                { id: 'provavel', label: 'Provável' },
                { id: 'nao_determinada', label: 'Não determinada' },
              ] as const
            ).map((opt) => {
              const isActive = causeFilter === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCauseFilter(opt.id)}
                  className={cn(
                    'px-2 py-0.5 text-[11px] font-medium rounded transition-all',
                    isActive
                      ? 'bg-[#102A38] text-white shadow-2xs'
                      : 'text-[#596E79] hover:text-[#172B36] hover:bg-[#F8FAFB]',
                  )}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Resumo visual dos tipos de causas previstos no sistema */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-[#E5EBEF] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              <span className="font-semibold text-[#172B36]">Causa confirmada</span>
            </div>
            <p className="text-[11px] text-[#596E79]">
              Fator técnico identificado por validação laboratorial (ex: kit reagente, controle
              fora).
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-[#E5EBEF] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span className="font-semibold text-[#172B36]">Causa provável</span>
            </div>
            <p className="text-[11px] text-[#596E79]">
              Hipótese técnica de maior probabilidade segundo comportamento do ensaio.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-[#E5EBEF] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#64748B]" />
              <span className="font-semibold text-[#172B36]">Causa não determinada</span>
            </div>
            <p className="text-[11px] text-[#596E79]">
              Registro mantido em investigação sem atribuição conclusiva no momento.
            </p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-[#E5EBEF] space-y-1">
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#E11D48]" />
              <span className="font-semibold text-[#172B36]">Reteste associado</span>
            </div>
            <p className="text-[11px] text-[#596E79]">
              Vinculação com guia de reteste operacional mantendo a rastreabilidade da amostra.
            </p>
          </div>
        </div>

        {/* Timeline Vertical de Eventos */}
        <div className="bg-white rounded-xl border border-[#E5EBEF] p-5 shadow-2xs space-y-6">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5EBEF]">
            {filteredEvents.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#8A9BA8]">
                Nenhum evento encontrado para o filtro de causa selecionado.
              </div>
            ) : (
              filteredEvents.map((ev, idx) => {
                const isRetest = ev.type === 'reteste'
                const isOccurrence = ev.type === 'ocorrencia'

                return (
                  <div key={ev.id} className="relative group space-y-1.5">
                    {/* Marcador na linha do tempo */}
                    <div
                      className={cn(
                        'absolute -left-6 top-1 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center transition-all',
                        isRetest
                          ? 'border-[#E11D48] text-[#E11D48] shadow-xs'
                          : isOccurrence
                            ? 'border-[#D97706] text-[#D97706]'
                            : 'border-[#087F8C] text-[#087F8C]',
                      )}
                    >
                      {isRetest ? (
                        <RotateCcw className="w-2.5 h-2.5" />
                      ) : isOccurrence ? (
                        <AlertTriangle className="w-2.5 h-2.5" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />
                      )}
                    </div>

                    {/* Conteúdo do evento */}
                    <div className="p-3.5 rounded-lg border border-[#E5EBEF] bg-[#F8FAFB] hover:bg-white hover:border-[#CBD8E0] transition-all space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-[#172B36]">{ev.title}</h4>
                          {ev.badgeLabel && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-[#EEF3F6] text-[#596E79]">
                              {ev.badgeLabel}
                            </span>
                          )}
                          {ev.causeClassification && getCauseBadge(ev.causeClassification)}
                          {ev.hasAssociatedRetest && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-[#E11D48] bg-[#FFE4E6] px-1.5 py-0.2 rounded border border-[#FECDD3]">
                              <RotateCcw className="w-2.5 h-2.5" />
                              <span>{ev.retestId || 'Reteste'}</span>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-[#8A9BA8] font-mono">
                          <Clock className="w-3 h-3 text-[#8A9BA8]" />
                          <span>{ev.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#596E79] leading-relaxed">{ev.description}</p>

                      {/* Causa detalhada quando disponível */}
                      {ev.causeDescription && (
                        <div className="p-2.5 rounded bg-white border border-[#E5EBEF] text-[11px] space-y-0.5">
                          <span className="font-semibold text-[#172B36] block">
                            Detalhamento da Causa Registrada:
                          </span>
                          <span className="text-[#596E79]">{ev.causeDescription}</span>
                        </div>
                      )}

                      {/* Responsável pelo registro */}
                      <div className="flex items-center justify-between pt-1 border-t border-[#EEF3F6] text-[10px] text-[#8A9BA8]">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-[#087F8C]" />
                          <span>
                            Registrado por:{' '}
                            <strong className="text-[#172B36]">{ev.responsibleName}</strong> (
                            {ev.responsibleRole})
                          </span>
                        </span>
                        {ev.stepId && (
                          <span className="font-mono text-[#596E79] uppercase">
                            Etapa: {ev.stepId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Aviso regulatório e de escopo */}
          <div className="p-3.5 rounded-lg bg-[#EEF3F6] border border-[#D9E3EA] text-[11px] text-[#596E79] space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#172B36]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Regra de Operação & Limites do Sistema</span>
            </div>
            <p className="leading-relaxed">
              O sistema <strong>não cria mecanismos que determinem automaticamente a causa</strong>{' '}
              de falhas operacionais nem solicita retestes de forma automática. Todas as
              classificações expostas nesta tela são demonstrativas e representam registros manuais
              de conferência laboratorial para auditoria e controle de qualidade.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetalheExamePage
