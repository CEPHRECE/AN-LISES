import React from 'react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import { MetricCard } from '@/components/lab/MetricCard'
import {
  LabCard,
  LabCardHeader,
  LabCardTitle,
  LabCardDescription,
  LabCardContent,
} from '@/components/lab/LabCard'
import { MOCK_METRICS, MOCK_EXAM_SAMPLES, LAB_FLOW_STEPS } from '@/data/labMockData'
import { Info } from 'lucide-react'

export const IndicadoresPage: React.FC = () => {
  // Métricas 100% derivadas dos dados demonstrativos carregados (nenhum valor absoluto externo)
  const totalSamples = MOCK_EXAM_SAMPLES.length
  const countByMethodology = (methodology: string) =>
    MOCK_EXAM_SAMPLES.filter((exam) => exam.methodology === methodology).length
  const countBySituation = (situation: string) =>
    MOCK_EXAM_SAMPLES.filter((exam) => exam.situation === situation).length
  const closedCount = countBySituation('concluido')
  const inProgressCount = totalSamples - closedCount

  const methodologyDistribution = ['Metodologia A', 'Metodologia B', 'Metodologia C'].map(
    (methodology) => ({
      methodology,
      count: countByMethodology(methodology),
      pct: Math.round((countByMethodology(methodology) / totalSamples) * 100),
    }),
  )

  const journeyDistribution = LAB_FLOW_STEPS.map((step) => ({
    label: step.label,
    count: MOCK_EXAM_SAMPLES.filter((exam) => exam.currentStep === step.step).length,
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Indicadores Demonstrativos"
        description="Contagens e distribuições derivadas exclusivamente dos dados demonstrativos carregados neste protótipo. Não afirmam conformidade, calibração, desempenho clínico ou economia."
        badge={
          <StatusBadge variant="neutral" size="sm">
            Dados Demonstrativos
          </StatusBadge>
        }
      />

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LabCard>
          <LabCardHeader>
            <div>
              <LabCardTitle>Distribuição por Metodologia (dados carregados)</LabCardTitle>
              <LabCardDescription>
                Contagem de amostras demonstrativas por metodologia rotulada
              </LabCardDescription>
            </div>
            <span className="text-xs font-mono text-[#087F8C]">Total: {totalSamples} amostras</span>
          </LabCardHeader>
          <LabCardContent>
            <div className="space-y-4 pt-2">
              {methodologyDistribution.map((item) => (
                <div key={item.methodology}>
                  <div className="flex items-center justify-between text-xs text-[#172B36] font-medium mb-1">
                    <span>{item.methodology}</span>
                    <span className="font-mono">
                      {item.count} amostras ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#E5EBEF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#087F8C] rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[11px] text-[#8A9BA8] leading-relaxed pt-1">
                Os rótulos Metodologia A, B e C são provisórios — as metodologias reais ainda não
                foram definidas para este protótipo.
              </p>
            </div>
          </LabCardContent>
        </LabCard>

        <LabCard>
          <LabCardHeader>
            <div>
              <LabCardTitle>Distribuição por Etapa da Jornada (dados carregados)</LabCardTitle>
              <LabCardDescription>
                Quantidade de amostras demonstrativas em cada etapa operacional
              </LabCardDescription>
            </div>
            <Info className="w-4 h-4 text-[#087F8C]" />
          </LabCardHeader>
          <LabCardContent>
            <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E5EBEF] space-y-3">
              {journeyDistribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#172B36]">{item.label}</span>
                  <span className="font-mono font-bold text-xs text-[#087F8C]">{item.count}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#E5EBEF] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#172B36]">
                  Acompanhamentos encerrados
                </span>
                <span className="font-mono font-bold text-xs text-[#172B36]">{closedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#172B36]">Em acompanhamento</span>
                <span className="font-mono font-bold text-xs text-[#172B36]">
                  {inProgressCount}
                </span>
              </div>
            </div>
          </LabCardContent>
        </LabCard>
      </div>

      <p className="text-[11px] text-[#8A9BA8] leading-relaxed border-t border-[#E5EBEF] pt-4">
        Nota: todos os indicadores desta página são demonstrativos, derivados dos dados simulados
        carregados no protótipo. Não representam métricas reais do laboratório, não afirmam
        conformidade, calibração, desempenho clínico ou economia, e não caracterizam emissão de
        laudo.
      </p>
    </div>
  )
}

export default IndicadoresPage
