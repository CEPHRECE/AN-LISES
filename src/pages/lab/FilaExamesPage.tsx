import React, { useMemo, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  AlertTriangle,
  Clock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle2,
  Calendar,
  X,
  FileText,
  SlidersHorizontal,
} from 'lucide-react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import { LabCard } from '@/components/lab/LabCard'
import {
  MOCK_EXAM_SAMPLES,
  OPERATIONAL_JOURNEY_STEPS,
  LabExamSample,
  OperationalJourneyStep,
  OperationalSituation,
} from '@/data/labMockData'
import { cn } from '@/lib/utils'

// Tipos de abas solicitadas: Todos / Em processamento / Aguardando análise / Em revisão / Encerrados
export type FilaTabKey =
  | 'todos'
  | 'processamento'
  | 'aguardando_analise'
  | 'em_revisao'
  | 'encerrados'

export type SortField =
  | 'protocolNumber'
  | 'sampleId'
  | 'examType'
  | 'arrivalDate'
  | 'journeyStep'
  | 'situation'
  | 'retest'
  | 'lastUpdate'

export type SortDirection = 'asc' | 'desc'

export const FilaExamesPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // Recupera estado da query string para navegação idempotente e preservação ao voltar
  const activeTab = (searchParams.get('tab') as FilaTabKey) || 'todos'
  const searchValue = searchParams.get('q') || ''
  const stepFilter = searchParams.get('etapa') || 'todas'
  const situationFilter = searchParams.get('situacao') || 'todas'
  const periodFilter = searchParams.get('periodo') || 'todos'
  const sortField = (searchParams.get('ordem') as SortField) || 'arrivalDate'
  const sortDirection = (searchParams.get('dir') as SortDirection) || 'desc'

  // Helper para atualizar searchParams
  const updateParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === '' || val === 'todas' || val === 'todos') {
        nextParams.delete(key)
      } else {
        nextParams.set(key, val)
      }
    })
    setSearchParams(nextParams, { replace: true })
  }

  // Contagens para as abas principais
  const tabCounts = useMemo(() => {
    return {
      todos: MOCK_EXAM_SAMPLES.length,
      processamento: MOCK_EXAM_SAMPLES.filter(
        (e) => e.journeyStep === 'processamento' || e.journeyStep === 'recebimento',
      ).length,
      aguardando_analise: MOCK_EXAM_SAMPLES.filter(
        (e) => e.situation === 'aguardando_analise' || e.journeyStep === 'analise',
      ).length,
      em_revisao: MOCK_EXAM_SAMPLES.filter(
        (e) => e.situation === 'aguardando_revisao' || e.journeyStep === 'revisao',
      ).length,
      encerrados: MOCK_EXAM_SAMPLES.filter(
        (e) => e.situation === 'concluido' || e.journeyStep === 'encerramento',
      ).length,
    }
  }, [])

  // Filtragem e ordenação
  const filteredAndSortedExams = useMemo(() => {
    let result = [...MOCK_EXAM_SAMPLES]

    // 1. Filtro por Aba
    if (activeTab === 'processamento') {
      result = result.filter(
        (e) => e.journeyStep === 'processamento' || e.journeyStep === 'recebimento',
      )
    } else if (activeTab === 'aguardando_analise') {
      result = result.filter(
        (e) => e.situation === 'aguardando_analise' || e.journeyStep === 'analise',
      )
    } else if (activeTab === 'em_revisao') {
      result = result.filter(
        (e) => e.situation === 'aguardando_revisao' || e.journeyStep === 'revisao',
      )
    } else if (activeTab === 'encerrados') {
      result = result.filter((e) => e.situation === 'concluido' || e.journeyStep === 'encerramento')
    }

    // 2. Busca por Identificador (protocolo, amostra ou tipo)
    if (searchValue.trim()) {
      const q = searchValue.trim().toLowerCase()
      result = result.filter(
        (e) =>
          e.protocolNumber.toLowerCase().includes(q) ||
          e.sampleId.toLowerCase().includes(q) ||
          e.examType.toLowerCase().includes(q) ||
          e.methodology.toLowerCase().includes(q) ||
          e.targetLoci.toLowerCase().includes(q),
      )
    }

    // 3. Filtro de Etapa
    if (stepFilter !== 'todas') {
      result = result.filter((e) => e.journeyStep === stepFilter)
    }

    // 4. Filtro de Situação
    if (situationFilter !== 'todas') {
      result = result.filter((e) => e.situation === situationFilter)
    }

    // 5. Filtro de Período
    if (periodFilter !== 'todos') {
      const days = parseInt(periodFilter, 10)
      if (!isNaN(days)) {
        result = result.filter((e) => (e.periodDaysAgo || 1) <= days)
      }
    }

    // 6. Ordenação
    result.sort((a, b) => {
      let valA: string | number = ''
      let valB: string | number = ''

      switch (sortField) {
        case 'protocolNumber':
          valA = a.protocolNumber
          valB = b.protocolNumber
          break
        case 'sampleId':
          valA = a.sampleId
          valB = b.sampleId
          break
        case 'examType':
          valA = a.examType
          valB = b.examType
          break
        case 'journeyStep':
          valA = a.journeyStep
          valB = b.journeyStep
          break
        case 'situation':
          valA = a.situation
          valB = b.situation
          break
        case 'retest':
          valA = a.needsRetest ? 1 : 0
          valB = b.needsRetest ? 1 : 0
          break
        case 'lastUpdate':
          valA = a.lastUpdate
          valB = b.lastUpdate
          break
        case 'arrivalDate':
        default:
          valA = a.arrivalDate
          valB = b.arrivalDate
          break
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [activeTab, searchValue, stepFilter, situationFilter, periodFilter, sortField, sortDirection])

  // Alterna ordenação de coluna
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      updateParams({ dir: sortDirection === 'asc' ? 'desc' : 'asc' })
    } else {
      updateParams({ ordem: field, dir: 'asc' })
    }
  }

  // Navega para o detalhe mantendo os queryParams para que o "Voltar" possa restaurar
  const handleOpenDetail = (examId: string) => {
    const currentQuery = searchParams.toString()
    navigate({
      pathname: `/exames/${examId}`,
      search: currentQuery ? `?from=${encodeURIComponent(currentQuery)}` : '',
    })
  }

  // Mapeamento visual das situações
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

  // Mapeamento das etapas da jornada
  const getJourneyStepName = (stepId: OperationalJourneyStep) => {
    const found = OPERATIONAL_JOURNEY_STEPS.find((s) => s.id === stepId)
    return found ? found.name : stepId
  }

  // Limpa todos os filtros ativos
  const hasActiveFilters =
    searchValue !== '' ||
    stepFilter !== 'todas' ||
    situationFilter !== 'todas' ||
    periodFilter !== 'todos' ||
    activeTab !== 'todos'

  const clearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Aviso de ambiente demonstrativo */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#EEF3F6] border border-[#D9E3EA] text-[#596E79]">
          <span className="w-2 h-2 rounded-full bg-[#087F8C] animate-pulse" />
          <span className="font-medium text-[#172B36]">Ambiente demonstrativo</span>
          <span className="text-[#8A9BA8]">•</span>
          <span className="text-[11px] text-[#596E79]">
            Dados fictícios, sem nomes ou informações identificáveis de pacientes. Finalidade
            exclusiva de acompanhamento e rastreabilidade.
          </span>
        </div>

        <span className="text-[11px] text-[#8A9BA8] font-mono">
          CPDHRCE • Fila Operacional v1.0
        </span>
      </div>

      {/* Cabeçalho da página conforme especificação */}
      <PageHeader
        title="Fila de Exames"
        description="Acompanhamento laboratorial de amostras com alta densidade de informação, rastreabilidade operacional de etapas, controle de situações e histórico de retestes."
        badge={
          <StatusBadge variant="primary" size="sm">
            {tabCounts.todos} Exames na Central
          </StatusBadge>
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const csvHeader =
                  'Identificador,Amostra,Tipo,DataEntrada,Etapa,Situacao,Reteste,UltimaAtualizacao\n'
                const csvRows = filteredAndSortedExams
                  .map(
                    (e) =>
                      `"${e.protocolNumber}","${e.sampleId}","${e.examType}","${e.arrivalDate}","${e.journeyStep}","${e.situation}","${e.needsRetest ? e.retestReason || 'Sim' : 'Nao'}","${e.lastUpdate}"`,
                  )
                  .join('\n')
                const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `fila_exames_cpdhrce_${Date.now()}.csv`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E5EBEF] bg-white hover:bg-[#F8FAFB] text-[#172B36] transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-[#596E79]" />
              <span>Exportar (.csv)</span>
            </button>
          </div>
        }
      />

      {/* Abas solicitadas: Todos / Em processamento / Aguardando análise / Em revisão / Encerrados */}
      <div className="border-b border-[#E5EBEF]">
        <div className="flex items-center gap-2 overflow-x-auto pb-px scrollbar-none">
          {[
            { key: 'todos', label: 'Todos', count: tabCounts.todos },
            {
              key: 'processamento',
              label: 'Em processamento',
              count: tabCounts.processamento,
            },
            {
              key: 'aguardando_analise',
              label: 'Aguardando análise',
              count: tabCounts.aguardando_analise,
            },
            {
              key: 'em_revisao',
              label: 'Em revisão',
              count: tabCounts.em_revisao,
            },
            {
              key: 'encerrados',
              label: 'Encerrados',
              count: tabCounts.encerrados,
            },
          ].map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => updateParams({ tab: tab.key === 'todos' ? null : tab.key })}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap',
                  isActive
                    ? 'border-[#087F8C] text-[#087F8C] font-semibold bg-[#E6F4F6]/30'
                    : 'border-transparent text-[#596E79] hover:text-[#172B36] hover:border-[#CBD8E0]',
                )}
              >
                <span>{tab.label}</span>
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded-full text-[10px] font-mono',
                    isActive ? 'bg-[#087F8C] text-white' : 'bg-[#EEF3F6] text-[#596E79]',
                  )}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filtros: Campo de pesquisa por identificador + Filtros de etapa, situação e período */}
      <div className="bg-white rounded-xl border border-[#E5EBEF] p-3.5 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Pesquisa por identificador */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9BA8] pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => updateParams({ q: e.target.value })}
              placeholder="Pesquisar por identificador de exame, amostra, metodologia..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#F8FAFB] text-[#172B36] placeholder-[#8A9BA8] rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C] focus:bg-white transition-all"
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => updateParams({ q: null })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A9BA8] hover:text-[#172B36]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtro de Etapa */}
          <div className="md:col-span-2.5">
            <div className="relative">
              <select
                value={stepFilter}
                onChange={(e) => updateParams({ etapa: e.target.value })}
                className="w-full pl-2.5 pr-8 py-1.5 text-xs bg-[#F8FAFB] text-[#172B36] rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C] appearance-none"
              >
                <option value="todas">Todas as etapas</option>
                <option value="recebimento">Recebimento</option>
                <option value="processamento">Processamento</option>
                <option value="analise">Análise</option>
                <option value="revisao">Revisão</option>
                <option value="encerramento">Encerramento</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A9BA8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filtro de Situação */}
          <div className="md:col-span-2.5">
            <div className="relative">
              <select
                value={situationFilter}
                onChange={(e) => updateParams({ situacao: e.target.value })}
                className="w-full pl-2.5 pr-8 py-1.5 text-xs bg-[#F8FAFB] text-[#172B36] rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C] appearance-none"
              >
                <option value="todas">Todas as situações</option>
                <option value="aguardando_analise">Aguardando análise</option>
                <option value="aguardando_revisao">Aguardando revisão</option>
                <option value="reteste_solicitado">Reteste solicitado</option>
                <option value="em_dia">Em dia</option>
                <option value="concluido">Concluído</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A9BA8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filtro de Período */}
          <div className="md:col-span-2">
            <div className="relative">
              <select
                value={periodFilter}
                onChange={(e) => updateParams({ periodo: e.target.value })}
                className="w-full pl-2.5 pr-8 py-1.5 text-xs bg-[#F8FAFB] text-[#172B36] rounded-lg border border-[#E5EBEF] focus:outline-none focus:border-[#087F8C] appearance-none"
              >
                <option value="todos">Qualquer data</option>
                <option value="1">Hoje (24h)</option>
                <option value="3">Últimos 3 dias</option>
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A9BA8] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Barra de status e contador com ação de limpar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EEF3F6] text-[11px] text-[#596E79]">
          <div className="flex items-center gap-2">
            <span>
              Exibindo{' '}
              <strong className="text-[#172B36] font-mono">{filteredAndSortedExams.length}</strong>{' '}
              de <span className="font-mono">{MOCK_EXAM_SAMPLES.length}</span> exames cadastrados
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-[#087F8C] hover:text-[#044C54] font-medium ml-2 underline"
              >
                <span>Limpar filtros</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-[#8A9BA8]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#E11D48]" />
              <span>
                Reteste sinalizado ({filteredAndSortedExams.filter((e) => e.needsRetest).length})
              </span>
            </span>
            <span>•</span>
            <span>Clique na linha para ver o detalhamento completo</span>
          </div>
        </div>
      </div>

      {/* Tabela Enterprise de Alta Densidade e Legibilidade
          Colunas exigidas:
          - Identificador do exame
          - Identificador fictício da amostra
          - Tipo de exame
          - Data de entrada
          - Etapa atual
          - Situação operacional
          - Registro de reteste, quando existir
          - Última atualização
      */}
      <div className="w-full bg-white rounded-xl border border-[#E5EBEF] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5EBEF] bg-[#F8FAFB] text-[11px] font-semibold uppercase tracking-wider text-[#596E79]">
                {/* 1. Identificador do exame */}
                <th
                  scope="col"
                  onClick={() => handleSort('protocolNumber')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Identificador do exame</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 2. Identificador fictício da amostra */}
                <th
                  scope="col"
                  onClick={() => handleSort('sampleId')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Amostra (fictícia)</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 3. Tipo de exame */}
                <th
                  scope="col"
                  onClick={() => handleSort('examType')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Tipo de exame</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 4. Data de entrada */}
                <th
                  scope="col"
                  onClick={() => handleSort('arrivalDate')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Data de entrada</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 5. Etapa atual */}
                <th
                  scope="col"
                  onClick={() => handleSort('journeyStep')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Etapa atual</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 6. Situação operacional */}
                <th
                  scope="col"
                  onClick={() => handleSort('situation')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Situação operacional</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 7. Registro de reteste */}
                <th
                  scope="col"
                  onClick={() => handleSort('retest')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Registro de reteste</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* 8. Última atualização */}
                <th
                  scope="col"
                  onClick={() => handleSort('lastUpdate')}
                  className="py-3 px-4 cursor-pointer hover:bg-[#EEF3F6] select-none transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Última atualização</span>
                    <ArrowUpDown className="w-3 h-3 text-[#8A9BA8]" />
                  </div>
                </th>

                {/* Ação */}
                <th scope="col" className="py-3 px-4 text-right">
                  Ação
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#EEF3F6] text-xs">
              {filteredAndSortedExams.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#8A9BA8]">
                    <div className="max-w-xs mx-auto space-y-2">
                      <FileText className="w-8 h-8 text-[#CBD8E0] mx-auto" />
                      <p className="font-medium text-[#596E79]">Nenhum exame encontrado</p>
                      <p className="text-[11px] text-[#8A9BA8]">
                        Tente ajustar a busca textual ou os filtros de etapa, situação e período.
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="text-xs text-[#087F8C] font-medium underline mt-2 inline-block"
                        >
                          Redefinir filtros
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedExams.map((exam) => {
                  return (
                    <tr
                      key={exam.id}
                      onClick={() => handleOpenDetail(exam.id)}
                      className={cn(
                        'transition-colors cursor-pointer group hover:bg-[#F8FAFB]',
                        exam.needsRetest && 'border-l-4 border-l-[#E11D48] bg-[#FFFBFB]',
                      )}
                    >
                      {/* 1. Identificador do exame */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#172B36] group-hover:text-[#087F8C] transition-colors whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>{exam.protocolNumber}</span>
                          {exam.priority === 'transplante_imediato' && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded font-sans font-medium bg-[#FFE4E6] text-[#E11D48] border border-[#FECDD3]">
                              Tx Imediato
                            </span>
                          )}
                        </div>
                      </td>

                      {/* 2. Identificador fictício da amostra */}
                      <td className="py-3.5 px-4 font-mono text-[#596E79] whitespace-nowrap">
                        <div>
                          <span className="font-medium text-[#172B36]">{exam.sampleId}</span>
                          <span className="block text-[10px] text-[#8A9BA8] font-sans">
                            {exam.pseudonym}
                          </span>
                        </div>
                      </td>

                      {/* 3. Tipo de exame */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#172B36] leading-tight">
                          {exam.examType}
                        </div>
                        <div className="text-[11px] text-[#596E79] font-mono mt-0.5 truncate max-w-[220px]">
                          {exam.methodology} • {exam.targetLoci}
                        </div>
                      </td>

                      {/* 4. Data de entrada */}
                      <td className="py-3.5 px-4 text-[#596E79] font-mono text-[11px] whitespace-nowrap">
                        {exam.arrivalDate}
                      </td>

                      {/* 5. Etapa atual */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#F1F5F9] text-[#1E3E50] border border-[#E2E8F0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />
                          <span>{getJourneyStepName(exam.journeyStep)}</span>
                        </span>
                        <div className="text-[10px] text-[#8A9BA8] mt-1 truncate max-w-[170px]">
                          {exam.stepName}
                        </div>
                      </td>

                      {/* 6. Situação operacional */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getSituationBadge(exam.situation)}
                      </td>

                      {/* 7. Registro de reteste, quando existir */}
                      <td className="py-3.5 px-4">
                        {exam.needsRetest ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E11D48] bg-[#FFE4E6] px-2 py-0.5 rounded border border-[#FECDD3]">
                              <RotateCcw className="w-3 h-3" />
                              <span>Reteste ativo</span>
                            </span>
                            {exam.retestReason && (
                              <p
                                className="text-[10px] text-[#9F1239] truncate max-w-[220px]"
                                title={exam.retestReason}
                              >
                                {exam.retestReason}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#8A9BA8] italic">Sem reteste</span>
                        )}
                      </td>

                      {/* 8. Última atualização */}
                      <td className="py-3.5 px-4 text-[#596E79] whitespace-nowrap">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3 text-[#8A9BA8]" />
                          <span>{exam.lastUpdate}</span>
                        </div>
                        <span className="text-[10px] text-[#8A9BA8]">{exam.operatorName}</span>
                      </td>

                      {/* Ação */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenDetail(exam.id)
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#087F8C] hover:text-[#044C54] hover:bg-[#E6F4F6] rounded-md transition-colors"
                        >
                          <span>Ver detalhe</span>
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
    </div>
  )
}

export default FilaExamesPage
