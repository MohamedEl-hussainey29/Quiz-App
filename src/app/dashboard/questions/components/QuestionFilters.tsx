"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export interface QuestionFilterValues {
  type: string
  difficulty: string
}

interface QuestionFiltersProps {
  value: QuestionFilterValues
  onChange: (value: QuestionFilterValues) => void
}

const ALL = "all"

const types = [
  { label: "FE", value: "FE" },
  { label: "BE", value: "BE" },
  { label: "DO", value: "DO" },
]

const difficulty = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
]

export default function QuestionFilters({ value, onChange }: QuestionFiltersProps) {
  const hasActiveFilters = Boolean(value.type || value.difficulty)

  const clearFilters = () => onChange({ type: "", difficulty: "" })

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={value.type || ALL}
        onValueChange={(type) => onChange({ ...value, type: (type === ALL ? "" : type) ?? "" })}
      >
        <SelectTrigger className="h-10 w-35 rounded-lg border border-gray-200 bg-white px-3 text-sm">
          <SelectValue placeholder="Category type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={ALL}>All types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={value.difficulty || ALL}
        onValueChange={(diff) => onChange({ ...value, difficulty: (diff === ALL ? "" : diff) ?? "" })}
      >
        <SelectTrigger className="h-10 w-35 rounded-lg border border-gray-200 bg-white px-3 text-sm">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={ALL}>All difficulties</SelectItem>
            {difficulty.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      )}
    </div>
  )
}