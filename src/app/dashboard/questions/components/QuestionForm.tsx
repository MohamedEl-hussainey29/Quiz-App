"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { QuestionFormValues } from "@/src/types/questions";
import { ReactNode } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

interface QuestionFormProps {
  mode: string
  register: UseFormRegister<QuestionFormValues>
  control: Control<QuestionFormValues>
  errors: FieldErrors<QuestionFormValues>
}

const options = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
]

const difficulty = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
]

const types = [
  { label: "FE", value: "FE" },
  { label: "BE", value: "BE" },
  { label: "DO", value: "DO" },
]

function LabeledField({ label, htmlFor, className, labelClassName, align = "center", children }: {
  label: string;
  htmlFor?: string;
  className?: string;
  labelClassName?: string;
  align?: "center" | "start";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-xl border border-gray-200 bg-white",
        align === "start" ? "items-stretch" : "items-center",
        className
      )}
    >
      <label
        htmlFor={htmlFor}
        className={cn(
          "shrink-0 self-stretch flex items-center bg-[#FFEDDF] px-2 sm:px-3 text-xs sm:text-sm font-bold text-black whitespace-nowrap",
          labelClassName
        )}
      >
        {label}
      </label>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export default function QuestionForm({ mode, register, control, errors }: QuestionFormProps) {
  const isView = mode === "view"

  return (
    <>
      <LabeledField label="Title:" htmlFor="question-title">
        <input
          readOnly={isView}
          id="question-title"
          placeholder="Question Title..."
          className="h-11 w-full bg-transparent px-3 text-sm outline-none"
          {...register("title", {
            required: "Question Title is required!",
            validate: (value) =>
              value.trim().length > 0 || "Question Title cannot contain only spaces",
          })}
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </LabeledField>

      <LabeledField label="Description" htmlFor="question-description" align="start">
        <textarea
          id="question-description"
          readOnly={isView}
          placeholder="Question Description..."
          rows={4}
          className="w-full resize-none bg-transparent px-3 py-3 text-sm outline-none"
          {...register("description", {
            required: "Question Description is required!",
            validate: (value) =>
              value.trim().length > 0 || "Question Description cannot contain only spaces",
          })}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </LabeledField>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(["A", "B", "C", "D"] as const).map((key) => (
          <LabeledField key={key} label={key} htmlFor={`question-option-${key.toLowerCase()}`}>
            <input
              id={`question-option-${key.toLowerCase()}`}
              readOnly={isView}
              className="h-11 w-full bg-transparent px-3 text-sm outline-none"
              {...register(`options.${key}`, {
                required: "This Option is required!",
                validate: (value) =>
                  value.trim().length > 0 || "The Option cannot contain only spaces",
              })}
            />
            {errors.options?.[key] && (
              <span className="text-red-500">{errors.options[key]?.message}</span>
            )}
          </LabeledField>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <LabeledField label="Right Answer" labelClassName="pr-2">
          <Controller
            name="answer"
            control={control}
            rules={{ required: "Please select the correct answer" }}
            render={({ field }) => (
              <Select readOnly={isView} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(
                    "h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0",
                    isView && "[&_svg]:hidden"
                  )}
                >
                  <SelectValue placeholder="A" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.answer && <span className="text-red-500">{errors.answer.message}</span>}
        </LabeledField>

        <LabeledField label="Difficulty" labelClassName="pr-2">
          <Controller
            name="difficulty"
            control={control}
            rules={{ required: "Please select the Difficulty" }}
            render={({ field }) => (
              <Select readOnly={isView} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(
                    "h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0",
                    isView && "[&_svg]:hidden"
                  )}
                >
                  <SelectValue placeholder="easy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {difficulty.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.difficulty && <span className="text-red-500">{errors.difficulty.message}</span>}
        </LabeledField>

        <LabeledField label="Category type" labelClassName="pr-2">
          <Controller
            name="type"
            control={control}
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <Select readOnly={isView} value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={cn(
                    "h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0",
                    isView && "[&_svg]:hidden"
                  )}
                >
                  <SelectValue placeholder="FE" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {types.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && <span className="text-red-500">{errors.type.message}</span>}
        </LabeledField>
      </div>
    </>
  )
}