"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";

interface OptionType {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ProgressItemProps {
  step: number;
  title: string;
  description: string;
  options?: OptionType[];
  selected?: string;
  progressPercent: number;
  onSelect?: (val: string) => void;
  inputProps?: {
    type: "number" | "text";
    placeholder?: string;
    value?: string;
    onChange?: (v: string) => void;
  };
}

export default function ProgressItem({
  step,
  title,
  description,
  options,
  selected,
  progressPercent,
  onSelect,
  inputProps,
}: ProgressItemProps) {
  return (
    <div className="flex flex-col w-full bg-white">
      <p className="text-md text-slate-900 font-light">
        <span className="text-red-500">{step.toString().padStart(2, "0")}</span>{" "}
        {title}
      </p>
      <Progress value={progressPercent} className="h-2 mb-4 mt-2" />
      <h3 className="text-sm font-light">{description}</h3>

      {options && onSelect && (
        <div className="mt-4 space-y-3">
          {options.map(({ value, label, icon }) => (
            <div
              key={value}
              onClick={() => onSelect(value)}
              className={`flex items-center justify-between p-4 bg-gray-100 rounded-md cursor-pointer hover:ring-2 hover:ring-blue-300 ${
                selected === value ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </div>
              {selected === value && <span className="text-blue-500 font-bold">✓</span>}
            </div>
          ))}
        </div>
      )}

      {inputProps && inputProps.onChange && (
        <div className="mt-4">
          <input
            className="w-full border rounded-md p-2"
            {...inputProps}
            onChange={(e) => inputProps.onChange?.(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
