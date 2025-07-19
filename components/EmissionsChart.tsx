"use client";

import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EmissionPoint {
  month: string;
  baselineEmissions: number;
  projectEmissions: number;
  emissionReductions: number;
}

const emissionsConfig = {
  baselineEmissions: { label: "Baseline Emissions (tCO₂e)", color: "#1e40af" },
  projectEmissions: { label: "Project Emissions (tCO₂e)", color: "#16a34a" },
  emissionReductions: { label: "Emissions Reduced (tCO₂e)", color: "#f59e0b" },
};

export function EmissionsChart({ data }: { data: EmissionPoint[] }) {
  if (!data || data.length === 0) {
    return <p className="text-muted">No emission data available.</p>;
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {Object.keys(emissionsConfig).map((key) => (
              <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={emissionsConfig[key as keyof typeof emissionsConfig].color}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={emissionsConfig[key as keyof typeof emissionsConfig].color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <Tooltip />
          {Object.entries(emissionsConfig).map(([key, config]) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={config.color}
              fill={`url(#fill${key})`}
              name={config.label}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
