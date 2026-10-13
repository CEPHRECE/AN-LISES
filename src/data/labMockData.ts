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

export type OperationalJourneyStep =
  | 'recebimento'
  | 'processamento'
  | 'analise'
  | 'revisao'
  | 'encerramento'

export type OperationalSituation =
  | 'em_dia'
  | 'aguardando_analise'
  | 'aguardando_revisao'
  | 'reteste_solicitado'
  | 'concluido'

export interface LabExamSample {
  id: string
  protocolNumber: string // ex: HLA-2025-0842
  sampleId: string // ex: CEPH-9021-A
  pseudonym: string // ex: Amostra Sintética D-412 (sem dados reais)
  examType: string // Nome genérico para tipo de exame (ex: 'Tipagem Genética Metodologia A')
  methodology: 'NGS Alta Resolução' | 'Sanger' | 'SSO Luminex' | 'SSP Baixa' | string
  targetLoci: string // ex: 'HLA-A, B, C, DRB1, DQB1'
  indication: 'Transplante Renal' | 'Transplante Hepático' | 'Medula Óssea' | 'Crossmatch Pré'
  currentStep: ExamStatus
  journeyStep: OperationalJourneyStep
  stepName: string
  stepProgress: number // 0-100
  priority: PriorityLevel
  operatorName: string
  arrivalDate: string
  lastUpdate: string
  situation: OperationalSituation
  needsRetest: boolean
  retestReason?: string
  alertsCount?: number
  periodDaysAgo?: number // Para relacionar com filtros de período (ex: 7, 15, 30, 90)
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
    examType: 'Tipagem Imunogenética Metodologia I',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DQB1',
    indication: 'Transplante Renal',
    currentStep: 'sequenciamento',
    journeyStep: 'processamento',
    stepName: 'Sequenciamento (MiSeq)',
    stepProgress: 68,
    priority: 'transplante_imediato',
    operatorName: 'Dra. E. Vasconcelos',
    arrivalDate: '24/10/2025 08:30',
    lastUpdate: 'Há 18 min',
    situation: 'em_dia',
    needsRetest: false,
    periodDaysAgo: 1,
  },
  {
    id: 'ex-02',
    protocolNumber: 'HLA-2025-0841',
    sampleId: 'CEPH-9018-B',
    pseudonym: 'Amostra RX-9180',
    examType: 'Painel Molecular Metodologia II',
    methodology: 'SSO Luminex',
    targetLoci: 'HLA-A, B, DRB1',
    indication: 'Transplante Hepático',
    currentStep: 'analise_bioinfo',
    journeyStep: 'analise',
    stepName: 'Análise de Tipagem e Chamada',
    stepProgress: 85,
    priority: 'urgente',
    operatorName: 'Dr. C. Medeiros',
    arrivalDate: '24/10/2025 07:15',
    lastUpdate: 'Há 32 min',
    situation: 'aguardando_analise',
    needsRetest: false,
    periodDaysAgo: 1,
  },
  {
    id: 'ex-03',
    protocolNumber: 'HLA-2025-0839',
    sampleId: 'CEPH-8994-C',
    pseudonym: 'Amostra RX-9175',
    examType: 'Tipagem Imunogenética Metodologia I',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DPB1',
    indication: 'Medula Óssea',
    currentStep: 'reteste',
    journeyStep: 'processamento',
    stepName: 'Investigação de Ambiguidade de Alelo',
    stepProgress: 35,
    priority: 'urgente',
    operatorName: 'Dra. F. Alencar',
    arrivalDate: '23/10/2025 14:10',
    lastUpdate: 'Há 1 hora',
    situation: 'reteste_solicitado',
    needsRetest: true,
    retestReason: 'Baixa cobertura no éxon 2 de HLA-DRB1 (ambiguidade *04:01 vs *04:07)',
    alertsCount: 1,
    periodDaysAgo: 2,
  },
  {
    id: 'ex-04',
    protocolNumber: 'HLA-2025-0838',
    sampleId: 'CEPH-8980-A',
    pseudonym: 'Amostra RX-9171',
    examType: 'Ensaio Rápido Metodologia III',
    methodology: 'SSP Baixa',
    targetLoci: 'Painel Crossmatch Complementar',
    indication: 'Crossmatch Pré',
    currentStep: 'amplificacao_pcr',
    journeyStep: 'processamento',
    stepName: 'Amplificação em Termociclador',
    stepProgress: 52,
    priority: 'rotina',
    operatorName: 'Esp. T. Moreira',
    arrivalDate: '24/10/2025 09:40',
    lastUpdate: 'Há 45 min',
    situation: 'em_dia',
    needsRetest: false,
    periodDaysAgo: 1,
  },
  {
    id: 'ex-05',
    protocolNumber: 'HLA-2025-0837',
    sampleId: 'CEPH-8962-D',
    pseudonym: 'Amostra RX-9168',
    examType: 'Tipagem Imunogenética Metodologia I',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DQA1, DQB1',
    indication: 'Transplante Renal',
    currentStep: 'revisao_tecnica',
    journeyStep: 'revisao',
    stepName: 'Conferência Técnica de Alinhamento',
    stepProgress: 94,
    priority: 'rotina',
    operatorName: 'Dr. R. Holanda',
    arrivalDate: '23/10/2025 11:20',
    lastUpdate: 'Há 2 horas',
    situation: 'aguardando_revisao',
    needsRetest: false,
    periodDaysAgo: 2,
  },
  {
    id: 'ex-06',
    protocolNumber: 'HLA-2025-0835',
    sampleId: 'CEPH-8949-B',
    pseudonym: 'Amostra RX-9162',
    examType: 'Ensaio Rápido Metodologia III',
    methodology: 'Sanger',
    targetLoci: 'Confirmação HLA-B*27',
    indication: 'Transplante Renal',
    currentStep: 'extracao_dna',
    journeyStep: 'processamento',
    stepName: 'Extração e Quantificação Fluorimétrica',
    stepProgress: 24,
    priority: 'rotina',
    operatorName: 'Esp. G. Sales',
    arrivalDate: '24/10/2025 10:05',
    lastUpdate: 'Há 15 min',
    situation: 'em_dia',
    needsRetest: false,
    periodDaysAgo: 1,
  },
  {
    id: 'ex-07',
    protocolNumber: 'HLA-2025-0833',
    sampleId: 'CEPH-8930-A',
    pseudonym: 'Amostra RX-9155',
    examType: 'Painel Molecular Metodologia II',
    methodology: 'SSO Luminex',
    targetLoci: 'HLA-A, B, C, DRB1',
    indication: 'Transplante Renal',
    currentStep: 'analise_bioinfo',
    journeyStep: 'analise',
    stepName: 'Verificação de Curva de Sinal',
    stepProgress: 72,
    priority: 'urgente',
    operatorName: 'Dr. C. Medeiros',
    arrivalDate: '22/10/2025 16:00',
    lastUpdate: 'Há 3 horas',
    situation: 'aguardando_analise',
    needsRetest: false,
    periodDaysAgo: 3,
  },
  {
    id: 'ex-08',
    protocolNumber: 'HLA-2025-0830',
    sampleId: 'CEPH-8912-F',
    pseudonym: 'Amostra RX-9140',
    examType: 'Tipagem Imunogenética Metodologia I',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1, DQA1, DQB1, DPB1',
    indication: 'Medula Óssea',
    currentStep: 'revisao_tecnica',
    journeyStep: 'revisao',
    stepName: 'Validação por Especialista Sênior',
    stepProgress: 96,
    priority: 'transplante_imediato',
    operatorName: 'Dra. E. Vasconcelos',
    arrivalDate: '22/10/2025 09:15',
    lastUpdate: 'Há 4 horas',
    situation: 'aguardando_revisao',
    needsRetest: false,
    periodDaysAgo: 3,
  },
  {
    id: 'ex-09',
    protocolNumber: 'HLA-2025-0828',
    sampleId: 'CEPH-8901-C',
    pseudonym: 'Amostra RX-9132',
    examType: 'Tipagem Imunogenética Metodologia I',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-DRB1, DQB1',
    indication: 'Transplante Renal',
    currentStep: 'reteste',
    journeyStep: 'processamento',
    stepName: 'Reamplificação por PCR Alternativo',
    stepProgress: 40,
    priority: 'rotina',
    operatorName: 'Dra. F. Alencar',
    arrivalDate: '21/10/2025 15:40',
    lastUpdate: 'Há 6 horas',
    situation: 'reteste_solicitado',
    needsRetest: true,
    retestReason: 'Sinal de fluoróforo limítrofe em loco DRB1',
    alertsCount: 1,
    periodDaysAgo: 4,
  },
  {
    id: 'ex-10',
    protocolNumber: 'HLA-2025-0825',
    sampleId: 'CEPH-8888-A',
    pseudonym: 'Amostra RX-9120',
    examType: 'Painel Molecular Metodologia II',
    methodology: 'SSO Luminex',
    targetLoci: 'HLA-A, B',
    indication: 'Transplante Hepático',
    currentStep: 'recepcao',
    journeyStep: 'recebimento',
    stepName: 'Triagem de Amostras e Conferência',
    stepProgress: 15,
    priority: 'rotina',
    operatorName: 'Esp. T. Moreira',
    arrivalDate: '24/10/2025 11:30',
    lastUpdate: 'Há 10 min',
    situation: 'em_dia',
    needsRetest: false,
    periodDaysAgo: 1,
  },
  {
    id: 'ex-11',
    protocolNumber: 'HLA-2025-0820',
    sampleId: 'CEPH-8870-E',
    pseudonym: 'Amostra RX-9105',
    examType: 'Ensaio Rápido Metodologia III',
    methodology: 'SSP Baixa',
    targetLoci: 'HLA-B*57:01 Triagem',
    indication: 'Crossmatch Pré',
    currentStep: 'concluido',
    journeyStep: 'encerramento',
    stepName: 'Laudo Operacional Emitido',
    stepProgress: 100,
    priority: 'rotina',
    operatorName: 'Dr. R. Holanda',
    arrivalDate: '20/10/2025 14:00',
    lastUpdate: 'Ontem 18:00',
    situation: 'concluido',
    needsRetest: false,
    periodDaysAgo: 5,
  },
  {
    id: 'ex-12',
    protocolNumber: 'HLA-2025-0815',
    sampleId: 'CEPH-8855-B',
    pseudonym: 'Amostra RX-9092',
    examType: 'Tipagem Imunogenética Metodologia I',
    methodology: 'NGS Alta Resolução',
    targetLoci: 'HLA-A, B, C, DRB1',
    indication: 'Medula Óssea',
    currentStep: 'concluido',
    journeyStep: 'encerramento',
    stepName: 'Acompanhamento Encerrado',
    stepProgress: 100,
    priority: 'urgente',
    operatorName: 'Dra. E. Vasconcelos',
    arrivalDate: '19/10/2025 10:20',
    lastUpdate: '22/10/2025',
    situation: 'concluido',
    needsRetest: false,
    periodDaysAgo: 6,
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

/**
 * 5 Etapas Oficiais da Jornada do Exame
 * Recebimento → Processamento → Análise → Revisão → Encerramento do acompanhamento
 */
export interface OperationalJourneyStepDef {
  id: OperationalJourneyStep
  order: number
  name: string
  shortLabel: string
  description: string
}

export const OPERATIONAL_JOURNEY_STEPS: OperationalJourneyStepDef[] = [
  {
    id: 'recebimento',
    order: 1,
    name: 'Recebimento',
    shortLabel: '01. Entrada',
    description: 'Recepção de tubos, integridade de amostra e checagem de cadastro',
  },
  {
    id: 'processamento',
    order: 2,
    name: 'Processamento',
    shortLabel: '02. Bancada',
    description: 'Extração de material genético, PCR multiplex e corridas analíticas',
  },
  {
    id: 'analise',
    order: 3,
    name: 'Análise',
    shortLabel: '03. Análise',
    description: 'Verificação bioinformática, chamada de alelos e investigação',
  },
  {
    id: 'revisao',
    order: 4,
    name: 'Revisão',
    shortLabel: '04. Revisão',
    description: 'Conferência cruzada operacional por especialista responsável',
  },
  {
    id: 'encerramento',
    order: 5,
    name: 'Encerramento do acompanhamento',
    shortLabel: '05. Conclusão',
    description: 'Finalização do ciclo de acompanhamento na rotina laboratorial',
  },
]

/**
 * Definição dos Períodos de Filtro Operacional
 */
export type PeriodFilterOption = '7d' | '15d' | '30d' | '90d'

export interface OperationalPeriodData {
  periodId: PeriodFilterOption
  periodLabel: string
  timeSeries: {
    dateLabel: string
    shortDate: string
    examesAcompanhados: number
    retestesRegistrados: number
  }[]
  summary: {
    totalEmAcompanhamento: number
    aguardandoAnalise: number
    aguardandoRevisao: number
    retestesPeriodo: number
    distribuicaoJornada: Record<OperationalJourneyStep, number>
    pendenciasPorEtapa: {
      etapaId: OperationalJourneyStep
      etapaNome: string
      totalPendencias: number
      destaque: string
    }[]
  }
}

export const MOCK_PERIOD_DATA: Record<PeriodFilterOption, OperationalPeriodData> = {
  '7d': {
    periodId: '7d',
    periodLabel: 'Últimos 7 dias',
    timeSeries: [
      { dateLabel: '18/10', shortDate: 'Sex', examesAcompanhados: 14, retestesRegistrados: 1 },
      { dateLabel: '19/10', shortDate: 'Sáb', examesAcompanhados: 8, retestesRegistrados: 0 },
      { dateLabel: '20/10', shortDate: 'Dom', examesAcompanhados: 5, retestesRegistrados: 0 },
      { dateLabel: '21/10', shortDate: 'Seg', examesAcompanhados: 22, retestesRegistrados: 2 },
      { dateLabel: '22/10', shortDate: 'Ter', examesAcompanhados: 26, retestesRegistrados: 1 },
      { dateLabel: '23/10', shortDate: 'Qua', examesAcompanhados: 28, retestesRegistrados: 2 },
      { dateLabel: '24/10', shortDate: 'Hoje', examesAcompanhados: 31, retestesRegistrados: 1 },
    ],
    summary: {
      totalEmAcompanhamento: 38,
      aguardandoAnalise: 9,
      aguardandoRevisao: 6,
      retestesPeriodo: 4,
      distribuicaoJornada: {
        recebimento: 5,
        processamento: 14,
        analise: 9,
        revisao: 6,
        encerramento: 4,
      },
      pendenciasPorEtapa: [
        {
          etapaId: 'processamento',
          etapaNome: 'Processamento',
          totalPendencias: 8,
          destaque: 'Maior volume em bancada de sequenciamento',
        },
        {
          etapaId: 'analise',
          etapaNome: 'Análise',
          totalPendencias: 5,
          destaque: 'Chamadas e curvas com leitura bioinformática em curso',
        },
        {
          etapaId: 'revisao',
          etapaNome: 'Revisão',
          totalPendencias: 4,
          destaque: 'Aguardando validação e conferência final por especialista',
        },
        {
          etapaId: 'recebimento',
          etapaNome: 'Recebimento',
          totalPendencias: 2,
          destaque: 'Triagem de entrada e conferência de tubos',
        },
      ],
    },
  },
  '15d': {
    periodId: '15d',
    periodLabel: 'Últimos 15 dias',
    timeSeries: [
      { dateLabel: '10/10', shortDate: '10/10', examesAcompanhados: 20, retestesRegistrados: 1 },
      { dateLabel: '12/10', shortDate: '12/10', examesAcompanhados: 12, retestesRegistrados: 0 },
      { dateLabel: '14/10', shortDate: '14/10', examesAcompanhados: 25, retestesRegistrados: 2 },
      { dateLabel: '16/10', shortDate: '16/10', examesAcompanhados: 28, retestesRegistrados: 1 },
      { dateLabel: '18/10', shortDate: '18/10', examesAcompanhados: 24, retestesRegistrados: 1 },
      { dateLabel: '20/10', shortDate: '20/10', examesAcompanhados: 16, retestesRegistrados: 1 },
      { dateLabel: '22/10', shortDate: '22/10', examesAcompanhados: 30, retestesRegistrados: 2 },
      { dateLabel: '24/10', shortDate: '24/10', examesAcompanhados: 31, retestesRegistrados: 1 },
    ],
    summary: {
      totalEmAcompanhamento: 52,
      aguardandoAnalise: 13,
      aguardandoRevisao: 8,
      retestesPeriodo: 7,
      distribuicaoJornada: {
        recebimento: 7,
        processamento: 19,
        analise: 13,
        revisao: 8,
        encerramento: 5,
      },
      pendenciasPorEtapa: [
        {
          etapaId: 'processamento',
          etapaNome: 'Processamento',
          totalPendencias: 11,
          destaque: 'Bancadas de extração e corrida analítica com demanda contínua',
        },
        {
          etapaId: 'analise',
          etapaNome: 'Análise',
          totalPendencias: 7,
          destaque: 'Investigações de alelos e checagem de parâmetros de qualidade',
        },
        {
          etapaId: 'revisao',
          etapaNome: 'Revisão',
          totalPendencias: 5,
          destaque: 'Casos prioritários aguardando assinatura do responsável',
        },
        {
          etapaId: 'recebimento',
          etapaNome: 'Recebimento',
          totalPendencias: 3,
          destaque: 'Novos lotes recebidos em triagem inicial',
        },
      ],
    },
  },
  '30d': {
    periodId: '30d',
    periodLabel: 'Últimos 30 dias',
    timeSeries: [
      {
        dateLabel: '25/09 - 01/10',
        shortDate: 'Sem 1',
        examesAcompanhados: 48,
        retestesRegistrados: 3,
      },
      {
        dateLabel: '02/10 - 08/10',
        shortDate: 'Sem 2',
        examesAcompanhados: 54,
        retestesRegistrados: 4,
      },
      {
        dateLabel: '09/10 - 15/10',
        shortDate: 'Sem 3',
        examesAcompanhados: 51,
        retestesRegistrados: 2,
      },
      {
        dateLabel: '16/10 - 24/10',
        shortDate: 'Sem 4',
        examesAcompanhados: 62,
        retestesRegistrados: 5,
      },
    ],
    summary: {
      totalEmAcompanhamento: 68,
      aguardandoAnalise: 16,
      aguardandoRevisao: 11,
      retestesPeriodo: 12,
      distribuicaoJornada: {
        recebimento: 9,
        processamento: 24,
        analise: 16,
        revisao: 11,
        encerramento: 8,
      },
      pendenciasPorEtapa: [
        {
          etapaId: 'processamento',
          etapaNome: 'Processamento',
          totalPendencias: 14,
          destaque: 'Concentração principal em etapas de amplificação e corrida',
        },
        {
          etapaId: 'analise',
          etapaNome: 'Análise',
          totalPendencias: 9,
          destaque: 'Interpretação e conferência de variantes',
        },
        {
          etapaId: 'revisao',
          etapaNome: 'Revisão',
          totalPendencias: 7,
          destaque: 'Fila de conferência técnica para encerramento',
        },
        {
          etapaId: 'recebimento',
          etapaNome: 'Recebimento',
          totalPendencias: 4,
          destaque: 'Amostras recém-admitidas no período',
        },
      ],
    },
  },
  '90d': {
    periodId: '90d',
    periodLabel: 'Últimos 90 dias',
    timeSeries: [
      { dateLabel: 'Agosto', shortDate: 'Ago', examesAcompanhados: 184, retestesRegistrados: 14 },
      { dateLabel: 'Setembro', shortDate: 'Set', examesAcompanhados: 210, retestesRegistrados: 18 },
      {
        dateLabel: 'Outubro (parcial)',
        shortDate: 'Out',
        examesAcompanhados: 172,
        retestesRegistrados: 11,
      },
    ],
    summary: {
      totalEmAcompanhamento: 84,
      aguardandoAnalise: 21,
      aguardandoRevisao: 14,
      retestesPeriodo: 28,
      distribuicaoJornada: {
        recebimento: 11,
        processamento: 30,
        analise: 21,
        revisao: 14,
        encerramento: 8,
      },
      pendenciasPorEtapa: [
        {
          etapaId: 'processamento',
          etapaNome: 'Processamento',
          totalPendencias: 18,
          destaque: 'Etapas pré-analíticas e analíticas com maior volume consolidado',
        },
        {
          etapaId: 'analise',
          etapaNome: 'Análise',
          totalPendencias: 12,
          destaque: 'Resolução de chamadas e alinhamento de sequências',
        },
        {
          etapaId: 'revisao',
          etapaNome: 'Revisão',
          totalPendencias: 9,
          destaque: 'Validações de rotina e relatórios de acompanhamento',
        },
        {
          etapaId: 'recebimento',
          etapaNome: 'Recebimento',
          totalPendencias: 5,
          destaque: 'Triagens ativas no período consolidado',
        },
      ],
    },
  },
}
