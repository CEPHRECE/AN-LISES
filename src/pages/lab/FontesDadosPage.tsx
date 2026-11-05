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
import { RefreshCw, FileQuestion, Info } from 'lucide-react'

export const FontesDadosPage: React.FC = () => {
  const sources = [
    {
      name: 'Equipamento analítico do laboratório',
      type: 'Equipamento Analítico',
      status: 'Não configurada',
      detail: 'Categoria de integração aguardando definição de metodologias e documentação',
      syncTime: 'Aguardando configuração',
    },
    {
      name: 'Analisador de ensaios laboratoriais',
      type: 'Analisador de Bancada',
      status: 'Não configurada',
      detail: 'Categoria de integração aguardando documentação do fornecimento',
      syncTime: 'Aguardando configuração',
    },
    {
      name: 'Base de referência externa',
      type: 'Referência Externa',
      status: 'Aguardando documentação',
      detail: 'Categoria de base de referência aguardando documentação de acesso e versão',
      syncTime: 'Aguardando configuração',
    },
    {
      name: 'Sistema laboratorial institucional',
      type: 'Sistema Legado',
      status: 'Aguardando documentação',
      detail: 'Categoria de intercâmbio institucional aguardando documentação de integração',
      syncTime: 'Aguardando configuração',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Fontes de Dados & Integrações"
        description="Categorias de integração previstas para o protótipo. Nenhuma fonte está configurada — os nomes de equipamentos e bases são genéricos até documentação oficial."
        badge={
          <StatusBadge variant="neutral" size="sm">
            0 Fontes Configuradas
          </StatusBadge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src) => (
          <LabCard key={src.name} className="flex flex-col justify-between opacity-80">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#8A9BA8] uppercase">{src.type}</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8A9BA8]">
                  <FileQuestion className="w-3 h-3" />
                  <span>{src.status}</span>
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#172B36]">{src.name}</h3>
              <p className="text-xs text-[#596E79] mt-1">{src.detail}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EEF3F6] flex items-center justify-between text-xs text-[#8A9BA8] font-mono">
              <span>{src.syncTime}</span>
              <button
                type="button"
                disabled
                className="text-[#8A9BA8] flex items-center gap-1 font-sans text-xs font-medium cursor-not-allowed"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Testar Link</span>
              </button>
            </div>
          </LabCard>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#E5EBEF] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#8A9BA8] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#596E79] leading-relaxed">
          Nota: nenhum equipamento, base externa ou sistema está conectado neste protótipo. Todas as
          fontes listadas são categorias genéricas aguardando definição das metodologias e
          documentação de integração — os ícones e nomes não identificam equipamentos reais.
        </p>
      </div>
    </div>
  )
}

export default FontesDadosPage
