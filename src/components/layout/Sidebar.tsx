import React from 'react'
import { 
  BarChart3, 
  Users, 
  Calendar, 
  BookOpen, 
  FileText, 
  Settings,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  darkMode?: boolean
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'accounts', label: 'Accounts', icon: Users },
  { id: 'renewals', label: 'Renewals', icon: Calendar },
  { id: 'playbooks', label: 'Playbooks', icon: BookOpen },
  { id: 'reports', label: 'Reports', icon: FileText },
]

export function Sidebar({ activeTab, onTabChange, darkMode = false }: SidebarProps) {
  return (
    <div className={`w-64 border-r h-screen flex flex-col transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Logo */}
      <div className={`p-6 border-b transition-colors duration-200 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xl font-bold transition-colors duration-200 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            CSM Platform
          </span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                activeTab === item.id 
                  ? darkMode
                    ? "bg-blue-900/60 text-blue-200 border-r-2 border-blue-400"
                    : "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : darkMode
                    ? "text-gray-200 hover:bg-gray-700 hover:text-gray-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
      
      {/* Settings */}
      <div className={`p-4 border-t transition-colors duration-200 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <button className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
          darkMode 
            ? 'text-gray-200 hover:bg-gray-700 hover:text-gray-100' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}>
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  )
}