"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { saveAs } from "file-saver"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface WeeklyCredit {
  week: string
  creditsEarned: number
  creditsUsed: number
}

const dummyWeeklyCredits: WeeklyCredit[] = [
  { week: "2025-W25", creditsEarned: 15, creditsUsed: 5 },
  { week: "2025-W26", creditsEarned: 20, creditsUsed: 8 },
  { week: "2025-W27", creditsEarned: 10, creditsUsed: 12 },
  { week: "2025-W28", creditsEarned: 18, creditsUsed: 6 },
  { week: "2025-W29", creditsEarned: 22, creditsUsed: 10 },
]

export default function WeeklyCreditsPage() {
  const [data, setData] = useState<WeeklyCredit[]>([])
  const [selectedRange, setSelectedRange] = useState<string>("All")

  useEffect(() => {
    setData(dummyWeeklyCredits)
  }, [])

  const filteredData = selectedRange === "All"
    ? data
    : data.filter(d => d.week >= selectedRange)

  const totalEarned = filteredData.reduce((sum, entry) => sum + entry.creditsEarned, 0)
  const totalUsed = filteredData.reduce((sum, entry) => sum + entry.creditsUsed, 0)

  const handlePDF = () => {
    const doc = new jsPDF()
    doc.text("Weekly Carbon Credits Summary", 14, 15)
    autoTable(doc, {
      startY: 20,
      head: [["Week", "Credits Earned", "Credits Used"]],
      body: filteredData.map((d) => [d.week, d.creditsEarned, d.creditsUsed]),
      didDrawPage: (hookData) => {
        const y = hookData.cursor?.y ?? 80
        doc.text(`Total Earned: ${totalEarned}`, 14, y + 10)
        doc.text(`Total Used: ${totalUsed}`, 14, y + 20)
      },
    })
    doc.save("weekly-credits.pdf")
  }

  const handleCSV = () => {
    const csvHeader = "Week,Credits Earned,Credits Used\n"
    const csvRows = filteredData.map(d => `${d.week},${d.creditsEarned},${d.creditsUsed}`).join("\n")
    const csv = `${csvHeader}${csvRows}`
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" })
    saveAs(blob, "weekly-credits.csv")
  }

  const weekOptions = ["All", "2025-W27", "2025-W28", "2025-W29"]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-green-800 text-2xl font-bold">Weekly Carbon Credits</h1>
        <Select value={selectedRange} onValueChange={setSelectedRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by week" />
          </SelectTrigger>
          <SelectContent>
            {weekOptions.map((week) => (
              <SelectItem key={week} value={week}>
                {week === "All" ? "All Weeks" : `From ${week}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Table Card */}
        <Card>
          <CardHeader>
            <CardTitle>Carbon Credit Entries</CardTitle>
            <CardDescription>
              Filter and analyze weekly carbon credits usage and savings.
            </CardDescription>
          </CardHeader>
          <div className="overflow-x-auto px-6 pb-6">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b border-muted">
                  <th className="py-2">Week</th>
                  <th>Earned</th>
                  <th>Used</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry) => (
                  <tr key={entry.week} className="border-b border-muted">
                    <td className="py-2">{entry.week}</td>
                    <td>{entry.creditsEarned}</td>
                    <td>{entry.creditsUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>Visual Chart</CardTitle>
            <CardDescription>
              Bar representation of weekly credit activities.
            </CardDescription>
          </CardHeader>
          <div className="p-6 pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="creditsEarned" fill="#22c55e" name="Earned" />
                <Bar dataKey="creditsUsed" fill="#ef4444" name="Used" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Summary & Downloads */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="flex gap-2 items-center text-sm space-y-1 text-muted-foreground">
          <p><strong>Total Earned:</strong> {totalEarned} credits</p>
          <p><strong>Total Used:</strong> {totalUsed} credits</p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-green-700" onClick={handlePDF}>Download PDF</Button>
          <Button onClick={handleCSV} variant="outline">Download CSV</Button>
        </div>
      </div>
    </div>
  )
}
