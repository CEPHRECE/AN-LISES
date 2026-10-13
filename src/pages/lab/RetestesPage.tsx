import React from 'react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import { LabCard } from '@/components/lab/LabCard'
import { LabTable } from '@/components/lab/LabTable'
import { MOCK_EXAM_SAMPLES } from '@/data/labMockData'
import { RotateCcw, AlertTriangle, ShieldCheck, FileQuestion, ArrowRight } from 'lucide-react'

export const RetestesPage: React.FC = () => {
  const retestExams = MOCK_EXAM_SAMPLES.filter((exam) => exam.needsRetest)

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Investigação de Retestes"
        description="Painel de controle de qualidade para resolução de ambiguidades alélicas, reamplificação de amostras limítrofes e confirmação de variantes raras."
        badge={
          <StatusBadge variant="danger" size="sm" pulse>
            {retestExams.length} Casos em Análise
          </StatusBadge>
        }
      />

      {/* Retest Protocol Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LabCard className="border-l-4 border-l-[#E11D48]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E11D48] mb-1">
            <AlertTriangle className="w-4 h-4" />
            <span>Critérios de Abertura</span>
          </div>
          <p className="text-xs text-[#596E79] leading-relaxed">
            Discrepância entre métodos (NGS vs SSO), sinal abaixo do threshold ou ambiguidade em
            locos com impacto no transplante (ex: HLA-DRB1).
          </p>
        </LabCard>

        <LabCard className="border-l-4 border-l-[#087F8C]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#087F8C] mb-1">
            <RotateCcw className="w-4 h-4" />
            <span>Fluxo de Repetição</span>
          </div>
          <p className="text-xs text-[#596E79] leading-relaxed">
            Repetição automática a partir de alíquota reserva de DNA ou nova extração se a pureza
            260/280 estiver fora do intervalo ótimo.
          </p>
        </LabCard>

        <LabCard className="border-l-4 border-l-[#059669]">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#059669] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Validação por Par</span>
          </div>
          <p className="text-xs text-[#596E79] leading-relaxed">
            Conferência cega por dois biomédicos especialistas antes da liberação final do relatório
            técnico.
          </p>
        </LabCard>
      </div>

      {/* Table of Retests */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#596E79]">
          Amostras com Pendência de Reteste
        </h2>
        <LabTable exams={retestExams} />
      </div>
    </div>
  )
}

export default RetestesPage
