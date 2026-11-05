import React from 'react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import { LabCard } from '@/components/lab/LabCard'
import { LabTable } from '@/components/lab/LabTable'
import { MOCK_EXAM_SAMPLES } from '@/data/labMockData'
import { Info } from 'lucide-react'

export const RetestesPage: React.FC = () => {
  const retestExams = MOCK_EXAM_SAMPLES.filter((exam) => exam.needsRetest)

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Investigação de Retestes"
        description="Painel demonstrativo de acompanhamento de investigações humanas de discrepâncias. Nenhuma regra automática de abertura ou repetição está em vigor neste protótipo."
        badge={
          <StatusBadge variant="warning" size="sm">
            {retestExams.length} Pendências Demonstrativas
          </StatusBadge>
        }
      />

      {/* Investigação humana — sem regras automáticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LabCard>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172B36] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#059669] shrink-0" />
            <span>Causa Confirmada</span>
          </div>
          <p className="text-xs text-[#596E79] leading-relaxed">
            Investigação humana concluída com causa determinada e registrada por responsável
            designado — somente para casos com investigação explícita nos dados demonstrativos.
          </p>
        </LabCard>

        <LabCard>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172B36] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#087F8C] shrink-0" />
            <span>Causa Provável</span>
          </div>
          <p className="text-xs text-[#596E79] leading-relaxed">
            Investigação em andamento com hipótese registrada, ainda sem conclusão formal — não
            representa decisão automática da aplicação.
          </p>
        </LabCard>

        <LabCard>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172B36] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8A9BA8] shrink-0" />
            <span>Causa Não Determinada</span>
          </div>
          <p className="text-xs text-[#596E79] leading-relaxed">
            Caso sem causa identificada até o momento — permanece em investigação humana, sem
            qualquer ação automática de repetição.
          </p>
        </LabCard>
      </div>

      <LabCard className="border-l-4 border-l-[#8A9BA8]">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-[#8A9BA8] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#172B36]">
              Nenhuma regra automática está em vigor
            </p>
            <p className="text-xs text-[#596E79] leading-relaxed">
              Este protótipo não abre retestes e não decide repetir análises. "Reteste registrado"
              aparece somente quando há registro explícito de repetição nos dados demonstrativos;
              casos com a marcação legada de pendência não comprovam que a repetição ocorreu e
              permanecem identificados como pendência demonstrativa até o modelo ser substituído.
            </p>
          </div>
        </div>
      </LabCard>

      {/* Table of Retests */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#596E79]">
          Casos com Pendência Demonstrativa de Reteste
        </h2>
        <LabTable exams={retestExams} />
      </div>
    </div>
  )
}

export default RetestesPage
