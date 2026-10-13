import React from 'react'
import { AlertTriangle, Clock, ArrowRight, Sparkles, ExternalLink, RotateCcw } from 'lucide-react'
import { LabExamSample } from '@/data/labMockData'
import { StatusBadge } from './StatusBadge'
import { cn } from '@/lib/utils'

interface LabTableProps {
  exams: LabExamSample[]
  onSelectExam?: (exam: LabExamSample) => void
  selectedExamId?: string
}

export const LabTable: React.FC<LabTableProps> = ({ exams, onSelectExam, selectedExamId }) => {
  const getPriorityBadge = (priority: LabExamSample['priority']) => {
    switch (priority) {
      case 'transplante_imediato':
        return (
          <StatusBadge variant="danger" size="sm" pulse>
            Tx Imediato
          </StatusBadge>
        )
      case 'urgente':
        return (
          <StatusBadge variant="warning" size="sm">
            Urgente
          </StatusBadge>
        )
      case 'rotina':
      default:
        return (
          <StatusBadge variant="neutral" size="sm" dot={false}>
            Rotina
          </StatusBadge>
        )
    }
  }

  const getStepBadge = (step: LabExamSample['currentStep'], stepName: string) => {
    if (step === 'reteste') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]">
          <RotateCcw className="w-3 h-3 text-[#E11D48]" />
          <span>{stepName}</span>
        </span>
      )
    }

    if (step === 'revisao_tecnica') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>{stepName}</span>
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-[#F1F5F9] text-[#1E3E50] border border-[#E2E8F0]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />
        <span>{stepName}</span>
      </span>
    )
  }

  return (
    <div className="w-full bg-white rounded-xl border border-[#E5EBEF] overflow-hidden shadow-[0_1px_3px_rgba(16,42,56,0.03)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E5EBEF] bg-[#F8FAFB] text-[11px] font-semibold uppercase tracking-wider text-[#596E79]">
              <th scope="col" className="py-3 px-4">
                Protocolo / Amostra
              </th>
              <th scope="col" className="py-3 px-4">
                Metodologia & Loci
              </th>
              <th scope="col" className="py-3 px-4">
                Etapa Operacional
              </th>
              <th scope="col" className="py-3 px-4">
                Progresso
              </th>
              <th scope="col" className="py-3 px-4">
                Prioridade
              </th>
              <th scope="col" className="py-3 px-4">
                Operador / Data
              </th>
              <th scope="col" className="py-3 px-4 text-right">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF3F6] text-xs">
            {exams.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#8A9BA8]">
                  Nenhum exame encontrado para os filtros selecionados.
                </td>
              </tr>
            ) : (
              exams.map((exam) => {
                const isSelected = selectedExamId === exam.id

                return (
                  <tr
                    key={exam.id}
                    onClick={() => onSelectExam?.(exam)}
                    className={cn(
                      'transition-colors cursor-pointer group',
                      isSelected ? 'bg-[#F0F8FA]' : 'hover:bg-[#F8FAFB]',
                      exam.needsRetest && 'border-l-4 border-l-[#E11D48]',
                    )}
                  >
                    {/* Protocol & Sample */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium text-[#172B36] group-hover:text-[#087F8C] transition-colors">
                          {exam.protocolNumber}
                        </span>
                        {exam.needsRetest && (
                          <span
                            title="Reteste solicitado"
                            className="inline-flex p-0.5 rounded bg-red-100 text-red-600"
                          >
                            <AlertTriangle className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#8A9BA8]">
                        <span className="font-mono">{exam.sampleId}</span>
                        <span>•</span>
                        <span>{exam.indication}</span>
                      </div>
                    </td>

                    {/* Methodology */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-[#172B36]">{exam.methodology}</div>
                      <div className="text-[11px] text-[#596E79] font-mono mt-0.5 truncate max-w-[200px]">
                        {exam.targetLoci}
                      </div>
                    </td>

                    {/* Current Step */}
                    <td className="py-3 px-4">
                      {getStepBadge(exam.currentStep, exam.stepName)}
                      {exam.retestReason && (
                        <p
                          className="mt-1 text-[10px] text-[#E11D48] max-w-[220px] truncate"
                          title={exam.retestReason}
                        >
                          {exam.retestReason}
                        </p>
                      )}
                    </td>

                    {/* Progress Bar */}
                    <td className="py-3 px-4">
                      <div className="w-28">
                        <div className="flex items-center justify-between text-[10px] text-[#596E79] mb-1 font-mono">
                          <span>{exam.stepProgress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#E5EBEF] rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-300',
                              exam.needsRetest
                                ? 'bg-[#E11D48]'
                                : exam.stepProgress >= 90
                                  ? 'bg-[#059669]'
                                  : 'bg-[#087F8C]',
                            )}
                            style={{ width: `${exam.stepProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="py-3 px-4">{getPriorityBadge(exam.priority)}</td>

                    {/* Operator / Arrival */}
                    <td className="py-3 px-4">
                      <div className="text-[#172B36] font-medium">{exam.operatorName}</div>
                      <div className="flex items-center gap-1 text-[11px] text-[#8A9BA8] mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{exam.lastUpdate}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectExam?.(exam)
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
  )
}

export default LabTable
