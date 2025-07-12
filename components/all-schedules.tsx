"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { teachers, scheduleEvents } from "@/lib/data"
import { Calendar, Clock, Users, Eye, Filter } from "lucide-react"

interface AllSchedulesProps {
  onSelectTeacher: (teacherId: string) => void
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function AllSchedules({ onSelectTeacher }: AllSchedulesProps) {
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [typeFilter, setTypeFilter] = useState("all")

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

  const getEventColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-green-100 border-green-300 text-green-800"
      case "meeting":
        return "bg-blue-100 border-blue-300 text-blue-800"
      case "exam":
        return "bg-orange-100 border-orange-300 text-orange-800"
      default:
        return "bg-slate-100 border-slate-300 text-slate-800"
    }
  }

  const dayEvents = scheduleEvents.filter((event) => {
    const matchesDay = event.day === selectedDay
    const matchesType = typeFilter === "all" || event.type === typeFilter
    return matchesDay && matchesType
  })

  const groupedEvents = dayEvents.reduce(
    (acc, event) => {
      const teacher = teachers.find((t) => t.id === event.teacherId)
      if (teacher) {
        if (!acc[teacher.id]) {
          acc[teacher.id] = { teacher, events: [] }
        }
        acc[teacher.id].events.push(event)
      }
      return acc
    },
    {} as Record<string, { teacher: any; events: any[] }>,
  )

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Schedule Management</h1>
          <p className="text-slate-600 mt-1">View and manage all teacher schedules</p>
        </div>
      </div>

      <Card className="glass-effect border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  onClick={() => setSelectedDay(day)}
                  className={
                    selectedDay === day ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "border-slate-300"
                  }
                >
                  {day}
                </Button>
              ))}
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full lg:w-40 bg-white border-slate-300">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="class">Classes</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="exam">Exams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.values(groupedEvents).map(({ teacher, events }) => (
          <Card key={teacher.id} className="glass-effect border-0 shadow-lg card-hover">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                    {getInitials(teacher.name)}
                  </div>
                  <div>
                    <CardTitle className="text-lg text-slate-900">{teacher.name}</CardTitle>
                    <p className="text-sm text-slate-600">{teacher.subject.join(", ")}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectTeacher(teacher.id)}
                  className="border-slate-300"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {events.length > 0 ? (
                  events
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((event) => (
                      <div key={event.id} className={`p-4 rounded-xl border-2 ${getEventColor(event.type)}`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{event.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {event.time} - {event.endTime}
                          </Badge>
                        </div>
                        {event.subject && <p className="text-sm opacity-75 mb-1">Subject: {event.subject}</p>}
                        {event.classroom && <p className="text-sm opacity-75 mb-1">Room: {event.classroom}</p>}
                        {event.students && (
                          <div className="flex items-center text-xs opacity-75">
                            <Users className="w-3 h-3 mr-1" />
                            {event.students} students
                          </div>
                        )}
                      </div>
                    ))
                ) : (
                  <p className="text-slate-500 text-center py-8">No events scheduled for {selectedDay}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(groupedEvents).length === 0 && (
        <Card className="glass-effect border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Schedules Found</h3>
            <p className="text-slate-600">No teachers have events scheduled for {selectedDay}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
