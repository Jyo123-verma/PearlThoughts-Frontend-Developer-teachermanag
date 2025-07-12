"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getTeacherStats, getAttendanceStats, teachers, qualifications } from "@/lib/data"
import { Users, GraduationCap, Clock, Target, Award, BookOpen, Download, Filter } from "lucide-react"

// Import all chart components
import { PerformanceChart } from "@/components/charts/performance-chart"
import { SubjectDistributionChart } from "@/components/charts/subject-distribution-chart"
import { WorkloadChart } from "@/components/charts/workload-chart"
import { SalaryChart } from "@/components/charts/salary-chart"

export function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false)
  const [timeRange, setTimeRange] = useState("month")
  const [stats, setStats] = useState<any>(null)
  const [attendanceStats, setAttendanceStats] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    setStats(getTeacherStats())
    setAttendanceStats(getAttendanceStats())
  }, [])

  if (!mounted || !stats || !attendanceStats) {
    return (
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600 text-lg">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 bg-white border-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-300 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Teacher Efficiency</p>
                <p className="text-3xl font-bold text-slate-900">94.2%</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-xs text-green-600 font-medium">+2.1% from last month</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Student Satisfaction</p>
                <p className="text-3xl font-bold text-slate-900">4.7/5</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <p className="text-xs text-blue-600 font-medium">Based on 245 reviews</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Avg Class Size</p>
                <p className="text-3xl font-bold text-slate-900">32</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-xs text-purple-600 font-medium">Students per class</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Teaching Hours</p>
                <p className="text-3xl font-bold text-slate-900">1,248</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <p className="text-xs text-orange-600 font-medium">This month</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 gap-8">
        <PerformanceChart />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SubjectDistributionChart />
        <WorkloadChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SalaryChart />

        {/* Experience Distribution */}
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <GraduationCap className="w-5 h-5 text-green-600" />
              Experience Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { range: "0-5 years", count: teachers.filter((t) => t.experience <= 5).length, color: "bg-blue-500" },
                {
                  range: "6-10 years",
                  count: teachers.filter((t) => t.experience > 5 && t.experience <= 10).length,
                  color: "bg-green-500",
                },
                {
                  range: "11-15 years",
                  count: teachers.filter((t) => t.experience > 10 && t.experience <= 15).length,
                  color: "bg-yellow-500",
                },
                { range: "15+ years", count: teachers.filter((t) => t.experience > 15).length, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="font-medium text-slate-700">{item.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">{item.count}</span>
                    <span className="text-sm text-slate-500">teachers</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200/50">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {teachers.slice(0, 5).map((teacher, index) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{teacher.name}</p>
                      <p className="text-xs text-slate-600">{teacher.subject[0]}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">{95 - index * 2}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200/50">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-slate-900 text-sm">Best Teacher Award</p>
                  <p className="text-xs text-slate-600">Dr. Priya Sharma</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-slate-900 text-sm">100% Attendance</p>
                  <p className="text-xs text-slate-600">Prof. Rajesh Kumar</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-slate-900 text-sm">Innovation in Teaching</p>
                  <p className="text-xs text-slate-600">Mrs. Anita Patel</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-slate-900 text-sm">Student Favorite</p>
                  <p className="text-xs text-slate-600">Mr. Vikram Singh</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-slate-200/50">
            <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-slate-700 font-medium text-sm">Avg Experience</span>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">{stats.avgExperience} years</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-slate-700 font-medium text-sm">Total Subjects</span>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">{stats.subjects}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-slate-700 font-medium text-sm">Qualifications</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">{qualifications.length}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-slate-700 font-medium text-sm">Avg Salary</span>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  ₹{(stats.avgSalary / 1000).toFixed(0)}K
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-slate-700 font-medium text-sm">On Leave</span>
                <Badge className="bg-red-100 text-red-800 border-red-200">{stats.onLeave}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
