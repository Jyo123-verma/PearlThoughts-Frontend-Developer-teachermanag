"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from "react-chartjs-2"
import { chartOptions } from "./chart-config"
import { teachers, scheduleEvents } from "@/lib/data"
import { Calendar } from "lucide-react"

export function WorkloadChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Teacher Workload</CardTitle>
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

  const workloadData = teachers.slice(0, 8).map((teacher) => {
    const teacherClasses = scheduleEvents.filter((e) => e.teacherId === teacher.id && e.type === "class")
    return {
      name: teacher.name.split(" ")[0],
      classes: teacher.assignedClasses.length,
      hours: teacherClasses.reduce((sum, e) => sum + e.duration, 0) / 60,
      students: teacherClasses.reduce((sum, e) => sum + (e.students || 0), 0),
    }
  })

  const chartData = {
    labels: workloadData.map((d) => d.name),
    datasets: [
      {
        label: "Classes Assigned",
        data: workloadData.map((d) => d.classes),
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Teaching Hours/Week",
        data: workloadData.map((d) => Math.round(d.hours)),
        backgroundColor: "rgba(245, 158, 11, 0.8)",
        borderColor: "rgba(245, 158, 11, 1)",
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
          <Calendar className="w-5 h-5 text-purple-600" />
          Teacher Workload Analysis
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
