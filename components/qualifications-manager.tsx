"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { teachers, qualifications } from "@/lib/data"
import { GraduationCap, Users, IndianRupee, Eye } from "lucide-react"

interface QualificationsManagerProps {
  onSelectTeacher: (teacherId: string) => void
}

export function QualificationsManager({ onSelectTeacher }: QualificationsManagerProps) {
  const getTeacherName = (teacherId: string) => {
    return teachers.find((t) => t.id === teacherId)?.name || "Unknown"
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const privateQualifications = qualifications.filter((q) => q.type === "private")
  const groupQualifications = qualifications.filter((q) => q.type === "group")

  const totalQualifications = qualifications.length
  const avgRate = Math.round(qualifications.reduce((sum, q) => sum + q.rate, 0) / qualifications.length)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Qualifications Management</h1>
          <p className="text-slate-600 mt-1">View and manage all teacher qualifications and rates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-effect border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Private Qualifications</p>
                <p className="text-3xl font-bold text-slate-900">{privateQualifications.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">Group Qualifications</p>
                <p className="text-3xl font-bold text-slate-900">{groupQualifications.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Average Rate</p>
                <p className="text-3xl font-bold text-slate-900">₹{avgRate}</p>
                <p className="text-xs text-slate-500">per hour</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Private Qualifications ({privateQualifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-semibold text-slate-700">Teacher</TableHead>
                    <TableHead className="font-semibold text-slate-700">Qualification</TableHead>
                    <TableHead className="font-semibold text-slate-700">Subject</TableHead>
                    <TableHead className="font-semibold text-slate-700">Level</TableHead>
                    <TableHead className="font-semibold text-slate-700">Rate (₹/hr)</TableHead>
                    <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {privateQualifications.map((qualification) => {
                    const teacher = teachers.find((t) => t.id === qualification.teacherId)
                    return (
                      <TableRow key={qualification.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                              {teacher ? getInitials(teacher.name) : "?"}
                            </div>
                            <span className="font-medium text-slate-900">
                              {getTeacherName(qualification.teacherId)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">{qualification.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {qualification.subject}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                            {qualification.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {qualification.rate}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{qualification.duration} min</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectTeacher(qualification.teacherId)}
                            className="border-slate-300 hover:bg-slate-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-slate-200/50">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="w-5 h-5 text-green-600" />
              Group Qualifications ({groupQualifications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead className="font-semibold text-slate-700">Teacher</TableHead>
                    <TableHead className="font-semibold text-slate-700">Qualification</TableHead>
                    <TableHead className="font-semibold text-slate-700">Subject</TableHead>
                    <TableHead className="font-semibold text-slate-700">Level</TableHead>
                    <TableHead className="font-semibold text-slate-700">Rate (₹/hr)</TableHead>
                    <TableHead className="font-semibold text-slate-700">Duration</TableHead>
                    <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupQualifications.map((qualification) => {
                    const teacher = teachers.find((t) => t.id === qualification.teacherId)
                    return (
                      <TableRow key={qualification.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                              {teacher ? getInitials(teacher.name) : "?"}
                            </div>
                            <span className="font-medium text-slate-900">
                              {getTeacherName(qualification.teacherId)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">{qualification.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {qualification.subject}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                            {qualification.level}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {qualification.rate}
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{qualification.duration} min</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectTeacher(qualification.teacherId)}
                            className="border-slate-300 hover:bg-slate-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
