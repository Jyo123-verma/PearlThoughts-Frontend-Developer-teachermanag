"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie } from "react-chartjs-2"
import { pieChartOptions } from "./chart-config"
import { teachers } from "@/lib/data"
import { BookOpen } from "lucide-react"

export function SubjectDistributionChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Subject Distribution</CardTitle>
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

  const subjects = [...new Set(teachers.flatMap((t) => t.subject))]
  const subjectCounts = subjects.map((subject) => teachers.filter((t) => t.subject.includes(subject)).length)

  const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6366f1",
  ]

  const chartData = {
    labels: subjects,
    datasets: [
      {
        data: subjectCounts,
        backgroundColor: colors.slice(0, subjects.length),
        borderColor: colors.slice(0, subjects.length).map((color) => color),
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Subject Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <Pie data={chartData} options={pieChartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
