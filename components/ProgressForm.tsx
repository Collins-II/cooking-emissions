"use client";

import React, { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import ProgressItem from "./ui/progressItem"; // Ensure correct capitalization
//import { EmissionsChart } from "./EmissionsChart";

import {
  Flame, Droplet, PlugZap, Fuel, Leaf, Zap, LeafyGreen,
} from "lucide-react";
import { GiCampfire } from "react-icons/gi";


// Types
interface OptionType {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface FormState {
  stoveType: string;
  fuelType: string;
  dailyCookingTime: string;
  dailyFuelUse: string;
  efficiency: string;
  householdSize: string;
}

interface EmissionResult {
  baselineEmissions: string;
  projectEmissions: string;
  emissionReductions: string;
}

// Stove + Fuel Options
const stoveOptions: OptionType[] = [
  { value: "3-stone", label: "3-Stone Fire", icon: <Flame /> },
  { value: "charcoal", label: "Charcoal Brazier", icon: <GiCampfire /> },
  { value: "kerosene", label: "Kerosene Stove", icon: <Droplet /> },
  { value: "lpg", label: "LPG Stove", icon: <Fuel /> },
  { value: "electric", label: "Electric Stove", icon: <PlugZap /> },
  { value: "improved", label: "Improved Biomass Stove", icon: <LeafyGreen /> },
];

const fuelTypeMap: Record<string, OptionType[]> = {
  "3-stone": [
    { value: "wood", label: "Wood", icon: <Leaf /> },
    { value: "charcoal", label: "Charcoal", icon: <Flame /> },
  ],
  charcoal: [{ value: "charcoal", label: "Charcoal", icon: <Flame /> }],
  kerosene: [{ value: "kerosene", label: "Kerosene", icon: <Droplet /> }],
  lpg: [{ value: "lpg", label: "LPG", icon: <Fuel /> }],
  electric: [{ value: "electricity", label: "Electricity", icon: <PlugZap /> }],
  improved: [
    { value: "wood", label: "Wood", icon: <Leaf /> },
    { value: "charcoal", label: "Charcoal", icon: <Flame /> },
    { value: "ethanol", label: "Ethanol", icon: <Zap /> },
  ],
};

const emissionFactors: Record<string, number> = {
  wood: 0.001747,
  charcoal: 0.0063,
  lpg: 0.002983,
  electricity: 0.000233,
  ethanol: 0.0015,
  kerosene: 0.0025,
};

export function ProgressForm() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<FormState>({
    stoveType: "",
    fuelType: "",
    dailyCookingTime: "",
    dailyFuelUse: "",
    efficiency: "",
    householdSize: "",
  });

  const [results, setResults] = useState<EmissionResult | null>(null);

  const totalSteps = 6;
  const progressPercent = ((step - 1) / totalSteps) * 100;

  const updateField = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const calculate = (): EmissionResult => {
    const EF = emissionFactors[form.fuelType] || 0.002;
    const fuel = parseFloat(form.dailyFuelUse || "0") * 30;
    const eb = fuel * EF / 0.10;
    const ep = fuel * EF / (parseFloat(form.efficiency) || 0.25);
    return {
      baselineEmissions: eb.toFixed(3),
      projectEmissions: ep.toFixed(3),
      emissionReductions: (eb - ep).toFixed(3),
    };
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const handleFinish = () => {
    setResults(calculate());
    setStep(totalSteps + 1);
  };

  const exportPDF = () => {
    if (!results) return;
    const doc = new jsPDF();
    doc.text("Cooking Emissions Report", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Metric", "Value"]],
      body: Object.entries({ ...form, ...results }).map(([k, v]) => [k, v]),
    });
    doc.save("report.pdf");
  };

  const exportCSV = () => {
    if (!results) return;
    const rows = Object.entries({ ...form, ...results });
    const csv = rows.map((r) => r.join(",")).join("\n");
    saveAs(new Blob([csv], { type: "text/csv" }), "report.csv");
  };

  const stoveSelected = form.stoveType;
  const fuelOptions: OptionType[] = fuelTypeMap[stoveSelected] || [];

  return (
 <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-10">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle>Cooking Emissions Wizard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <ProgressItem
              step={1}
              title="Stove Type"
              description="Select your stove"
              progressPercent={progressPercent}
              options={stoveOptions}
              selected={form.stoveType}
              onSelect={(v) => {
                updateField("stoveType", v)
                handleNext()
              }}
            />
          )}

          {step === 2 && (
            <ProgressItem
              step={2}
              title="Fuel Type"
              description="Select fuel used with your stove"
              progressPercent={progressPercent}
              options={fuelOptions}
              selected={form.fuelType}
              onSelect={(v) => {
                updateField("fuelType", v)
                handleNext()
              }}
            />
          )}

          {step === 3 && (
            <ProgressItem
              step={3}
              title="Cooking Time"
              description="How many hours per day?"
              progressPercent={progressPercent}
              inputProps={{
                type: "number",
                placeholder: "e.g., 3",
                value: form.dailyCookingTime,
                onChange: (v: string) => updateField("dailyCookingTime", v),
              }}
            />
          )}

          {step === 4 && (
            <ProgressItem
              step={4}
              title="Fuel Use"
              description="How much fuel per day (kg or L)?"
              progressPercent={progressPercent}
              inputProps={{
                type: "number",
                placeholder: "e.g., 1.5",
                value: form.dailyFuelUse,
                onChange: (v: string) => updateField("dailyFuelUse", v),
              }}
            />
          )}

          {step === 5 && (
            <ProgressItem
              step={5}
              title="Stove Efficiency"
              description="Leave blank for default (25%)"
              progressPercent={progressPercent}
              inputProps={{
                type: "number",
                placeholder: "e.g., 0.25",
                value: form.efficiency,
                onChange: (v: string) => updateField("efficiency", v),
              }}
            />
          )}

          {step === 6 && (
            <ProgressItem
              step={6}
              title="Household Size"
              description="Number of people in household"
              progressPercent={progressPercent}
              inputProps={{
                type: "number",
                placeholder: "e.g., 4",
                value: form.householdSize,
                onChange: (v: string) => updateField("householdSize", v),
              }}
            />
          )}

          {step === totalSteps + 1 && results && (
            <>
              <div className="space-y-2 text-sm">
                <p><strong>Baseline Emissions:</strong> {results.baselineEmissions} tCO₂e/month</p>
                <p><strong>Project Emissions:</strong> {results.projectEmissions} tCO₂e/month</p>
                <p><strong>Emission Reductions:</strong> {results.emissionReductions} tCO₂e/month</p>
              </div>

              {/* Uncomment if using chart
              <EmissionsChart data={[{
                month: new Date().toISOString().slice(0, 7),
                baselineEmissions: parseFloat(results.baselineEmissions),
                projectEmissions: parseFloat(results.projectEmissions),
                emissionReductions: parseFloat(results.emissionReductions),
              }]} />
              */}

              <div className="flex flex-wrap gap-4 mt-4">
                <Button variant="outline" onClick={exportPDF}>Export PDF</Button>
                <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="justify-between mt-4">
          {step > 1 && step <= totalSteps && (
            <Button variant="outline" onClick={handleBack}>Back</Button>
          )}
          {step <= totalSteps && (
            <Button onClick={step === totalSteps ? handleFinish : handleNext}>
              {step === totalSteps ? "Finish" : "Next"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
