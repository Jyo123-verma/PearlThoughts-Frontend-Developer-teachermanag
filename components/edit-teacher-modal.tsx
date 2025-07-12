"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { availableSubjects, availableClasses, teachers, updateTeacher } from "@/lib/data"
import { X, Plus, User, Mail, Phone, MapPin, GraduationCap, IndianRupee, Edit } from "lucide-react"

interface EditTeacherModalProps {
  open: boolean
  onClose: () => void
  teacherId: string | null
}

export function EditTeacherModal({ open, onClose, teacherId }: EditTeacherModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    experience: "",
    salary: "",
    qualification: "",
    status: "active",
    subjects: [] as string[],
    assignedClasses: [] as string[],
    street: "",
    city: "",
    state: "",
    pincode: "",
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",
  })

  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedClass, setSelectedClass] = useState("")

  useEffect(() => {
    if (teacherId && open) {
      const teacher = teachers.find((t) => t.id === teacherId)
      if (teacher) {
        setFormData({
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
          birthDate: teacher.birthDate,
          experience: teacher.experience.toString(),
          salary: teacher.salary.toString(),
          qualification: teacher.qualification,
          status: teacher.status,
          subjects: teacher.subject,
          assignedClasses: teacher.assignedClasses,
          street: teacher.address.street,
          city: teacher.address.city,
          state: teacher.address.state,
          pincode: teacher.address.pincode,
          emergencyName: teacher.emergencyContact.name,
          emergencyRelation: teacher.emergencyContact.relation,
          emergencyPhone: teacher.emergencyContact.phone,
        })
      }
    }
  }, [teacherId, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!teacherId) return

    const updates = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      subject: formData.subjects,
      experience: Number.parseInt(formData.experience),
      status: formData.status as "active" | "inactive" | "on-leave",
      salary: Number.parseInt(formData.salary),
      qualification: formData.qualification,
      assignedClasses: formData.assignedClasses,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        country: "India",
      },
      emergencyContact: {
        name: formData.emergencyName,
        relation: formData.emergencyRelation,
        phone: formData.emergencyPhone,
      },
    }

    updateTeacher(teacherId, updates)
    onClose()
  }

  const addSubject = () => {
    if (selectedSubject && !formData.subjects.includes(selectedSubject)) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, selectedSubject],
      }))
      setSelectedSubject("")
    }
  }

  const removeSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s !== subject),
    }))
  }

  const addClass = () => {
    if (selectedClass && !formData.assignedClasses.includes(selectedClass)) {
      setFormData((prev) => ({
        ...prev,
        assignedClasses: [...prev.assignedClasses, selectedClass],
      }))
      setSelectedClass("")
    }
  }

  const removeClass = (className: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedClasses: prev.assignedClasses.filter((c) => c !== className),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Edit className="w-6 h-6 text-green-600" />
            Edit Teacher
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address *
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="pl-10 bg-white border-slate-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Phone Number *
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                    className="pl-10 bg-white border-slate-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate" className="text-sm font-medium text-slate-700">
                  Birth Date *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>

              <div>
                <Label htmlFor="qualification" className="text-sm font-medium text-slate-700">
                  Qualification *
                </Label>
                <div className="relative mt-1">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="qualification"
                    value={formData.qualification}
                    onChange={(e) => setFormData((prev) => ({ ...prev, qualification: e.target.value }))}
                    required
                    className="pl-10 bg-white border-slate-300"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-slate-900">Professional Information</h3>
              </div>

              <div>
                <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                  Status *
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="mt-1 bg-white border-slate-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="on-leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="experience" className="text-sm font-medium text-slate-700">
                  Experience (Years) *
                </Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>

              <div>
                <Label htmlFor="salary" className="text-sm font-medium text-slate-700">
                  Monthly Salary (₹) *
                </Label>
                <div className="relative mt-1">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                    required
                    className="pl-10 bg-white border-slate-300"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Subjects *</Label>
                <div className="flex gap-2 mt-1">
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="flex-1 bg-white border-slate-300">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {availableSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={addSubject}
                    size="icon"
                    variant="outline"
                    className="border-slate-300 bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="flex items-center gap-1 bg-blue-100 text-blue-800"
                    >
                      {subject}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeSubject(subject)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-slate-700">Assigned Classes</Label>
                <div className="flex gap-2 mt-1">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="flex-1 bg-white border-slate-300">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {availableClasses.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={addClass}
                    size="icon"
                    variant="outline"
                    className="border-slate-300 bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.assignedClasses.map((className) => (
                    <Badge
                      key={className}
                      variant="outline"
                      className="flex items-center gap-1 bg-green-100 text-green-800 border-green-200"
                    >
                      {className}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeClass(className)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Address Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-slate-900">Address Information</h3>
              </div>

              <div>
                <Label htmlFor="street" className="text-sm font-medium text-slate-700">
                  Street Address *
                </Label>
                <Textarea
                  id="street"
                  value={formData.street}
                  onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                    required
                    className="mt-1 bg-white border-slate-300"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                    State *
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    required
                    className="mt-1 bg-white border-slate-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pincode" className="text-sm font-medium text-slate-700">
                  Pincode *
                </Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-slate-900">Emergency Contact</h3>
              </div>

              <div>
                <Label htmlFor="emergencyName" className="text-sm font-medium text-slate-700">
                  Contact Name *
                </Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emergencyName: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>

              <div>
                <Label htmlFor="emergencyRelation" className="text-sm font-medium text-slate-700">
                  Relation *
                </Label>
                <Input
                  id="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emergencyRelation: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone" className="text-sm font-medium text-slate-700">
                  Contact Phone *
                </Label>
                <Input
                  id="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                  required
                  className="mt-1 bg-white border-slate-300"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={onClose} className="border-slate-300 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              Update Teacher
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
