"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react"

interface ScheduleEvent {
  id: string
  title: string
  time: string
  duration: number
  type: "class" | "meeting" | "break"
  subject?: string
  students?: number
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const timeSlots = [
  "7:30am",
  "8:00am",
  "8:30am",
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
  "12:30pm",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
  "4:30pm",
  "5:00pm",
  "5:30pm",
  "6:00pm",
]

const sampleEvents: Record<string, ScheduleEvent[]> = {
  Tuesday: [
    { id: "1", title: "Mathematics", time: "9:00am", duration: 2, type: "class", subject: "Math", students: 25 },
  ],
  Wednesday: [
    { id: "2", title: "Physics Lab", time: "2:00pm", duration: 3, type: "class", subject: "Physics", students: 20 },
  ],
  Friday: [
    { id: "3", title: "Chemistry", time: "10:00am", duration: 2, type: "class", subject: "Chemistry", students: 22 },
  ],
  Saturday: [{ id: "4", title: "Staff Meeting", time: "9:00am", duration: 2, type: "meeting" }],
}

export function TeacherSchedule() {
  const [currentWeek, setCurrentWeek] = useState(0)

  const getEventColor = (type: string) => {
    switch (type) {
      case "class":
        return "bg-green-100 border-green-300 text-green-800"
      case "meeting":
        return "bg-blue-100 border-blue-300 text-blue-800"
      case "break":
        return "bg-gray-100 border-gray-300 text-gray-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getTimeSlotIndex = (time: string) => {
    return timeSlots.indexOf(time)
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-gray-600 mt-1">View and manage your weekly teaching schedule</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Week Navigation */}
      <Card className="mb-6 shadow-lg border-0">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek - 1)}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-lg">Week of January 8-14, 2024</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentWeek(currentWeek + 1)}>
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Grid */}
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Desktop View */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-8 border-b border-gray-200">
                  <div className="p-4 bg-gray-50 font-semibold text-center border-r border-gray-200">Time</div>
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="p-4 bg-gray-50 font-semibold text-center border-r border-gray-200 last:border-r-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {timeSlots.map((time, timeIndex) => (
                  <div key={time} className="grid grid-cols-8 border-b border-gray-100 hover:bg-gray-50">
                    <div className="p-3 text-sm text-gray-600 border-r border-gray-200 bg-gray-50 font-medium">
                      {time}
                    </div>
                    {daysOfWeek.map((day) => {
                      const dayEvents = sampleEvents[day] || []
                      const eventAtTime = dayEvents.find((event) => getTimeSlotIndex(event.time) === timeIndex)

                      return (
                        <div
                          key={`${day}-${time}`}
                          className="p-2 border-r border-gray-200 last:border-r-0 min-h-[60px] relative"
                        >
                          {eventAtTime && (
                            <div
                              className={`p-2 rounded-lg border-2 text-xs font-medium ${getEventColor(eventAtTime.type)}`}
                              style={{ height: `${eventAtTime.duration * 60}px` }}
                            >
                              <div className="font-semibold">{eventAtTime.title}</div>
                              {eventAtTime.subject && <div className="text-xs opacity-75">{eventAtTime.subject}</div>}
                              {eventAtTime.students && (
                                <div className="text-xs opacity-75">{eventAtTime.students} students</div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Mobile View */}
              <div className="lg:hidden">
                {daysOfWeek.map((day) => (
                  <div key={day} className="border-b border-gray-200">
                    <div className="p-4 bg-gray-50 font-semibold border-b border-gray-200">{day}</div>
                    <div className="p-4 space-y-3">
                      {sampleEvents[day]?.length > 0 ? (
                        sampleEvents[day].map((event) => (
                          <div key={event.id} className={`p-3 rounded-lg border-2 ${getEventColor(event.type)}`}>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{event.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {event.time}
                              </Badge>
                            </div>
                            {event.subject && <p className="text-sm opacity-75 mb-1">{event.subject}</p>}
                            {event.students && <p className="text-xs opacity-75">{event.students} students</p>}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm italic">No events scheduled</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">This Week</p>
                <p className="text-2xl font-bold text-green-900">12 Classes</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Students</p>
                <p className="text-2xl font-bold text-blue-900">67</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Teaching Hours</p>
                <p className="text-2xl font-bold text-purple-900">24h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
