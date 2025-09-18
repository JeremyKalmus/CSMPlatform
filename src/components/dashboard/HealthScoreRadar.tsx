import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { Account } from '@/data/mockData'

interface HealthScoreRadarProps {
  accounts: Account[]
}

interface HealthScoreRadarProps {
  accounts: Account[]
  darkMode?: boolean
}

export function HealthScoreRadar({ accounts, darkMode = false }: HealthScoreRadarProps) {
  // Calculate average scores across all accounts
  const data = [
    {
      subject: 'NPS Score',
      A: accounts.reduce((sum, acc) => sum + ((acc.nps + 100) / 2), 0) / accounts.length,
      fullMark: 100
    },
    {
      subject: 'Usage',
      A: accounts.reduce((sum, acc) => sum + acc.usage, 0) / accounts.length,
      fullMark: 100
    },
    {
      subject: 'Support Health',
      A: accounts.reduce((sum, acc) => sum + Math.max(0, 100 - (acc.supportTickets * 10)), 0) / accounts.length,
      fullMark: 100
    },
    {
      subject: 'Billing Health',
      A: accounts.reduce((sum, acc) => sum + acc.billingHealth, 0) / accounts.length,
      fullMark: 100
    }
  ]

  return (
    <Card className={`transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <CardHeader>
        <CardTitle className={`transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Composite Health Score Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis 
              dataKey="subject" 
              className="text-xs"
              tick={{ fill: darkMode ? '#D1D5DB' : '#374151', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              className="text-xs"
              tick={{ fill: darkMode ? '#D1D5DB' : '#374151', fontSize: 10 }}
            />
            <Radar
              name="Portfolio Average"
              dataKey="A"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>NPS Score:</span>
              <span className={`font-medium transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{Math.round(data[0].A)}/100</span>
            </div>
            <div className="flex justify-between">
              <span className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Usage:</span>
              <span className={`font-medium transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{Math.round(data[1].A)}%</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Support Health:</span>
              <span className={`font-medium transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{Math.round(data[2].A)}/100</span>
            </div>
            <div className="flex justify-between">
              <span className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Billing Health:</span>
              <span className={`font-medium transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>{Math.round(data[3].A)}/100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}