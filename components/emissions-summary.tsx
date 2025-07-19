import {
  IconLeaf,
  IconChartBar,
  IconArrowDownRight,
} from "@tabler/icons-react"

export type EmissionResultsType = {
  baselineEmissions: string
  projectEmissions: string
  emissionReductions: string
}

export function EmissionsSummary({ results }: { results: EmissionResultsType }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4 text-sm text-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 font-medium">
          <IconChartBar className="size-5" />
          <span>Baseline Emissions</span>
        </div>
        <div className="font-semibold">{results.baselineEmissions} tCO₂e/month</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-600 font-medium">
          <IconLeaf className="size-5" />
          <span>Project Emissions</span>
        </div>
        <div className="font-semibold">{results.projectEmissions} tCO₂e/month</div>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2 text-green-600 font-medium">
          <IconArrowDownRight className="size-5" />
          <span>Emission Reductions</span>
        </div>
        <div className="font-bold text-green-700">{results.emissionReductions} tCO₂e/month</div>
      </div>
    </div>
  )
}
