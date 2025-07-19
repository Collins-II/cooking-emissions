"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ReportData = {
  period: string // e.g. "Week 27", "June 2025", "Q2 2025"
  emissions: number
  creditsEarned: number
}

const dummyReports: ReportData[] = [
  { period: "Week 27", emissions: 35, creditsEarned: 12 },
  { period: "Week 28", emissions: 28, creditsEarned: 15 },
  { period: "Week 29", emissions: 40, creditsEarned: 10 },
  { period: "June 2025", emissions: 110, creditsEarned: 42 },
  { period: "Q2 2025", emissions: 320, creditsEarned: 124 },
]

export default function ReportsPage() {
  const [data, setData] = useState<ReportData[]>([])
  const [selectedFilter, setSelectedFilter] = useState("All")

  useEffect(() => {
    setData(dummyReports)
  }, [])

  const filteredData =
    selectedFilter === "All"
      ? data
      : data.filter((entry) => entry.period.includes(selectedFilter))

  const totalEmissions = filteredData.reduce((sum, d) => sum + d.emissions, 0)
  const totalCredits = filteredData.reduce((sum, d) => sum + d.creditsEarned, 0)

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.text("Carbon Emissions Report", 14, 15)
    autoTable(doc, {
      startY: 20,
      head: [["Period", "Emissions (kg CO₂)", "Credits Earned"]],
      body: filteredData.map((d) => [d.period, d.emissions, d.creditsEarned]),
      didDrawPage: (data) => {
        const y = data.cursor?.y ?? 100
        doc.text(`Total Emissions: ${totalEmissions} kg CO₂`, 14, y + 10)
        doc.text(`Total Credits: ${totalCredits}`, 14, y + 20)
      },
    })
    doc.save("carbon-emissions-report.pdf")
  }

  const handleDownloadCSV = () => {
    const csvHeader = "Period,Emissions (kg CO₂),Credits Earned\n"
    const csvRows = filteredData
      .map((d) => `${d.period},${d.emissions},${d.creditsEarned}`)
      .join("\n")
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    })
    saveAs(blob, "carbon-emissions-report.csv")
  }

  const filterOptions = ["All", "Week", "June", "Q2"]

  return (
    <div className="w-full max-w-6xl px-4 py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Carbon Reports</h1>
        <Select value={selectedFilter} onValueChange={setSelectedFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by period" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt === "All" ? "All Periods" : `Filter: ${opt}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary Table</CardTitle>
            <CardDescription>
              Overview of emissions and carbon credits over time.
            </CardDescription>
          </CardHeader>
          <div className="px-6 pb-6 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-muted">
                  <th className="py-2">Period</th>
                  <th>Emissions</th>
                  <th>Credits</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry) => (
                  <tr key={entry.period} className="border-b border-muted">
                    <td className="py-2">{entry.period}</td>
                    <td>{entry.emissions} kg</td>
                    <td>{entry.creditsEarned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="emissions" fill="#f97316" name="Emissions" />
              <Bar dataKey="creditsEarned" fill="#22c55e" name="Credits" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Emissions Trend</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={filteredData}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="emissions" stroke="#f43f5e" />
            <Line type="monotone" dataKey="creditsEarned" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
        <div className="flex gap-2 items-center text-sm text-muted-foreground">
          <p><strong>Total Emissions:</strong> {totalEmissions} kg CO₂</p>
          <p><strong>Total Credits:</strong> {totalCredits}</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={handleDownloadPDF}>Download PDF</Button>
          <Button onClick={handleDownloadCSV} variant="outline">
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  )
}
