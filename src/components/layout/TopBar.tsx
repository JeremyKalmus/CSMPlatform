import React from 'react'
import { Search, Bell, User, Sun, Moon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TopBarProps {
  darkMode: boolean
  onToggleDarkMode: () => void
}

export function TopBar({ darkMode, onToggleDarkMode }: TopBarProps) {
  return (
    <div className={`h-16 border-b flex items-center justify-between px-6 transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center space-x-4">
        <div className="relative w-96">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`} />
          <Input 
            placeholder="Search accounts, playbooks, or reports..." 
            className={`pl-10 transition-colors duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className={`transition-colors duration-200 ${
            darkMode 
              ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={`relative transition-colors duration-200 ${
            darkMode 
              ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className={`text-sm font-medium transition-colors duration-200 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Sarah Johnson
            </p>
            <p className={`text-xs transition-colors duration-200 ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>
              Senior CSM
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-200 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}