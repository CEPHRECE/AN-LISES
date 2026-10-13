/**
 * CPDHRCE — Central Laboratorial
 * Mock Data para Demonstração Técnica e Operacional
 *
 * NOTA DE SEGURANÇA E CONFORMIDADE:
 * Não contém dados reais de pacientes. Nomes, protocolos e identificadores
 * são inteiramente sintéticos e gerados para teste de componentes e layout.
 */

export type ExamStatus =
  | 'recepcao'
  | 'extracao_dna'
  | 'amplificacao_pcr'
  | 'sequenciamento'
  | 'analise_bioinfo'
  | 'reteste'
  | 'revisao_tecnica'
  | 'concluido'

export type PriorityLevel = 'rotina' | 'urgente' | 'transplante_imediato'

export interface LabExamSample {
  id: string
  protocolNumber: string // ex: HLA-2025-0842
  sampleId: string // ex: CEPH-9021-A
  pseudonym: string // ex: Amostra Sintética D-412 (sem dados reais)
  methodology: 'NGS Alta Resolução' | 'Sanger' | 'SSO Luminex' | 'SSP Baixa'
  targetLoci: string // ex: 'HLA-A, B, C, DRB1, DQB1'
  indication: 'Transplante Renal' | 'Transplante Hepático' | 'Medula Óssea' | 'Crossmatch Pré'
  currentStep: ExamStatus
  stepName: string
  stepProgress: number // 0-100
  priority: PriorityLevel
  operatorName: string
  arrivalDate: string
  lastUpdate: string
  needsRetest: boolean
  retestReason?: string
  alertsCount?: number
}

export interface OperationalMetric {
  id: string
  label: string
  value: string | number
  unit?: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  badgeVariant?: 'default' | 'success' | 'warning' | 'danger'
  subtext: string
}

export const MOCK_METRICS: OperationalMetric[] = [
  {
    id: 'em-processamento',
    label: 'Exames em Fluxo Ativo',
    value: 48,
    unit: 'amostras',
    change: '+6 hoje',
    trend: 'up',
    badgeVariant: 'default',
    subtext: '4 bancadas em operação simultânea',
  },
  {
    id: 'tempo-medio',
    label: 'Tempo Médio Ciclo (TAT)',
    value: '42.4',
    unit: 'horas',
    change: '-3.2h vs. meta',
    trend: 'down',
    badgeVariant: 'success',
    subtext: 'Meta operacional: ≤ 48h',
  },
  {
    id: 'retestes-pendentes',
    label: 'Retestes em Investigação',
    value: 5,
    unit: 'casos',
    change: '2 novos',
    trend: 'neutral',
    badgeVariant: 'warning',
    subtext: 'Controle de qualidade e confirmação de alelo',
  },
  {
    id: 'taxa-conformidade',
    label: 'Índice de Qualidade Analítica',
    value: '99.1%',
    unit: '',
    change: '+0.3%',
    trend: 'up',
    badgeVariant: 'success',
    subtext: 'Controles internos e calibração validados',
  },
]

export const MOCK_EXAM_SAMPLES: LabExamSample[] = [
  {
    id: 'ex-01',
    protocolNumber: 'HLA-2025-0842',
    sampleId: 'CEPH-9021-A',
    pseudonym: 'Amostra RX-9182',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DQB1',
    indication: 'Transplante Renal',
    currentStep: 'sequenciamento',
    stepName: 'Sequenciamento (MiSeq)',
    stepProgress: 68,
    priority: 'transplante_imediato',
    operatorName: 'Dra. E. Vasconcelos',
    arrivalDate: '24/10/2025 08:30',
    lastUpdate: 'Há 18 min',
    needsRetest: false,
  },
  {
    id: 'ex-02',
    protocolNumber: 'HLA-2025-0841',
    sampleId: 'CEPH-9018-B',
    pseudonym: 'Amostra RX-9180',
    methodology: 'SSO Luminex',
    targetLoci: 'HLA-A, B, DRB1',
    indication: 'Transplante Hepático',
    currentStep: 'analise_bioinfo',
    stepName: 'Análise de Tipagem e Chamada',
    stepProgress: 85,
    priority: 'urgente',
    operatorName: 'Dr. C. Medeiros',
    arrivalDate: '24/10/2025 07:15',
    lastUpdate: 'Há 32 min',
    needsRetest: false,
  },
  {
    id: 'ex-03',
    protocolNumber: 'HLA-2025-0839',
    sampleId: 'CEPH-8994-C',
    pseudonym: 'Amostra RX-9175',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DPB1',
    indication: 'Medula Óssea',
    currentStep: 'reteste',
    stepName: 'Investigação de Ambiguidade de Alelo',
    stepProgress: 35,
    priority: 'urgente',
    operatorName: 'Dra. F. Alencar',
    arrivalDate: '23/10/2025 14:10',
    lastUpdate: 'Há 1 hora',
    needsRetest: true,
    retestReason: 'Baixa cobertura no éxon 2 de HLA-DRB1 (ambiguidade *04:01 vs *04:07)',
    alertsCount: 1,
  },
  {
    id: 'ex-04',
    protocolNumber: 'HLA-2025-0838',
    sampleId: 'CEPH-8980-A',
    pseudonym: 'Amostra RX-9171',
    methodology: 'SSP Baixa',
    targetLoci: 'Painel Crossmatch Complementar',
    indication: 'Crossmatch Pré',
    currentStep: 'amplificacao_pcr',
    stepName: 'Amplificação em Termociclador',
    stepProgress: 52,
    priority: 'rotina',
    operatorName: 'Esp. T. Moreira',
    arrivalDate: '24/10/2025 09:40',
    lastUpdate: 'Há 45 min',
    needsRetest: false,
  },
  {
    id: 'ex-05',
    protocolNumber: 'HLA-2025-0837',
    sampleId: 'CEPH-8962-D',
    pseudonym: 'Amostra RX-9168',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DQA1, DQB1',
    indication: 'Transplante Renal',
    currentStep: 'revisao_tecnica',
    stepName: 'Conferência Técnica de Alinhamento',
    stepProgress: 94,
    priority: 'rotina',
    operatorName: 'Dr. R. Holanda',
    arrivalDate: '23/10/2025 11:20',
    lastUpdate: 'Há 2 horas',
    needsRetest: false,
  },
  {
    id: 'ex-06',
    protocolNumber: 'HLA-2025-0835',
    sampleId: 'CEPH-8949-B',
    pseudonym: 'Amostra RX-9162',
    methodology: 'Sanger',
    targetLoci: 'Confirmação HLA-B*27',
    indication: 'Transplante Renal',
    currentStep: 'extracao_dna',
    stepName: 'Extração e Quantificação Fluorimétrica',
    stepProgress: 24,
    priority: 'rotina',
    operatorName: 'Esp. G. Sales',
    arrivalDate: '24/10/2025 10:05',
    lastUpdate: 'Há 15 min',
    needsRetest: false,
  },
]

export interface FlowStepInfo {
  step: ExamStatus
  label: string
  activeCount: number
  description: string
  averageTime: string
}

export const LAB_FLOW_STEPS: FlowStepInfo[] = [
  {
    step: 'recepcao',
    label: 'Recepção e Triagem',
    activeCount: 6,
    description: 'Checagem de integridade, código de barras e viabilidade de tubo',
    averageTime: '35 min',
  },
  {
    step: 'extracao_dna',
    label: 'Extração de DNA',
    activeCount: 11,
    description: 'Isolamento de DNA genômico com quantificação por Qubit/Nanodrop',
    averageTime: '2.5 h',
  },
  {
    step: 'amplificacao_pcr',
    label: 'Amplificação (PCR)',
    activeCount: 9,
    description: 'Enriquecimento dos locos alvos HLA por primers multiplex específicos',
    averageTime: '3.8 h',
  },
  {
    step: 'sequenciamento',
    label: 'Sequenciamento (NGS/SSO)',
    activeCount: 14,
    description: 'Corrida de sequenciamento de alto rendimento e leitura de esferas',
    averageTime: '16.5 h',
  },
  {
    step: 'analise_bioinfo',
    label: 'Análise Bioinformática',
    activeCount: 8,
    description: 'Alinhamento com base IMGT/HLA, verificação de profundidade e chamada',
    averageTime: '1.8 h',
  },
  {
    step: 'revisao_tecnica',
    label: 'Revisão Técnica',
    activeCount: 5,
    description: 'Conferência cruzada operacional por especialista em imunogenética',
    averageTime: '1.2 h',
  },
]
