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
import { Settings, Shield, Bell, Sliders, Palette, Lock } from 'lucide-react'

export const ConfiguracoesPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Configurações da Central Laboratorial"
        description="Parâmetros do sistema, regras de alerta de reteste, critérios de corte de qualidade (Q-score > 30) e preferências do ambiente."
        badge={
          <StatusBadge variant="neutral" size="sm">
            Ambiente Institucional
          </StatusBadge>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LabCard>
          <LabCardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#E6F4F6] text-[#087F8C]">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <LabCardTitle>Critérios Analíticos de Reteste</LabCardTitle>
                <LabCardDescription>
                  Thresholds automatizados para solicitação de repetição
                </LabCardDescription>
              </div>
            </div>
          </LabCardHeader>
          <LabCardContent>
            <div className="space-y-3 pt-2 text-xs text-[#596E79]">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF]">
                <div>
                  <p className="font-medium text-[#172B36]">Profundidade Mínima de Leitura (NGS)</p>
                  <p className="text-[11px] text-[#8A9BA8]">
                    Cobertura mínima por éxon crítico (2 e 3)
                  </p>
                </div>
                <span className="font-mono font-semibold text-[#172B36]">≥ 50x</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF]">
                <div>
                  <p className="font-medium text-[#172B36]">
                    Pureza de DNA Extraído (Razão 260/280)
                  </p>
                  <p className="text-[11px] text-[#8A9BA8]">Faixa ideal para amplificação PCR</p>
                </div>
                <span className="font-mono font-semibold text-[#172B36]">1.7 – 1.9</span>
              </div>
            </div>
          </LabCardContent>
        </LabCard>

        <LabCard>
          <LabCardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#F1F5F9] text-[#102A38]">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <LabCardTitle>Identidade & Design System</LabCardTitle>
                <LabCardDescription>
                  Padrões visuais ativos na Central Laboratorial
                </LabCardDescription>
              </div>
            </div>
          </LabCardHeader>
          <LabCardContent>
            <div className="space-y-2 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] flex items-center justify-between">
                <span className="text-[#596E79]">Tema Geral</span>
                <span className="font-medium text-[#172B36]">B2B Lab Light (#F8FAFB)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] flex items-center justify-between">
                <span className="text-[#596E79]">Barra Lateral</span>
                <span className="font-medium text-[#172B36]">Azul Petróleo (#102A38)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#F8FAFB] border border-[#E5EBEF] flex items-center justify-between">
                <span className="text-[#596E79]">Destaque Primário</span>
                <span className="font-medium text-[#087F8C]">Teal Cirúrgico (#087F8C)</span>
              </div>
            </div>
          </LabCardContent>
        </LabCard>
      </div>
    </div>
  )
}

export default ConfiguracoesPage
