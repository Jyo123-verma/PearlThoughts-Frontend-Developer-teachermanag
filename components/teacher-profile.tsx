"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { teachers, scheduleEvents, qualifications, paymentTransactions } from "@/lib/data"
import { Edit, ArrowLeft, Mail, Phone, MapPin, Calendar, User, GraduationCap, IndianRupee, Clock, History } from 'lucide-react'
import { SalaryPaymentModal } from "@/components/salary-payment-modal"

interface TeacherProfileProps {
  teacherId: string | null
  onBack: () => void
}

export function TeacherProfile({ teacherId, onBack }: TeacherProfileProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const teacher = teachers.find((t) => t.id === teacherId)
  const teacherSchedule = scheduleEvents.filter((e) => e.teacherId === teacherId)
  const teacherQualifications = qualifications.filter((q) => q.teacherId === teacherId)
  const teacherPayments = paymentTransactions
    .filter((p) => p.teacherId === teacherId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (!teacher) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Teacher not found</p>
        <Button onClick={onBack} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "qualifications", label: "Qualifications" },
    { id: "payments", label: "Payment History" },
  ]

  const getPaymentStatusColor = (status: "success" | "failed" | "pending") => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="border-slate-300 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Teachers
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{teacher.name}</h1>
            <p className="text-slate-600 mt-1">{teacher.subject.join(", ")} Teacher</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            onClick={() => setShowPaymentModal(true)}
          >
            <IndianRupee className="w-4 h-4 mr-2" />
            Pay Now
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="glass-effect border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
                {getInitials(teacher.name)}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{teacher.name}</h2>
              <Badge
                className={`mb-4 ${teacher.status === "active" ? "status-active" : teacher.status === "on-leave" ? "status-on-leave" : "status-inactive"}`}
              >
                {teacher.status}
              </Badge>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <User className="w-4 h-4" />
                  <span>{teacher.staffId}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{teacher.experience} years exp.</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-600">
                  <IndianRupee className="w-4 h-4" />
                  <span>₹{(teacher.salary / 1000).toFixed(0)}K/month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 shadow-lg mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Classes This Week</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {teacherSchedule.filter((e) => e.type === "class").length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Students</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {teacherSchedule.reduce((sum, e) => sum + (e.students || 0), 0)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Qualifications</span>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {teacherQualifications.length}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "outline"}
                onClick={() => setActiveSection(section.id)}
                className={
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "border-slate-300"
                }
              >
                {section.label}
              </Button>
            ))}
          </div>

          {activeSection === "overview" && (
            <div className="space-y-6">
              <Card className="glass-effect border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <p className="text-slate-900 font-medium mt-1">{teacher.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Staff ID</label>
                      <p className="text-slate-900 font-medium mt-1">{teacher.staffId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Qualification</label>
                      <p className="text-slate-900 font-medium mt-1">{teacher.qualification}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Birth Date</label>
                      <p className="text-slate-900 font-medium mt-1">
                        {new Date(teacher.birthDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <p className="text-slate-900 font-medium">{teacher.email}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700">Phone Number</label>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <p className="text-slate-900 font-medium">{teacher.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Address Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-slate-900 font-medium">{teacher.address.street}</p>
                    <p className="text-slate-900 font-medium">
                      {teacher.address.city}, {teacher.address.state} - {teacher.address.pincode}
                    </p>
                    <p className="text-slate-900 font-medium">{teacher.address.country}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "schedule" && (
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {teacherSchedule.length > 0 ? (
                    teacherSchedule.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200/50"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${event.type === "class" ? "bg-green-500" : event.type === "meeting" ? "bg-blue-500" : "bg-orange-500"}`}
                          ></div>
                          <div>
                            <h4 className="font-semibold text-slate-900">{event.title}</h4>
                            <p className="text-sm text-slate-600">
                              {event.day} • {event.classroom}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {event.time} - {event.endTime}
                          </Badge>
                          {event.students && <p className="text-xs text-slate-500 mt-1">{event.students} students</p>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600">No schedule found for this teacher</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "qualifications" && (
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Teaching Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {teacherQualifications.length > 0 ? (
                    teacherQualifications.map((qualification) => (
                      <div
                        key={qualification.id}
                        className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200/50"
                      >
                        <div>
                          <h4 className="font-semibold text-slate-900">{qualification.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {qualification.subject}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              {qualification.level}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                              {qualification.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                            <IndianRupee className="w-4 h-4" />
                            {qualification.rate}
                          </div>
                          <p className="text-xs text-slate-500">per hour</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600">No qualifications found for this teacher</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "payments" && (
            <Card className="glass-effect border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/50">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {teacherPayments.length > 0 ? (
                    teacherPayments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-200/50"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${payment.status === "success" ? "bg-green-500" : payment.status === "failed" ? "bg-red-500" : "bg-yellow-500"}`}
                          ></div>
                          <div>
                            <h4 className="font-semibold text-slate-900">Salary Payment</h4>
                            <p className="text-sm text-slate-600">{payment.remarks}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(payment.date).toLocaleDateString()} via {payment.upiId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                            <IndianRupee className="w-4 h-4" />
                            {payment.amount}
                          </div>
                          <Badge variant="outline" className={`text-xs ${getPaymentStatusColor(payment.status)}`}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <History className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600">No payment history found for this teacher</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {teacher && (
        <SalaryPaymentModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          teacher={teacher}
        />
      )}
    </div>
  )
}
