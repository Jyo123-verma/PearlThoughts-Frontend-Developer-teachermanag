"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAttendanceStats } from "@/lib/data"
import { TrendingUp } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import recharts to avoid SSR issues
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false })
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false })

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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceStats.attendanceByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value, name) => [
                  name === "present" ? `${value} Present` : `${value}%`,
                  name === "present" ? "Teachers" : "Attendance Rate",
                ]}
              />
              <Bar dataKey="present" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} name="present" />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
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
