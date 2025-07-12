"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAttendanceStats } from "@/lib/data"
import { TrendingUp } from "lucide-react"
import { Bar } from "react-chartjs-2"
import { chartOptions } from "./chart-config"

export function AttendanceChart() {
  const [mounted, setMounted] = useState(false)
  const [attendanceStats, setAttendanceStats] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    setAttendanceStats(getAttendanceStats())
  }, [])

  if (!mounted || !attendanceStats) {
    return (
      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Weekly Attendance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-48 mb-4"></div>
              <div className="h-64 bg-slate-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = {
    labels: attendanceStats.attendanceByDay.map((day: any) => day.day.slice(0, 3)),
    datasets: [
      {
        label: "Present Teachers",
        data: attendanceStats.attendanceByDay.map((day: any) => day.present),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: "Attendance Rate (%)",
        data: attendanceStats.attendanceByDay.map((day: any) => day.percentage),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
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
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Weekly Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-700">{attendanceStats.presentCount}</div>
            <div className="text-xs text-green-600">Present</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-700">{attendanceStats.absentCount}</div>
            <div className="text-xs text-red-600">Absent</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-700">{attendanceStats.lateCount}</div>
            <div className="text-xs text-yellow-600">Late</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-700">{attendanceStats.attendanceRate}%</div>
            <div className="text-xs text-blue-600">Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
