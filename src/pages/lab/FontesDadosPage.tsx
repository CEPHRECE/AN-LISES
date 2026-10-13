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
import { Database, Server, RefreshCw, CheckCircle2, Cpu, HardDrive } from 'lucide-react'

export const FontesDadosPage: React.FC = () => {
  const sources = [
    {
      name: 'Sequenciador MiSeq #01 (Illumina)',
      type: 'Equipamento Analítico',
      status: 'Conectado',
      detail: 'Upload automático de FASTQ via rede local segura',
      syncTime: 'Há 12 min',
    },
    {
      name: 'Luminex 200 (xMAP Technology)',
      type: 'Analisador de Esferas',
      status: 'Conectado',
      detail: 'Leitura direta de MFI de painéis de anticorpos anti-HLA',
      syncTime: 'Há 5 min',
    },
    {
      name: 'Base IMGT/HLA Database (IPD-IMGT)',
      type: 'Referência Genômica Externa',
      status: 'Atualizado (Release 3.58.0)',
      detail: 'Tabelas alélicas oficiais para conferência de polimorfismo',
      syncTime: 'Ontem às 22:00',
    },
    {
      name: 'LIS Central CEPH/RECE',
      type: 'Sistema Laboratorial Legado',
      status: 'Sincronizado',
      detail: 'Intercâmbio de cadastros e triagem inicial de tubos',
      syncTime: 'Tempo Real',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Fontes de Dados & Integrações Analíticas"
        description="Monitoramento da comunicação entre equipamentos de bancada, sequenciadores, base genômica IMGT/HLA e barramento de dados."
        badge={
          <StatusBadge variant="success" size="sm">
            4 Fontes Conectadas
          </StatusBadge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src) => (
          <LabCard key={src.name} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#8A9BA8] uppercase">{src.type}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#059669]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{src.status}</span>
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#172B36]">{src.name}</h3>
              <p className="text-xs text-[#596E79] mt-1">{src.detail}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EEF3F6] flex items-center justify-between text-xs text-[#8A9BA8] font-mono">
              <span>Sincronização: {src.syncTime}</span>
              <button
                type="button"
                className="text-[#087F8C] hover:text-[#066974] flex items-center gap-1 font-sans text-xs font-medium"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Testar Link</span>
              </button>
            </div>
          </LabCard>
        ))}
      </div>
    </div>
  )
}

export default FontesDadosPage
