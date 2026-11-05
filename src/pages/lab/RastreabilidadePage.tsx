import React from 'react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import {
  LabCard,
  LabCardHeader,
  LabCardTitle,
  LabCardDescription,
  LabCardContent,
} from '@/components/lab/LabCard'
import { LAB_FLOW_STEPS, MOCK_EXAM_SAMPLES } from '@/data/labMockData'
import { GitBranch, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react'

export const RastreabilidadePage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Rastreabilidade de Bancada"
        description="Registro demonstrativo de rastreamento ponto a ponto de lotes, tubos e etapas de acompanhamento — sem afirmação de cadeia de custódia validada ou calibração verificada."
        badge={
          <StatusBadge variant="neutral" size="sm">
            Registro de Custódia Demonstrativo
          </StatusBadge>
        }
      />

      {/* Timeline view of stages */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#596E79]">
          Linha do Tempo dos Processos Laboratoriais (dados demonstrativos)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LAB_FLOW_STEPS.map((step, idx) => (
            <LabCard key={step.step} variant="default" className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#087F8C] font-semibold">
                    Etapa 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569]">
                    {MOCK_EXAM_SAMPLES.filter((exam) => exam.currentStep === step.step).length} na
                    bancada
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#172B36]">{step.label}</h3>
                <p className="text-xs text-[#596E79] mt-1 leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EEF3F6] flex items-center justify-between text-xs text-[#8A9BA8] font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#596E79]" />
                  <span>Tempo demonstrativo: {step.averageTime}</span>
                </span>
                <span className="text-[#8A9BA8] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Calibração: não verificado neste protótipo</span>
                </span>
              </div>
            </LabCard>
          ))}
        </div>
      </div>

      {/* Protocol Audit sample */}
      <LabCard variant="subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-[#172B36]">
              Registro Demonstrativo de Logs de Equipamento
            </h3>
            <p className="text-xs text-[#596E79]">
              Registros de carimbo de data/hora das etapas são gerados com dados simulados. A
              conexão com equipamentos reais do laboratório ainda não está configurada neste
              protótipo.
            </p>
          </div>
          <button
            type="button"
            className="px-3.5 py-1.5 text-xs font-medium bg-white border border-[#E5EBEF] text-[#172B36] rounded-lg hover:bg-[#EEF3F6] transition-colors shrink-0"
          >
            Visualizar Logs de Corrida
          </button>
        </div>
      </LabCard>
    </div>
  )
}

export default RastreabilidadePage
