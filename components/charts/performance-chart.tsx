"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import { lineChartOptions } from "./chart-config"
import { TrendingUp } from "lucide-react"

export function PerformanceChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
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

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Teacher Performance",
        data: [85, 88, 92, 89, 94, 96],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Student Satisfaction",
        data: [82, 85, 88, 91, 93, 95],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Attendance Rate",
        data: [90, 87, 89, 92, 91, 94],
        borderColor: "rgba(245, 158, 11, 1)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <Card className="glass-effect border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Performance Trends (6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <Line data={performanceData} options={lineChartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
