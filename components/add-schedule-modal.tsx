"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { teachers, classRooms, availableClasses, availableSubjects, addScheduleEvent } from "@/lib/data"

interface AddScheduleModalProps {
  open: boolean
  onClose: () => void
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const eventTypes = [
  { value: "class", label: "Class" },
  { value: "meeting", label: "Meeting" },
  { value: "exam", label: "Exam" },
  { value: "break", label: "Break" },
]

export function AddScheduleModal({ open, onClose }: AddScheduleModalProps) {
  const [formData, setFormData] = useState({
    teacherId: "",
    title: "",
    time: "",
    endTime: "",
    day: "",
    type: "",
    subject: "",
    classroom: "",
    grade: "",
    students: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const duration = calculateDuration(formData.time, formData.endTime)

    const newEvent = {
      teacherId: formData.teacherId,
      title: formData.title,
      time: formData.time,
      endTime: formData.endTime,
      duration,
      type: formData.type as "class" | "meeting" | "exam" | "break",
      subject: formData.subject || undefined,
      students: formData.students ? Number.parseInt(formData.students) : undefined,
      day: formData.day,
      classroom: formData.classroom || undefined,
      grade: formData.grade || undefined,
    }

    addScheduleEvent(newEvent)
    onClose()

    // Reset form
    setFormData({
      teacherId: "",
      title: "",
      time: "",
      endTime: "",
      day: "",
      type: "",
      subject: "",
      classroom: "",
      grade: "",
      students: "",
    })
  }

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01T${startTime}:00`)
    const end = new Date(`2000-01-01T${endTime}:00`)
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60))
  }

  const selectedTeacher = teachers.find((t) => t.id === formData.teacherId)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Add New Schedule Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Event Details</h3>

              <div>
                <Label htmlFor="teacher">Teacher *</Label>
                <Select
                  value={formData.teacherId}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, teacherId: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.subject.join(", ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Mathematics - Class 12A"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="type">Event Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="day">Day *</Label>
                <Select
                  value={formData.day}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, day: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTeacher
                      ? selectedTeacher.subject.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))
                      : availableSubjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="classroom">Classroom</Label>
                <Select
                  value={formData.classroom}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, classroom: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    {classRooms.map((room) => (
                      <SelectItem key={room.id} value={room.name}>
                        {room.name} ({room.type}) - {room.capacity} capacity
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="grade">Grade/Class</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTeacher
                      ? selectedTeacher.assignedClasses.map((className) => (
                          <SelectItem key={className} value={className}>
                            {className}
                          </SelectItem>
                        ))
                      : availableClasses.map((className) => (
                          <SelectItem key={className} value={className}>
                            {className}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="students">Number of Students</Label>
                <Input
                  id="students"
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData((prev) => ({ ...prev, students: e.target.value }))}
                  placeholder="e.g., 35"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Add Schedule Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
