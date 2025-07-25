// app/(home)/emissions-summary/page.tsx

"use client"

//import { Metadata } from "next"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'

/*export const metadata: Metadata = {
  title: "Emissions Summary",
  description: "View a summary of all your cooking emissions data with charts.",
}*/

interface EmissionEntry {
  date: string
  stoveType: string
  fuelType: string
  emission: number
}

const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28"]

const dummyEmissions: EmissionEntry[] = [
  { date: "2025-07-01", stoveType: "Electric Stove", fuelType: "Electricity", emission: 12 },
  { date: "2025-07-02", stoveType: "Charcoal Stove", fuelType: "Charcoal", emission: 40 },
  { date: "2025-07-03", stoveType: "Gas Stove", fuelType: "LPG", emission: 25 },
  { date: "2025-07-04", stoveType: "Wood Stove", fuelType: "Firewood", emission: 38 },
  { date: "2025-07-05", stoveType: "Electric Stove", fuelType: "Electricity", emission: 14 },
]

export default function EmissionsSummaryPage() {
  const [data, setData] = useState<EmissionEntry[]>([])

  useEffect(() => {
    setData(dummyEmissions)
  }, [])

  const totalEmissions = data.reduce((acc, item) => acc + item.emission, 0)

  const handlePDF = () => {
    const doc = new jsPDF()
    doc.text('Emissions Summary Report', 14, 15)

    autoTable(doc, {
      head: [['Date', 'Fuel Type', 'Stove Type', 'Emissions (kg CO₂)']],
      body: data.map((item) => [
        item.date,
        item.fuelType,
        item.stoveType,
        item.emission.toFixed(2),
      ]),
    })

    // @ts-expect-error: `lastAutoTable` is not typed by default
    const finalY = doc.lastAutoTable?.finalY || 30
    doc.text(`Total Emissions: ${totalEmissions.toFixed(2)} kg CO₂`, 14, finalY + 10)

    doc.save('emissions-summary.pdf')
  }

  const handleCSV = () => {
    const csvHeader = 'Date,Fuel Type,Stove Type,Emissions (kg CO₂)\n'
    const csvRows = data
      .map((d) => `${d.date},${d.fuelType},${d.stoveType},${d.emission.toFixed(2)}`)
      .join('\n')
    const csv = `${csvHeader}${csvRows}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'emissions-summary.csv')
  }

  const totalEmission = data.reduce((acc, curr) => acc + curr.emission, 0)

  const fuelTypeSummary = Object.entries(
    data.reduce((acc, curr) => {
      acc[curr.fuelType] = (acc[curr.fuelType] || 0) + curr.emission
      return acc
    }, {} as Record<string, number>)
  ).map(([fuelType, emission]) => ({ name: fuelType, value: emission }))

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-green-800 text-3xl font-bold text-center mb-4">Emissions Summary</h1>
      <p className="text-center text-muted-foreground mb-10">
        A breakdown of your cooking emissions by fuel type and daily usage.
      </p>
         <div className="flex gap-2 mb-4">
            <Button onClick={handlePDF} variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button onClick={handleCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              CSV
            </Button>
          </div>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pie Chart by Fuel Type */}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-xl">Cooking Emissions Summary</CardTitle>
        </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fuelTypeSummary}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {fuelTypeSummary.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart by Date */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="emission" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Emission Table */}
      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Emission Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-muted-foreground border-b">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Stove Type</th>
                    <th className="px-4 py-2">Fuel Type</th>
                    <th className="px-4 py-2">Emission (kg CO₂)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-2">{entry.date}</td>
                      <td className="px-4 py-2">{entry.stoveType}</td>
                      <td className="px-4 py-2">{entry.fuelType}</td>
                      <td className="px-4 py-2">{entry.emission.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-muted/30">
                    <td colSpan={3} className="px-4 py-2 text-right">Total</td>
                    <td className="px-4 py-2">{totalEmission.toFixed(2)} kg CO₂</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
