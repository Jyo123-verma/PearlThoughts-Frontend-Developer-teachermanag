"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { TeacherProfile } from "@/components/teacher-profile"
import { ScheduleManagement } from "@/components/schedule-management"
import { QualificationsManager } from "@/components/qualifications-manager"
import { TeachersList } from "@/components/teachers-list"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

type ActiveTab = "dashboard" | "teachers" | "schedules" | "qualifications" | "profile" | "analytics"

export default function TeacherManagement() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard")
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard
            onSelectTeacher={(id) => {
              setSelectedTeacherId(id)
              setActiveTab("profile")
            }}
          />
        )
      case "teachers":
        return (
          <TeachersList
            onSelectTeacher={(id) => {
              setSelectedTeacherId(id)
              setActiveTab("profile")
            }}
          />
        )
      case "profile":
        return <TeacherProfile teacherId={selectedTeacherId} onBack={() => setActiveTab("teachers")} />
      case "schedules":
        return (
          <ScheduleManagement
            onSelectTeacher={(id) => {
              setSelectedTeacherId(id)
              setActiveTab("profile")
            }}
          />
        )
      case "qualifications":
        return (
          <QualificationsManager
            onSelectTeacher={(id) => {
              setSelectedTeacherId(id)
              setActiveTab("profile")
            }}
          />
        )
      case "analytics":
        return <AnalyticsDashboard />
      default:
        return (
          <Dashboard
            onSelectTeacher={(id) => {
              setSelectedTeacherId(id)
              setActiveTab("profile")
            }}
          />
        )
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-300 ease-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden glass-effect border-b px-4 py-3 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-600 hover:bg-slate-100"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-slate-100">{renderContent()}</main>
      </div>
    </div>
  )
}
