import React from 'react'
import {
  X,
  FileText,
  Clock,
  User,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Dna,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react'
import { LabExamSample } from '@/data/labMockData'
import { StatusBadge } from './StatusBadge'

interface ExamDetailDrawerProps {
  exam: LabExamSample | null
  onClose: () => void
}

export const ExamDetailDrawer: React.FC<ExamDetailDrawerProps> = ({ exam, onClose }) => {
  if (!exam) return null

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-[#E5EBEF] shadow-2xl flex flex-col animate-slide-up sm:animate-none">
      {/* Drawer Header */}
      <div className="p-5 border-b border-[#E5EBEF] flex items-center justify-between bg-[#F8FAFB]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#E6F4F6] text-[#087F8C]">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-[#172B36]">
                {exam.protocolNumber}
              </span>
              <StatusBadge
                variant={
                  exam.priority === 'transplante_imediato'
                    ? 'danger'
                    : exam.priority === 'urgente'
                      ? 'warning'
                      : 'neutral'
                }
                size="sm"
              >
                {exam.priority === 'transplante_imediato'
                  ? 'Tx Imediato'
                  : exam.priority === 'urgente'
                    ? 'Urgente'
                    : 'Rotina'}
              </StatusBadge>
            </div>
            <p className="text-xs text-[#596E79] font-mono mt-0.5">{exam.sampleId}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-md text-[#8A9BA8] hover:text-[#172B36] hover:bg-[#EEF3F6] transition-colors"
          aria-label="Fechar painel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
        {/* Retest Warning if applicable */}
        {exam.needsRetest && (
          <div className="p-3.5 rounded-lg bg-[#FFE4E6] border border-[#FECDD3] text-[#9F1239] space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs">
              <AlertTriangle className="w-4 h-4 text-[#E11D48] shrink-0" />
              <span>Reteste Operacional Sinalizado</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#881337] pl-6">{exam.retestReason}</p>
          </div>
        )}

        {/* Operational Flow Status */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-[#8A9BA8] uppercase tracking-wider">
            Status do Processamento
          </span>
          <div className="p-3.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#172B36]">{exam.stepName}</span>
              <span className="font-mono text-[11px] text-[#087F8C] font-semibold">
                {exam.stepProgress}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#E5EBEF] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#087F8C] rounded-full"
                style={{ width: `${exam.stepProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#8A9BA8]">
              <span>Última atualização: {exam.lastUpdate}</span>
              <span>Chegada: {exam.arrivalDate}</span>
            </div>
          </div>
        </div>

        {/* Technical Attributes */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-[#8A9BA8] uppercase tracking-wider">
            Especificações Técnicas
          </span>
          <div className="rounded-lg border border-[#E5EBEF] divide-y divide-[#EEF3F6]">
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#596E79]">Indicação Clínica</span>
              <span className="font-medium text-[#172B36]">{exam.indication}</span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#596E79]">Metodologia</span>
              <span className="font-medium text-[#172B36]">{exam.methodology}</span>
            </div>
            <div className="p-3 flex items-start justify-between gap-4">
              <span className="text-[#596E79] shrink-0">Loci Investigados</span>
              <span className="font-mono font-medium text-[#172B36] text-right">
                {exam.targetLoci}
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#596E79]">Operador Responsável</span>
              <span className="font-medium text-[#172B36]">{exam.operatorName}</span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-[#596E79]">Identificador Sintético</span>
              <span className="font-mono text-[#8A9BA8]">{exam.pseudonym}</span>
            </div>
          </div>
        </div>

        {/* Audit & Compliance Disclaimer */}
        <div className="p-3 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] text-[#475569] space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-[#1E293B]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>Rastreabilidade & Conformidade</span>
          </div>
          <p className="leading-relaxed text-[#64748B]">
            Registros de temperatura, lotes de reagentes e corrida de PCR são vinculados diretamente
            a este ID de protocolo para auditoria ISO 15189 / CAP.
          </p>
        </div>
      </div>

      {/* Drawer Footer */}
      <div className="p-4 border-t border-[#E5EBEF] bg-[#F8FAFB] flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="px-3.5 py-1.5 text-xs font-medium text-[#596E79] hover:text-[#172B36] hover:bg-[#EEF3F6] rounded-md transition-colors"
        >
          Fechar
        </button>
        <button
          type="button"
          onClick={() => {
            alert('Abertura de ficha de bancada em desenvolvimento para as próximas etapas.')
          }}
          className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#087F8C] hover:bg-[#066974] rounded-md transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>Abrir Rastreabilidade</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default ExamDetailDrawer
