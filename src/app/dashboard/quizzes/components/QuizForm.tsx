"use client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Group } from "@/src/types/groups";
import { QuizFormValues } from "@/src/types/quizzes";
import { CalendarDays, Clock3 } from "lucide-react";
import { ReactNode, useState } from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

interface QuizFormProps {
  mode: string
  register: UseFormRegister<QuizFormValues>
  control: Control<QuizFormValues>
  errors: FieldErrors<QuizFormValues>
  groups: Group[] | null
}

const duration = [
  { label: "10 Minutes", value: 10 },
  { label: "15 Minutes", value: 15 },
  { label: "30 Minutes", value: 30 },
  { label: "45 Minutes", value: 45 },
  { label: "60 Minutes", value: 60 },
]

const questions_number = [
  { label: "5 Questions", value: 5 },
  { label: "10 Questions", value: 10 },
  { label: "15 Questions", value: 15 },
  { label: "20 Questions", value: 20 },
  { label: "25 Questions", value: 25 },
  { label: "30 Questions", value: 30 },
]

const score_per_question = [
  { label: "1 Point", value: 1 },
  { label: "2 Points", value: 2 },
  { label: "3 Points", value: 3 },
  { label: "4 Points", value: 4 },
  { label: "5 Points", value: 5 },
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

function ScheduleInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [date, setDate] = useState(value ? value.slice(0, 10) : "");
  const [time, setTime] = useState(value ? value.slice(11, 16) : "");

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const isToday = date === todayStr;
  const minTime = isToday
    ? `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    : undefined;

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (newDate && time) onChange(`${newDate}T${time}:00`);
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (date && newTime) onChange(`${date}T${newTime}:00`);
  };

  const nativeIconReset =
    "relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0";

  return (
    <div className="flex flex-col gap-2 px-3 py-2 sm:h-11 sm:flex-row sm:items-center sm:gap-3 sm:py-0">
      <div className="flex min-w-0 flex-1 items-center">
        <CalendarDays className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
        <input
          type="date"
          value={date}
          min={todayStr}
          onChange={(e) => handleDateChange(e.target.value)}
          className={cn("w-full min-w-0 bg-transparent text-sm outline-none", nativeIconReset)}
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center">
        <Clock3 className="mr-2 h-5 w-5 shrink-0 text-gray-500" />
        <input
          type="time"
          value={time}
          min={minTime}
          onChange={(e) => handleTimeChange(e.target.value)}
          className={cn("w-full min-w-0 bg-transparent text-sm outline-none", nativeIconReset)}
        />
      </div>
    </div>
  );
}

export default function QuizForm({ mode, register, control, errors, groups }: QuizFormProps) {
  

  return (
    <>
      <LabeledField label="Title:" htmlFor="quiz-title">
        <input
          
          id="quiz-title"
          placeholder="Quiz Title..."
          className="h-11 w-full bg-transparent px-3 text-sm outline-none"
          {...register("title", {
            required: "Quiz Title is required!",
            validate: (value) =>
              value.trim().length > 0 || "Quiz Title cannot contain only spaces",
          })}
        />
        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
      </LabeledField>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <LabeledField label="Duration (Minutes)" labelClassName="pr-2">
          <Controller
            name="duration"
            control={control}
            rules={{ required: "Please select the Duration" }}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger className="h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0">
                  <SelectValue placeholder="10 Minutes" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {duration.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.duration && <span className="text-red-500">{errors.duration.message}</span>}
        </LabeledField>

        <LabeledField label="No. of Questions" labelClassName="pr-2">
          <Controller
            name="questions_number"
            control={control}
            rules={{ required: "Please select the No. of Questions" }}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger className="h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0">
                  <SelectValue placeholder="5 Questions" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {questions_number.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.questions_number && <span className="text-red-500">{errors.questions_number.message}</span>}
        </LabeledField>

        <LabeledField label="Score Per Question" labelClassName="pr-2">
          <Controller
            name="score_per_question"
            control={control}
            rules={{ required: "Please select Score" }}
            render={({ field }) => (
              <Select
                value={field.value?.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger className="h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0">
                  <SelectValue placeholder="1 Point" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {score_per_question.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.score_per_question && <span className="text-red-500">{errors.score_per_question.message}</span>}
        </LabeledField>
      </div>

      <LabeledField label="Description" htmlFor="quiz-description" align="start">
        <textarea
          id="quiz-description"
          placeholder="Quiz Description..."
          rows={4}
          className="w-full resize-none bg-transparent px-3 py-3 text-sm outline-none"
          {...register("description", {
            required: "Quiz Description is required!",
            validate: (value) =>
              value.trim().length > 0 || "Quiz Description cannot contain only spaces",
          })}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </LabeledField>

      <LabeledField label="Schedule" labelClassName="pr-2">
        <Controller
          name="schadule"
          control={control}
          rules={{ required: "Schedule is required" }}
          render={({ field }) => (
            <ScheduleInput value={field.value || ""} onChange={field.onChange} />
          )}
        />
        {errors.schadule && <span className="text-red-500">{errors.schadule.message}</span>}
      </LabeledField>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <LabeledField label="Difficulty" labelClassName="pr-2">
          <Controller
            name="difficulty"
            control={control}
            rules={{ required: "Please select the Difficulty" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className= "h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0" >
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className= "h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0" >
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
        <LabeledField label="Group Name" labelClassName="pr-2">
          <Controller
            name="group"
            control={control}
            render={({ field }) => {
              const selectedGroup = groups?.find(
                (group) => group._id === field.value
              );

              return (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-11 w-full border-0 bg-transparent px-3 shadow-none focus:ring-0">
                    <SelectValue>
                      {selectedGroup?.name || "Select Group"}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {groups?.map((group) => (
                        <SelectItem key={group._id} value={group._id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.group && <span className="text-red-500">{errors.group.message}</span>}
        </LabeledField>
      </div>
    </>
  )
}