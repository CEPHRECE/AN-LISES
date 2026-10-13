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
import { MOCK_METRICS } from '@/data/labMockData'
import { BarChart3, TrendingUp, Clock, CheckCircle2, Award } from 'lucide-react'

export const IndicadoresPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Indicadores de Eficiência Analítica"
        description="Métricas operacionais de tempo de resposta (Turnaround Time - TAT), índice de concordância alélica e produtividade de bancada."
        badge={
          <StatusBadge variant="success" size="sm">
            Meta Operacional Atingida (99.1%)
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
              <LabCardTitle>Distribuição do TAT por Metodologia</LabCardTitle>
              <LabCardDescription>
                Tempo médio de liberação desde o recebimento do tubo
              </LabCardDescription>
            </div>
            <span className="text-xs font-mono text-[#087F8C]">Média Geral: 42.4h</span>
          </LabCardHeader>
          <LabCardContent>
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs text-[#172B36] font-medium mb-1">
                  <span>SSP Baixa Resolução (Urgências)</span>
                  <span className="font-mono">4.2 horas</span>
                </div>
                <div className="h-2 w-full bg-[#E5EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#059669] rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-[#172B36] font-medium mb-1">
                  <span>SSO Luminex (Painéis Médios)</span>
                  <span className="font-mono">22.8 horas</span>
                </div>
                <div className="h-2 w-full bg-[#E5EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#087F8C] rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-[#172B36] font-medium mb-1">
                  <span>NGS Alta Resolução (Painel Completo 11 Loci)</span>
                  <span className="font-mono">46.5 horas</span>
                </div>
                <div className="h-2 w-full bg-[#E5EBEF] rounded-full overflow-hidden">
                  <div className="h-full bg-[#102A38] rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </LabCardContent>
        </LabCard>

        <LabCard>
          <LabCardHeader>
            <div>
              <LabCardTitle>Conformidade em Ensaios de Proficiência</LabCardTitle>
              <LabCardDescription>
                Desempenho no programa internacional UCLA e CAP
              </LabCardDescription>
            </div>
            <Award className="w-4 h-4 text-[#087F8C]" />
          </LabCardHeader>
          <LabCardContent>
            <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E5EBEF] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#172B36]">
                  Concordância Alélica UCLA 2024/2025
                </span>
                <span className="font-mono font-bold text-xs text-[#059669]">100%</span>
              </div>
              <p className="text-xs text-[#596E79] leading-relaxed">
                Todas as 24 amostras cegas enviadas pelo comitê internacional de
                histocompatibilidade foram tipadas com concordância absoluta em primeiro e segundo
                campos de resolução.
              </p>
            </div>
          </LabCardContent>
        </LabCard>
      </div>
    </div>
  )
}

export default IndicadoresPage
