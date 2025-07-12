"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getTeacherStats, getAttendanceStats, teachers, scheduleEvents } from "@/lib/data"
import { Users, Calendar, TrendingUp, Clock, IndianRupee, UserCheck, UserPlus, BarChart3 } from "lucide-react"
import { AttendanceChart } from "@/components/charts/attendance-chart"
import { AddTeacherModal } from "@/components/add-teacher-modal"
import { useState } from "react"

interface DashboardProps {
  onSelectTeacher: (teacherId: string) => void
}

export function Dashboard({ onSelectTeacher }: DashboardProps) {
  const [showAddTeacher, setShowAddTeacher] = useState(false)
  const stats = getTeacherStats()
  const attendanceStats = getAttendanceStats()

  const todayClasses = scheduleEvents.filter((event) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" })
    return event.day === today && event.type === "class"
  })

  const recentTeachers = teachers.slice(0, 4)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Management Dashboard</h1>
          <p className="text-slate-600 text-lg">Comprehensive overview of your educational institution</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowAddTeacher(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Teacher
          </Button>
          <Button variant="outline" className="border-slate-300 hover:bg-slate-50 bg-transparent">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Teachers</p>
                <p className="text-3xl font-bold text-slate-900">{stats.totalTeachers}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  <p className="text-xs text-emerald-600 font-medium">{stats.activeTeachers} Active</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 bg-blue-50 rounded-lg p-2">
              <div className="flex justify-between text-xs">
                <span className="text-blue-600">Active: {stats.activeTeachers}</span>
                <span className="text-red-600">On Leave: {stats.onLeave}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Attendance Rate</p>
                <p className="text-3xl font-bold text-slate-900">{attendanceStats.attendanceRate}%</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-xs text-green-600 font-medium">This Week</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 bg-green-50 rounded-lg p-2">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">Present: {attendanceStats.presentCount}</span>
                <span className="text-red-600">Absent: {attendanceStats.absentCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Total Classes</p>
                <p className="text-3xl font-bold text-slate-900">{stats.totalClasses}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-xs text-purple-600 font-medium">{todayClasses.length} Today</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 bg-purple-50 rounded-lg p-2">
              <div className="flex justify-between text-xs">
                <span className="text-purple-600">Weekly: {stats.totalClasses}</span>
                <span className="text-blue-600">Students: {stats.totalStudents}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover glass-effect border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">Avg Salary</p>
                <p className="text-3xl font-bold text-slate-900">₹{(stats.avgSalary / 1000).toFixed(0)}K</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <p className="text-xs text-orange-600 font-medium">Per Month</p>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 bg-orange-50 rounded-lg p-2">
              <div className="flex justify-between text-xs">
                <span className="text-orange-600">Range: ₹50K-₹95K</span>
                <span className="text-green-600">Avg Exp: {stats.avgExperience}y</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>

        <div>
          <Card className="glass-effect border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <UserCheck className="w-5 h-5 text-green-600" />
                Recent Teachers
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentTeachers.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-center justify-between p-3 hover:bg-slate-50/50 rounded-lg transition-colors cursor-pointer"
                    onClick={() => onSelectTeacher(teacher.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 text-sm">{teacher.name}</h4>
                        <p className="text-xs text-slate-600">{teacher.subject[0]}</p>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs ${teacher.status === "active" ? "status-active" : teacher.status === "on-leave" ? "status-on-leave" : "status-inactive"}`}
                    >
                      {teacher.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Clock className="w-5 h-5 text-blue-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {todayClasses.length > 0 ? (
                todayClasses.slice(0, 6).map((event) => {
                  const teacher = teachers.find((t) => t.id === event.teacherId)
                  return (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 hover:bg-slate-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{event.title}</h4>
                          <p className="text-sm text-slate-600">
                            {teacher?.name} • {event.classroom}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {event.time} - {event.endTime}
                        </Badge>
                        <p className="text-xs text-slate-500 mt-1">{event.students} students</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600">No classes scheduled for today</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50/50 rounded-lg">
                <span className="text-slate-700 font-medium">Present Today</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">{attendanceStats.presentCount}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50/50 rounded-lg">
                <span className="text-slate-700 font-medium">Absent Today</span>
                <Badge className="bg-red-100 text-red-800 border-red-200">{attendanceStats.absentCount}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50/50 rounded-lg">
                <span className="text-slate-700 font-medium">Late Arrivals</span>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{attendanceStats.lateCount}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50/50 rounded-lg">
                <span className="text-slate-700 font-medium">On Leave</span>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">{stats.onLeave}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50/50 rounded-lg">
                <span className="text-slate-700 font-medium">Total Subjects</span>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">{stats.subjects}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddTeacherModal open={showAddTeacher} onClose={() => setShowAddTeacher(false)} />
    </div>
  )
}
