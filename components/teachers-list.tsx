"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { teachers, deleteTeacher } from "@/lib/data"
import { Users, Search, Filter, Eye, Edit, Phone, Mail, MapPin, Calendar, Trash2, UserPlus } from "lucide-react"
import { AddTeacherModal } from "@/components/add-teacher-modal"
import { EditTeacherModal } from "@/components/edit-teacher-modal"

interface TeachersListProps {
  onSelectTeacher: (teacherId: string) => void
}

export function TeachersList({ onSelectTeacher }: TeachersListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [showAddTeacher, setShowAddTeacher] = useState(false)
  const [showEditTeacher, setShowEditTeacher] = useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null)

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || teacher.status === statusFilter
    const matchesSubject = subjectFilter === "all" || teacher.subject.includes(subjectFilter)

    return matchesSearch && matchesStatus && matchesSubject
  })

  const allSubjects = [...new Set(teachers.flatMap((t) => t.subject))]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleDeleteTeacher = (teacherId: string) => {
    setTeacherToDelete(teacherId)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (teacherToDelete) {
      deleteTeacher(teacherToDelete)
      setShowDeleteDialog(false)
      setTeacherToDelete(null)
    }
  }

  const handleEditTeacher = (teacherId: string) => {
    setSelectedTeacherId(teacherId)
    setShowEditTeacher(true)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teachers Management</h1>
          <p className="text-slate-600 mt-1">Manage all teaching staff and their information</p>
        </div>
        <Button
          onClick={() => setShowAddTeacher(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Teacher
        </Button>
      </div>

      <Card className="glass-effect border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="w-5 h-5 text-blue-600" />
              All Teachers ({filteredTeachers.length})
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-white border-slate-300"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-32 bg-white border-slate-300">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-white border-slate-300">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {allSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="card-hover border border-slate-200 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                        {getInitials(teacher.name)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{teacher.name}</h3>
                        <p className="text-sm text-slate-600">{teacher.staffId}</p>
                      </div>
                    </div>
                    <Badge
                      className={`text-xs ${teacher.status === "active" ? "status-active" : teacher.status === "on-leave" ? "status-on-leave" : "status-inactive"}`}
                    >
                      {teacher.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{teacher.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">
                        {teacher.address.city}, {teacher.address.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{teacher.experience} years experience</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.subject.slice(0, 2).map((subject) => (
                        <Badge
                          key={subject}
                          variant="outline"
                          className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {subject}
                        </Badge>
                      ))}
                      {teacher.subject.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                          +{teacher.subject.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-2">Assigned Classes:</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.assignedClasses.slice(0, 3).map((className) => (
                        <Badge
                          key={className}
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700 border-green-200"
                        >
                          {className}
                        </Badge>
                      ))}
                      {teacher.assignedClasses.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">
                          +{teacher.assignedClasses.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-blue-50 border-blue-200 text-blue-700"
                      onClick={() => onSelectTeacher(teacher.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-green-50 border-green-200 text-green-700"
                      onClick={() => handleEditTeacher(teacher.id)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent hover:bg-red-50 border-red-200 text-red-700"
                      onClick={() => handleDeleteTeacher(teacher.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Teachers Found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddTeacherModal open={showAddTeacher} onClose={() => setShowAddTeacher(false)} />

      <EditTeacherModal
        open={showEditTeacher}
        onClose={() => setShowEditTeacher(false)}
        teacherId={selectedTeacherId}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this teacher? This action cannot be undone and will remove all associated
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
