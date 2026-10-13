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

export type StepExecutionState = 'concluido' | 'em_andamento' | 'pendente' | 'alerta'

export interface ExamJourneyStepDetail {
  stepId: OperationalJourneyStep
  stepName: string
  order: number
  state: StepExecutionState
  timestamp?: string
  responsibleName?: string
  responsibleRole?: string
  sourceReference: string // Referência de origem demonstrativa
  occurrences: string[]
  missingInformation: string[]
  technicalNotes?: string
  qcMetrics?: { label: string; value: string; status: 'ok' | 'alerta' | 'neutro' }[]
}

export type OccurrenceCauseClassification =
  | 'confirmada'
  | 'provavel'
  | 'nao_determinada'
  | 'informativa'

export interface ExamHistoryEvent {
  id: string
  timestamp: string
  type: 'movimentacao' | 'ocorrencia' | 'reteste' | 'alteracao' | 'revisao'
  title: string
  description: string
  responsibleName: string
  responsibleRole: string
  causeClassification?: OccurrenceCauseClassification
  causeDescription?: string
  hasAssociatedRetest?: boolean
  retestId?: string
  stepId?: OperationalJourneyStep
  badgeLabel?: string
}

export interface LabExamSample {
  id: string
  protocolNumber: string // ex: HLA-2025-0842
  sampleId: string // ex: CEPH-9021-A
  pseudonym: string // ex: Amostra Sintética D-412 (sem dados reais)
  examType: string // Nome genérico para tipo de exame (ex: 'Tipagem Imunogenética Metodologia I')
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
  journeyStepsDetails?: ExamJourneyStepDetail[]
  historyEvents?: ExamHistoryEvent[]
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '24/10/2025 08:30:14',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem e Admissão de Amostras',
        sourceReference: 'Lote de Entrada REC-2025-10-884 (Simulado)',
        occurrences: [],
        missingInformation: [],
        technicalNotes:
          'Tubo EDTA 4mL íntegro, refrigeração conforme (4°C), identificação por código de barras conferida.',
        qcMetrics: [
          { label: 'Volume recebido', value: '3.8 mL', status: 'ok' },
          { label: 'Temperatura chegada', value: '4.2 °C', status: 'ok' },
          { label: 'Integridade física', value: 'Amostra íntegra sem hemólise', status: 'ok' },
        ],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'em_andamento',
        timestamp: '24/10/2025 11:15:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista em Sequenciamento Genômico',
        sourceReference: 'Bancada B2-NGS / Corrida MSQ-882 (Simulada)',
        occurrences: ['Corrida de sequenciamento em ciclo 142/300. Ritmo térmico nominal.'],
        missingInformation: [],
        technicalNotes:
          'Extração automatizada concluída com pureza 260/280 de 1.88. Concentração 42.4 ng/µL.',
        qcMetrics: [
          { label: 'Concentração DNA', value: '42.4 ng/µL', status: 'ok' },
          { label: 'Pureza A260/A280', value: '1.88', status: 'ok' },
          { label: 'Q30 Corrida', value: '89.4%', status: 'ok' },
        ],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'pendente',
        sourceReference: 'Pipeline Bioinformática CPD-IMGT/HLA v3.54 (Simulada)',
        occurrences: [],
        missingInformation: ['Arquivo fastq bruto aguardando término da corrida (ETA: 4h10min)'],
        technicalNotes:
          'Configuração do pipeline já pré-associada aos locos de alta resolução HLA-A, B, C, DRB1 e DQB1.',
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Módulo de Parecer Técnico (Simulado)',
        occurrences: [],
        missingInformation: ['Aguardando alinhamento e chamada alélica na etapa anterior'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Módulo de Fechamento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Revisão técnica não iniciada'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-01-4',
        timestamp: '24/10/2025 12:45:00',
        type: 'movimentacao',
        title: 'Leitura de fluoróforos em 68% do ciclo',
        description:
          'Bancada MiSeq atingiu ciclo 142 com dispersão de cluster ideal. Operação em curso sem desvios.',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista NGS',
        stepId: 'processamento',
        badgeLabel: 'Em andamento',
      },
      {
        id: 'ev-01-3',
        timestamp: '24/10/2025 11:15:00',
        type: 'movimentacao',
        title: 'Início da corrida de sequenciamento',
        description:
          'Biblioteca des desnaturada e carregada no cartucho MiSeq Reagent Kit v3 (Lote SIM-2025-41).',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista NGS',
        stepId: 'processamento',
      },
      {
        id: 'ev-01-2',
        timestamp: '24/10/2025 09:40:00',
        type: 'alteracao',
        title: 'Controle de qualidade de extração aprovado',
        description:
          'Quantificação fluorimétrica Qubit: 42.4 ng/µL. Razão 260/280: 1.88. Alíquota reserva catalogada.',
        responsibleName: 'Esp. G. Sales',
        responsibleRole: 'Bancada de Extração',
        stepId: 'processamento',
      },
      {
        id: 'ev-01-1',
        timestamp: '24/10/2025 08:30:14',
        type: 'movimentacao',
        title: 'Recebimento e triagem da amostra',
        description:
          'Amostra protocolada com prioridade de Transplante Imediato (Tx Imediato). Tubo verificado e etiquetado.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '24/10/2025 07:15:22',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-880 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'concluido',
        timestamp: '24/10/2025 10:20:00',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Operador de Citometria/Luminex',
        sourceReference: 'Leitora FlexMap 3D (Simulada)',
        occurrences: [],
        missingInformation: [],
        technicalNotes:
          'Controle de calibração do dia válido. 100 beads mínimos atingidos em 98.5% dos poços.',
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'em_andamento',
        timestamp: '24/10/2025 11:30:00',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Analista de Bioinformática',
        sourceReference: 'Software HLA Fusion v4.6 (Simulado)',
        occurrences: [
          'Leitura preliminar sugere presença de alelo raro no loco B. Verificação manual em curso.',
        ],
        missingInformation: [],
        technicalNotes: 'Conferindo padrão de reatividade das sondas 142 e 148 do lote.',
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Bancada de Conferência Sênior (Simulada)',
        occurrences: [],
        missingInformation: ['Aguardando conclusão da chamada pelo Dr. C. Medeiros'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Etapa de revisão técnica pendente'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-02-3',
        timestamp: '24/10/2025 11:45:00',
        type: 'movimentacao',
        title: 'Amostra admitida na fila de análise bioinformática',
        description:
          'Dados brutos importados da leitora Luminex para o software de chamada de alelos.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        stepId: 'analise',
      },
      {
        id: 'ev-02-2',
        timestamp: '24/10/2025 10:20:00',
        type: 'movimentacao',
        title: 'Leitura de esferas Luminex concluída',
        description:
          'Painel de sondas SSO processado com MFI (Mean Fluorescence Intensity) dentro dos parâmetros de corte.',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Citometria/Luminex',
        stepId: 'processamento',
      },
      {
        id: 'ev-02-1',
        timestamp: '24/10/2025 07:15:22',
        type: 'movimentacao',
        title: 'Recebimento de urgência registrado',
        description:
          'Amostra para Transplante Hepático recebida e encaminhada imediatamente para extração rápida.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '23/10/2025 14:10:05',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-864 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'alerta',
        timestamp: '24/10/2025 11:00:00',
        responsibleName: 'Dra. F. Alencar',
        responsibleRole: 'Especialista em Confirmação Alélica',
        sourceReference: 'Protocolo de Reteste RET-2025-039 (Simulado)',
        occurrences: [
          'Ocorrência: Queda na profundidade de leitura do éxon 2 do loco DRB1 (< 30x).',
          'Reteste registrado: Preparo de nova biblioteca com primers direcionados para éxon 2 e 3.',
        ],
        missingInformation: ['Validação da cobertura mínima após reamplificação'],
        technicalNotes:
          'Classificação da causa técnica: CAUSA PROVÁVEL — interferência de dimerização de primers específicos no loco DRB1.',
        qcMetrics: [
          { label: 'Cobertura média NGS', value: '28x (Mínimo: 50x)', status: 'alerta' },
          {
            label: 'Status do Reteste',
            value: 'Alíquota reserva em reprocessamento',
            status: 'alerta',
          },
        ],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'pendente',
        sourceReference: 'Pipeline NGS v3.54 (Simulado)',
        occurrences: [
          'Fase suspensa temporariamente até chegada dos novos reads de sequenciamento',
        ],
        missingInformation: ['Novos arquivos FASTQ da reamplificação'],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Validação Sênior (Simulada)',
        occurrences: [],
        missingInformation: ['Aguardando resolução da ambiguidade'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Ciclo retido para confirmação de qualidade'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-03-5',
        timestamp: '24/10/2025 11:00:00',
        type: 'reteste',
        title: 'Reteste operacional associado: reamplificação do éxon 2 de DRB1',
        description:
          'Emitida guia de trabalho demonstrativa RET-2025-039. Amostra reserva resgatada do freezer -80°C.',
        responsibleName: 'Dra. F. Alencar',
        responsibleRole: 'Especialista em Confirmação',
        causeClassification: 'provavel',
        causeDescription:
          'Dimerização competitiva de primer no pool multiplex original, reduzindo amplificação do alelo DRB1*04.',
        hasAssociatedRetest: true,
        retestId: 'RET-2025-039',
        stepId: 'processamento',
        badgeLabel: 'Reteste ativo',
      },
      {
        id: 'ev-03-4',
        timestamp: '24/10/2025 09:30:00',
        type: 'ocorrencia',
        title: 'Ocorrência registrada: profundidade insuficiente em DRB1',
        description:
          'Alinhamento acusou ambiguidade insolúvel entre alelos *04:01 e *04:07 por baixa densidade de leituras.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        causeClassification: 'provavel',
        causeDescription: 'Flutuação estocástica de amplificação no loco de alta homologia.',
        hasAssociatedRetest: true,
        retestId: 'RET-2025-039',
        stepId: 'analise',
        badgeLabel: 'Causa provável',
      },
      {
        id: 'ev-03-3',
        timestamp: '23/10/2025 21:00:00',
        type: 'movimentacao',
        title: 'Sequenciamento da primeira corrida concluído',
        description: 'Corrida MiSeq finalizada. 1.2M reads gerados.',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista NGS',
        stepId: 'processamento',
      },
      {
        id: 'ev-03-2',
        timestamp: '23/10/2025 16:30:00',
        type: 'alteracao',
        title: 'Preparação de biblioteca genômica',
        description:
          'Extração realizada com sucesso (DNA 36 ng/µL). Fragmentação enzimática e indexação completadas.',
        responsibleName: 'Esp. G. Sales',
        responsibleRole: 'Bancada de Extração',
        stepId: 'processamento',
      },
      {
        id: 'ev-03-1',
        timestamp: '23/10/2025 14:10:05',
        type: 'movimentacao',
        title: 'Amostra recebida para cadastro de Medula Óssea',
        description:
          'Entrada registrada com indicação para Painel Expandido com locos clássicos e não-clássicos.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '24/10/2025 09:40:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-888 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'em_andamento',
        timestamp: '24/10/2025 11:20:00',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Bancada PCR',
        sourceReference: 'Termociclador ProFlex 3x32 (Simulado)',
        occurrences: [],
        missingInformation: [],
        technicalNotes: 'Ciclo 22 de 35 em andamento. Temperatura de anelamento estável a 62°C.',
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'pendente',
        sourceReference: 'Fotodocumentador de Gel (Simulado)',
        occurrences: [],
        missingInformation: ['Aguardando corrida eletroforética após PCR'],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Conferência Operacional (Simulada)',
        occurrences: [],
        missingInformation: ['Aguardando análise'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Etapas analíticas pendentes'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-04-2',
        timestamp: '24/10/2025 11:20:00',
        type: 'movimentacao',
        title: 'Termociclador iniciado para amplificação SSP',
        description: 'Placa de 96 poços com primers específicos carregada no bloco A.',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Bancada PCR',
        stepId: 'processamento',
      },
      {
        id: 'ev-04-1',
        timestamp: '24/10/2025 09:40:00',
        type: 'movimentacao',
        title: 'Recepção da amostra no setor de biologia molecular',
        description: 'Amostra etiquetada e liberada para extração rápida por coluna de sílica.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '23/10/2025 11:20:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-858 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'concluido',
        timestamp: '23/10/2025 22:40:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista NGS',
        sourceReference: 'Corrida MSQ-876 (Simulada)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'concluido',
        timestamp: '24/10/2025 09:15:00',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        sourceReference: 'Pipeline IMGT/HLA 3.54 (Simulado)',
        occurrences: [],
        missingInformation: [],
        technicalNotes:
          'Todos os locos com cobertura > 120x. Sem ambiguidades nos locos classe I e classe II.',
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'em_andamento',
        timestamp: '24/10/2025 10:30:00',
        responsibleName: 'Dr. R. Holanda',
        responsibleRole: 'Especialista Responsável pela Validação',
        sourceReference: 'Módulo de Parecer Técnico CPDHRCE (Simulado)',
        occurrences: [],
        missingInformation: ['Assinatura técnica eletrônica pendente'],
        technicalNotes:
          'Conferência de concordância alélica com histórico do paciente e laudos prévios.',
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Aguardando assinatura da revisão'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-05-3',
        timestamp: '24/10/2025 10:30:00',
        type: 'revisao',
        title: 'Exame encaminhado para revisão técnica',
        description:
          'Análise bioinformática aprovada com louvor. Aguardando assinatura de encerramento pelo Dr. R. Holanda.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        stepId: 'revisao',
      },
      {
        id: 'ev-05-2',
        timestamp: '24/10/2025 09:15:00',
        type: 'movimentacao',
        title: 'Chamada de alelos concluída sem ambiguidades',
        description:
          'Locos A, B, C, DRB1, DQA1 e DQB1 tipados em segundo e terceiro campo de resolução.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        stepId: 'analise',
      },
      {
        id: 'ev-05-1',
        timestamp: '23/10/2025 11:20:00',
        type: 'movimentacao',
        title: 'Entrada da amostra registrada',
        description: 'Cadastro realizado no sistema operacional do laboratório.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '24/10/2025 10:05:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-891 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'em_andamento',
        timestamp: '24/10/2025 11:45:00',
        responsibleName: 'Esp. G. Sales',
        responsibleRole: 'Bancada de Extração',
        sourceReference: 'Extrator Automatizado Maxwell 16 (Simulado)',
        occurrences: [],
        missingInformation: ['Aguardando eluição e quantificação no Nanodrop'],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'pendente',
        sourceReference: 'Sequenciador Eletroforético ABI 3500 (Simulado)',
        occurrences: [],
        missingInformation: ['Amostra em extração'],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Validação Operacional (Simulada)',
        occurrences: [],
        missingInformation: ['Etapas analíticas pendentes'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Ciclo em fase inicial'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-06-2',
        timestamp: '24/10/2025 11:45:00',
        type: 'movimentacao',
        title: 'Início da lise celular e extração de DNA',
        description: 'Tubo posicionado no cartucho de beads magnéticas para isolamento genômico.',
        responsibleName: 'Esp. G. Sales',
        responsibleRole: 'Bancada de Extração',
        stepId: 'processamento',
      },
      {
        id: 'ev-06-1',
        timestamp: '24/10/2025 10:05:00',
        type: 'movimentacao',
        title: 'Triagem de tubo recebida',
        description: 'Amostra admitida para rastreio de espondiloartropatia e confirmação de B*27.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '22/10/2025 16:00:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-842 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'concluido',
        timestamp: '23/10/2025 18:20:00',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Operador Luminex',
        sourceReference: 'Placa Luminex #4412 (Simulada)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'em_andamento',
        timestamp: '24/10/2025 09:00:00',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        sourceReference: 'Painel SSO v4.6 (Simulado)',
        occurrences: [
          'Ocorrência leve: sonda #88 com intensidade limítrofe, avaliando cut-off positivo/negativo.',
        ],
        missingInformation: [],
        technicalNotes:
          'Classificação preliminar: Causa Informativa — variação comum em sondas com GC elevado.',
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Validação Técnica (Simulada)',
        occurrences: [],
        missingInformation: ['Aguardando encerramento da conferência da sonda'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Revisão técnica não iniciada'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-07-3',
        timestamp: '24/10/2025 09:00:00',
        type: 'ocorrencia',
        title: 'Ocorrência registrada: variação de sinal em sonda #88',
        description:
          'Sinal MFI em 920 (threshold 950). Análise estendida para correlacionar com alelo DRB1.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        causeClassification: 'informativa',
        causeDescription:
          'Variação termodinâmica esperada para sonda específica, sem necessidade de reteste.',
        hasAssociatedRetest: false,
        stepId: 'analise',
        badgeLabel: 'Em observação',
      },
      {
        id: 'ev-07-2',
        timestamp: '23/10/2025 18:20:00',
        type: 'movimentacao',
        title: 'Leitura Luminex finalizada',
        description: 'Dados brutos arquivados no repositório local do laboratório.',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Operador Luminex',
        stepId: 'processamento',
      },
      {
        id: 'ev-07-1',
        timestamp: '22/10/2025 16:00:00',
        type: 'movimentacao',
        title: 'Recebimento de amostra de rotina',
        description: 'Amostra cadastrada com protocolo de urgência para transplante renal.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '22/10/2025 09:15:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-830 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'concluido',
        timestamp: '23/10/2025 16:00:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista NGS',
        sourceReference: 'Corrida MSQ-871 (Simulada)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'concluido',
        timestamp: '24/10/2025 07:30:00',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        sourceReference: 'Pipeline IMGT/HLA 3.54 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'em_andamento',
        timestamp: '24/10/2025 08:00:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Responsável Técnica Sênior',
        sourceReference: 'Módulo de Parecer Técnico CPDHRCE (Simulado)',
        occurrences: [],
        missingInformation: ['Validação do parecer pelo segundo perito para Medula Óssea'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Segunda assinatura da revisão pendente'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-08-3',
        timestamp: '24/10/2025 08:00:00',
        type: 'revisao',
        title: 'Revisão por especialista sênior em andamento',
        description:
          'Primeira assinatura realizada pela Dra. E. Vasconcelos. Encaminhado para contra-prova documental.',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Responsável Técnica',
        stepId: 'revisao',
      },
      {
        id: 'ev-08-2',
        timestamp: '24/10/2025 07:30:00',
        type: 'movimentacao',
        title: 'Chamada alélica validada em 7 locos',
        description:
          'Alinhamento completo sem discrepâncias nos locos clássicos de transplante de medula.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        stepId: 'analise',
      },
      {
        id: 'ev-08-1',
        timestamp: '22/10/2025 09:15:00',
        type: 'movimentacao',
        title: 'Recebimento de amostra crítica',
        description: 'Amostra classificada como Transplante Imediato (Tx Imediato).',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '21/10/2025 15:40:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-815 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'alerta',
        timestamp: '24/10/2025 06:00:00',
        responsibleName: 'Dra. F. Alencar',
        responsibleRole: 'Especialista em Confirmação',
        sourceReference: 'Guia de Reteste RET-2025-035 (Simulada)',
        occurrences: [
          'Ocorrência: Sinal fluorescente abaixo do limiar de detecção no canal FAM para o loco DRB1.',
          'Reteste registrado: Reamplificação com mastermix de alta sensibilidade e tempo de extensão estendido.',
        ],
        missingInformation: ['Aguardando término da corrida da reamplificação'],
        technicalNotes:
          'Classificação da causa técnica: CAUSA CONFIRMADA — degradação parcial do fluoróforo na alíquota do kit reagente.',
        qcMetrics: [
          { label: 'Fluorescência inicial', value: '410 RFU (Corte: 800 RFU)', status: 'alerta' },
          { label: 'Causa confirmada', value: 'Reagente com perda de sinal', status: 'alerta' },
        ],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'pendente',
        sourceReference: 'Pipeline NGS v3.54 (Simulado)',
        occurrences: ['Aguardando novo arquivo de dados brutos'],
        missingInformation: ['Dados da nova amplificação'],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Validação Sênior (Simulada)',
        occurrences: [],
        missingInformation: ['Reteste em andamento'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Acompanhamento retido'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-09-4',
        timestamp: '24/10/2025 06:00:00',
        type: 'reteste',
        title: 'Reteste associado registrado: RET-2025-035',
        description:
          'Reamplificação iniciada com novo lote de reagentes mastermix para confirmação do sinal DRB1.',
        responsibleName: 'Dra. F. Alencar',
        responsibleRole: 'Especialista em Confirmação',
        causeClassification: 'confirmada',
        causeDescription:
          'Degradação térmica do fluoróforo do reagente durante transporte externo.',
        hasAssociatedRetest: true,
        retestId: 'RET-2025-035',
        stepId: 'processamento',
        badgeLabel: 'Causa confirmada',
      },
      {
        id: 'ev-09-3',
        timestamp: '23/10/2025 17:00:00',
        type: 'ocorrencia',
        title: 'Ocorrência registrada: sinal insuficiente em DRB1',
        description:
          'Curva de emissão não atingiu o limiar de positividade na bancada automatizada.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        causeClassification: 'confirmada',
        causeDescription: 'Lote de reagente com desvio de fluorescência.',
        hasAssociatedRetest: true,
        retestId: 'RET-2025-035',
        stepId: 'processamento',
      },
      {
        id: 'ev-09-2',
        timestamp: '22/10/2025 14:00:00',
        type: 'movimentacao',
        title: 'Primeira amplificação realizada',
        description: 'PCR executado no protocolo padrão.',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Bancada PCR',
        stepId: 'processamento',
      },
      {
        id: 'ev-09-1',
        timestamp: '21/10/2025 15:40:00',
        type: 'movimentacao',
        title: 'Recebimento de amostra ambulatorial',
        description: 'Amostra de sangue total EDTA protocolada.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'em_andamento',
        timestamp: '24/10/2025 11:30:00',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Triagem e Recepção Técnica',
        sourceReference: 'Lote REC-2025-10-899 (Simulado)',
        occurrences: [],
        missingInformation: ['Conferência de formulário de consentimento informado'],
        technicalNotes: 'Amostra recebida há poucos minutos. Em conferência de tubos e volumes.',
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'pendente',
        sourceReference: 'Bancada Luminex (Simulada)',
        occurrences: [],
        missingInformation: ['Triagem inicial em andamento'],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'pendente',
        sourceReference: 'Software SSO v4.6 (Simulado)',
        occurrences: [],
        missingInformation: ['Processamento não iniciado'],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'pendente',
        sourceReference: 'Validação Técnica (Simulada)',
        occurrences: [],
        missingInformation: ['Etapas analíticas pendentes'],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'pendente',
        sourceReference: 'Encerramento Operacional (Simulado)',
        occurrences: [],
        missingInformation: ['Exame em triagem de entrada'],
      },
    ],
    historyEvents: [
      {
        id: 'ev-10-1',
        timestamp: '24/10/2025 11:30:00',
        type: 'movimentacao',
        title: 'Chegada da amostra ao laboratório',
        description:
          'Tubo de sangue periférico recebido do hospital solicitante. Leitura do código de barras realizada.',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '20/10/2025 14:00:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-798 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'concluido',
        timestamp: '21/10/2025 10:00:00',
        responsibleName: 'Esp. T. Moreira',
        responsibleRole: 'Bancada PCR',
        sourceReference: 'Termociclador ProFlex (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'concluido',
        timestamp: '21/10/2025 15:30:00',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        sourceReference: 'Análise de Gel e Sondas SSP (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'concluido',
        timestamp: '22/10/2025 11:00:00',
        responsibleName: 'Dr. R. Holanda',
        responsibleRole: 'Especialista em Imunogenética',
        sourceReference: 'Parecer Técnico CPDHRCE #4402 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'concluido',
        timestamp: '23/10/2025 18:00:00',
        responsibleName: 'Dr. R. Holanda',
        responsibleRole: 'Especialista em Imunogenética',
        sourceReference: 'Encerramento Operacional #ENC-2025-0820 (Simulado)',
        occurrences: [],
        missingInformation: [],
        technicalNotes:
          'Ciclo completo de acompanhamento finalizado. Amostra arquivada em biobanco demonstrativo.',
      },
    ],
    historyEvents: [
      {
        id: 'ev-11-4',
        timestamp: '23/10/2025 18:00:00',
        type: 'movimentacao',
        title: 'Encerramento do acompanhamento laboratorial',
        description:
          'Resultado emitido no ambiente operacional demonstrativo. Tubo de DNA transferido para arquivo refrigerado.',
        responsibleName: 'Dr. R. Holanda',
        responsibleRole: 'Especialista',
        stepId: 'encerramento',
        badgeLabel: 'Ciclo encerrado',
      },
      {
        id: 'ev-11-3',
        timestamp: '22/10/2025 11:00:00',
        type: 'revisao',
        title: 'Revisão técnica finalizada e aprovada',
        description:
          'Laudo com parecer de triagem de hipersensibilidade B*57:01 assinado digitalmente.',
        responsibleName: 'Dr. R. Holanda',
        responsibleRole: 'Especialista',
        stepId: 'revisao',
      },
      {
        id: 'ev-11-2',
        timestamp: '21/10/2025 15:30:00',
        type: 'movimentacao',
        title: 'Análise de bandas eletroforéticas concluída',
        description:
          'Controle interno de amplificação positivo em todas as reações. Resultado negativo para B*57:01.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        stepId: 'analise',
      },
      {
        id: 'ev-11-1',
        timestamp: '20/10/2025 14:00:00',
        type: 'movimentacao',
        title: 'Amostra admitida na central',
        description: 'Triagem de tubo realizada sem intercorrências.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
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
    journeyStepsDetails: [
      {
        stepId: 'recebimento',
        stepName: 'Recebimento',
        order: 1,
        state: 'concluido',
        timestamp: '19/10/2025 10:20:00',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        sourceReference: 'Lote REC-2025-10-770 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'processamento',
        stepName: 'Processamento',
        order: 2,
        state: 'concluido',
        timestamp: '20/10/2025 18:00:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Especialista NGS',
        sourceReference: 'Corrida MSQ-865 (Simulada)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'analise',
        stepName: 'Análise',
        order: 3,
        state: 'concluido',
        timestamp: '21/10/2025 14:00:00',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        sourceReference: 'Pipeline NGS v3.54 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'revisao',
        stepName: 'Revisão',
        order: 4,
        state: 'concluido',
        timestamp: '22/10/2025 09:30:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Responsável Técnica',
        sourceReference: 'Parecer Técnico CPDHRCE #4390 (Simulado)',
        occurrences: [],
        missingInformation: [],
      },
      {
        stepId: 'encerramento',
        stepName: 'Encerramento do acompanhamento',
        order: 5,
        state: 'concluido',
        timestamp: '22/10/2025 16:45:00',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Responsável Técnica',
        sourceReference: 'Encerramento Operacional #ENC-2025-0815 (Simulado)',
        occurrences: [],
        missingInformation: [],
        technicalNotes:
          'Ciclo completo de acompanhamento de Medula Óssea encerrado com conformidade total.',
      },
    ],
    historyEvents: [
      {
        id: 'ev-12-3',
        timestamp: '22/10/2025 16:45:00',
        type: 'movimentacao',
        title: 'Encerramento do acompanhamento operacional',
        description: 'Laudo de alta resolução liberado para central de transplantes demonstrativa.',
        responsibleName: 'Dra. E. Vasconcelos',
        responsibleRole: 'Responsável Técnica',
        stepId: 'encerramento',
      },
      {
        id: 'ev-12-2',
        timestamp: '21/10/2025 14:00:00',
        type: 'alteracao',
        title: 'Alinhamento genômico com banco IMGT validado',
        description: 'Cobertura superior a 150x em todos os locos investigados.',
        responsibleName: 'Dr. C. Medeiros',
        responsibleRole: 'Bioinformática',
        stepId: 'analise',
      },
      {
        id: 'ev-12-1',
        timestamp: '19/10/2025 10:20:00',
        type: 'movimentacao',
        title: 'Entrada da amostra protocolada',
        description: 'Amostra de doador de medula cadastrada com alta prioridade.',
        responsibleName: 'Técnico M. Andrade',
        responsibleRole: 'Triagem de Entrada',
        stepId: 'recebimento',
      },
    ],
  },
]

/**
 * Helper para construir detalhes de etapas para exames dinâmicos ou complementares
 */
export function buildDefaultJourneySteps(exam: {
  journeyStep: OperationalJourneyStep
  arrivalDate: string
  lastUpdate: string
  operatorName: string
  needsRetest?: boolean
  retestReason?: string
}): ExamJourneyStepDetail[] {
  const stepsOrder: OperationalJourneyStep[] = [
    'recebimento',
    'processamento',
    'analise',
    'revisao',
    'encerramento',
  ]

  const currentIdx = stepsOrder.indexOf(exam.journeyStep)

  return stepsOrder.map((stepId, idx) => {
    const stepDef = OPERATIONAL_JOURNEY_STEPS.find((s) => s.id === stepId)!
    let state: StepExecutionState = 'pendente'
    let timestamp: string | undefined = undefined
    let responsibleName: string | undefined = undefined
    let responsibleRole: string | undefined = undefined
    const occurrences: string[] = []
    const missingInformation: string[] = []

    if (idx < currentIdx) {
      state = 'concluido'
      timestamp = exam.arrivalDate
      responsibleName = idx === 0 ? 'Técnico M. Andrade' : exam.operatorName
      responsibleRole = idx === 0 ? 'Triagem de Entrada' : 'Bancada Analítica'
    } else if (idx === currentIdx) {
      if (exam.needsRetest) {
        state = 'alerta'
        occurrences.push(
          `Ocorrência sinalizada: ${exam.retestReason || 'Reteste operacional solicitado'}`,
        )
        missingInformation.push('Resolução da causa do reteste e nova corrida')
      } else if (exam.journeyStep === 'encerramento') {
        state = 'concluido'
      } else {
        state = 'em_andamento'
      }
      timestamp = exam.lastUpdate
      responsibleName = exam.operatorName
      responsibleRole = 'Operador Responsável'
    } else {
      state = 'pendente'
      missingInformation.push(
        `Aguardando conclusão da etapa anterior (${OPERATIONAL_JOURNEY_STEPS[idx - 1]?.name || ''})`,
      )
    }

    return {
      stepId,
      stepName: stepDef.name,
      order: stepDef.order,
      state,
      timestamp,
      responsibleName,
      responsibleRole,
      sourceReference: `Registro Operacional ${stepDef.shortLabel} (Simulado)`,
      occurrences,
      missingInformation,
      technicalNotes: `Etapa operacional provisória configurável para rotina laboratorial CPDHRCE.`,
    }
  })
}

export function buildDefaultHistoryEvents(exam: LabExamSample): ExamHistoryEvent[] {
  const events: ExamHistoryEvent[] = []

  // Evento inicial sempre presente
  events.push({
    id: `ev-${exam.id}-1`,
    timestamp: exam.arrivalDate,
    type: 'movimentacao',
    title: 'Recebimento e protocolo de entrada',
    description: `Amostra sintética ${exam.sampleId} admitida para processamento via ${exam.methodology}.`,
    responsibleName: 'Técnico M. Andrade',
    responsibleRole: 'Triagem de Entrada',
    stepId: 'recebimento',
  })

  // Se tem reteste
  if (exam.needsRetest) {
    events.push({
      id: `ev-${exam.id}-retest`,
      timestamp: exam.lastUpdate,
      type: 'reteste',
      title: 'Reteste operacional sinalizado',
      description: exam.retestReason || 'Necessidade de confirmação analítica ou reamplificação.',
      responsibleName: exam.operatorName,
      responsibleRole: 'Operador Responsável',
      causeClassification: 'provavel',
      causeDescription: exam.retestReason || 'Discrepância na leitura ou dispersão de sinal.',
      hasAssociatedRetest: true,
      retestId: `RET-${exam.protocolNumber.replace('HLA-', '')}`,
      stepId: exam.journeyStep,
      badgeLabel: 'Reteste ativo',
    })
  }

  // Evento de atualização recente
  events.push({
    id: `ev-${exam.id}-latest`,
    timestamp: exam.lastUpdate,
    type: exam.situation === 'concluido' ? 'revisao' : 'movimentacao',
    title: `Etapa atual: ${exam.stepName}`,
    description: `Amostra em acompanhamento operacional com progresso em ${exam.stepProgress}%.`,
    responsibleName: exam.operatorName,
    responsibleRole: 'Operador Responsável',
    stepId: exam.journeyStep,
    badgeLabel: exam.situation === 'concluido' ? 'Concluído' : 'Em andamento',
  })

  return events
}

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
