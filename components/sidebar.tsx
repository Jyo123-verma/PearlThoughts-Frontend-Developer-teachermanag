"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Users, Calendar, GraduationCap, Settings, LogOut, BookOpen, BarChart3 } from "lucide-react"
import { getTeacherStats } from "@/lib/data"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: "dashboard" | "teachers" | "schedules" | "qualifications" | "analytics") => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { id: "teachers", label: "Teachers", icon: Users, badge: "8" },
  { id: "schedules", label: "Schedules", icon: Calendar, badge: null },
  { id: "qualifications", label: "Qualifications", icon: GraduationCap, badge: "16" },
  { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
]

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const stats = getTeacherStats()

  return (
    <div className="h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TeachTrack Pro
            </h1>
            <p className="text-xs text-slate-400 font-medium">Teacher Management System</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-slate-700/50">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">{stats.activeTeachers}</div>
            <div className="text-xs text-slate-400">Active</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">{stats.totalClasses}</div>
            <div className="text-xs text-slate-400">Classes</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start text-left h-12 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
                onClick={() => setActiveTab(item.id as any)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto bg-slate-700 text-slate-200 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700/50 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 h-11 rounded-xl"
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 h-11 rounded-xl"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </div>
  )
}
