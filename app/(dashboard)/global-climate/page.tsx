"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { saveAs } from "file-saver"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ClimateRegionData {
  region: string
  co2Emissions: number // in MtCO₂
  avgTemperature: number // °C
  seaLevelRise: number // mm
}

const dummyClimateData: ClimateRegionData[] = [
  { region: "North America", co2Emissions: 5400, avgTemperature: 1.3, seaLevelRise: 85 },
  { region: "Europe", co2Emissions: 4200, avgTemperature: 1.1, seaLevelRise: 60 },
  { region: "Asia", co2Emissions: 11200, avgTemperature: 1.5, seaLevelRise: 92 },
  { region: "Africa", co2Emissions: 1400, avgTemperature: 1.8, seaLevelRise: 70 },
  { region: "South America", co2Emissions: 1800, avgTemperature: 1.6, seaLevelRise: 76 },
  { region: "Oceania", co2Emissions: 1200, avgTemperature: 1.4, seaLevelRise: 88 },
]

export default function GlobalClimateDataPage() {
  const [data, setData] = useState<ClimateRegionData[]>([])
  const [selectedRegion, setSelectedRegion] = useState("All")

  useEffect(() => {
    setData(dummyClimateData)
  }, [])

  const filteredData =
    selectedRegion === "All"
      ? data
      : data.filter((item) => item.region === selectedRegion)

  const handlePDF = () => {
    const doc = new jsPDF()
    doc.text("Global Climate Metrics", 14, 15)

    autoTable(doc, {
      startY: 20,
      head: [["Region", "CO₂ Emissions (Mt)", "Avg Temp (°C)", "Sea Level Rise (mm)"]],
      body: filteredData.map((item) => [
        item.region,
        item.co2Emissions,
        item.avgTemperature,
        item.seaLevelRise,
      ]),
    })

    doc.save("climate-data.pdf")
  }

  const handleCSV = () => {
    const csvHeader = "Region,CO2 Emissions (Mt),Avg Temp (°C),Sea Level Rise (mm)\n"
    const csvRows = filteredData
      .map(
        (item) =>
          `${item.region},${item.co2Emissions},${item.avgTemperature},${item.seaLevelRise}`
      )
      .join("\n")

    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    })
    saveAs(blob, "climate-data.csv")
  }

  const regionOptions = ["All", ...dummyClimateData.map((d) => d.region)]

  return (
    <div className="w-full max-w-6xl px-4 py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Global Climate Data</h1>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {regionOptions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="overflow-x-auto">
          <CardHeader>
            <CardTitle>Climate Metrics by Region</CardTitle>
            <CardDescription>
              CO₂ emissions, temperature changes, and sea level rise.
            </CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-muted">
                  <th className="py-2">Region</th>
                  <th>CO₂ (Mt)</th>
                  <th>Temp (°C)</th>
                  <th>Sea Level (mm)</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.region} className="border-b border-muted">
                    <td className="py-2">{item.region}</td>
                    <td>{item.co2Emissions}</td>
                    <td>{item.avgTemperature}</td>
                    <td>{item.seaLevelRise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="co2Emissions" fill="#f97316" name="CO₂ Emissions" />
              <Bar dataKey="seaLevelRise" fill="#0ea5e9" name="Sea Level Rise" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Source: Simulated environmental data (2025)
        </p>
        <div className="flex gap-4">
          <Button onClick={handlePDF}>Download PDF</Button>
          <Button variant="outline" onClick={handleCSV}>
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  )
}
