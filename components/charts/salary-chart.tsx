"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { chartOptions } from "./chart-config"
import { teachers } from "@/lib/data"
import { IndianRupee } from "lucide-react"

export function SalaryChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Salary Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-64 bg-slate-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const salaryRanges = [
    { range: "50K-70K", min: 50000, max: 70000 },
    { range: "70K-90K", min: 70000, max: 90000 },
    { range: "90K+", min: 90000, max: Number.POSITIVE_INFINITY },
  ]

  const salaryData = salaryRanges.map((range) => ({
    range: range.range,
    count: teachers.filter((t) => t.salary >= range.min && t.salary < range.max).length,
  }))

  const chartData = {
    labels: salaryData.map((d) => d.range),
    datasets: [
      {
        label: "Number of Teachers",
        data: salaryData.map((d) => d.count),
        backgroundColor: ["rgba(245, 158, 11, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(59, 130, 246, 0.8)"],
        borderColor: ["rgba(245, 158, 11, 1)", "rgba(16, 185, 129, 1)", "rgba(59, 130, 246, 1)"],
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <IndianRupee className="w-5 h-5 text-orange-600" />
          Salary Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
