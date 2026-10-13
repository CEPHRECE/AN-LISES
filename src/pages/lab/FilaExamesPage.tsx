import React from 'react'
import { PageHeader } from '@/components/lab/PageHeader'
import { StatusBadge } from '@/components/lab/StatusBadge'
import { LabCard } from '@/components/lab/LabCard'
import { LabTable } from '@/components/lab/LabTable'
import { FilterBar } from '@/components/lab/FilterBar'
import { MOCK_EXAM_SAMPLES, LabExamSample } from '@/data/labMockData'
import { ListOrdered, Filter, Download } from 'lucide-react'

export const FilaExamesPage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [selectedFilter, setSelectedFilter] = React.useState('todos')

  const filterOptions = [
    { label: 'Todos', value: 'todos', count: MOCK_EXAM_SAMPLES.length },
    {
      label: 'Sequenciamento',
      value: 'sequenciamento',
      count: MOCK_EXAM_SAMPLES.filter((s) => s.currentStep === 'sequenciamento').length,
    },
    {
      label: 'PCR / Amplificação',
      value: 'amplificacao_pcr',
      count: MOCK_EXAM_SAMPLES.filter((s) => s.currentStep === 'amplificacao_pcr').length,
    },
    {
      label: 'Extração',
      value: 'extracao_dna',
      count: MOCK_EXAM_SAMPLES.filter((s) => s.currentStep === 'extracao_dna').length,
    },
  ]

  const filteredExams = MOCK_EXAM_SAMPLES.filter((exam) => {
    const matchesSearch =
      exam.protocolNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.sampleId.toLowerCase().includes(searchValue.toLowerCase()) ||
      exam.targetLoci.toLowerCase().includes(searchValue.toLowerCase())

    if (!matchesSearch) return false
    if (selectedFilter === 'todos') return true
    return exam.currentStep === selectedFilter
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Fila de Exames"
        description="Fila operacional completa com ordenação cronológica e priorização de amostras para transplantes renais, hepáticos e medula óssea."
        badge={
          <StatusBadge variant="primary" size="sm">
            48 Amostras Ativas
          </StatusBadge>
        }
        actions={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E5EBEF] bg-white hover:bg-[#F8FAFB] text-[#172B36] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#596E79]" />
            <span>Exportar Lista (.csv)</span>
          </button>
        }
      />

      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
        totalCount={filteredExams.length}
      />

      <LabTable exams={filteredExams} />
    </div>
  )
}

export default FilaExamesPage
