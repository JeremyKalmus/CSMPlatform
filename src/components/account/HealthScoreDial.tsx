import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Account } from '@/data/mockData'

interface HealthScoreDialProps {
  account: Account
}

export function HealthScoreDial({ account }: HealthScoreDialProps) {
  const healthScore = Math.round(account.healthScore)
  
  // Calculate component scores
  const npsScore = Math.round((account.nps + 100) / 2)
  const usageScore = Math.round(account.usage)
  const supportScore = Math.round(Math.max(0, 100 - (account.supportTickets * 10)))
  const billingScore = Math.round(account.billingHealth)

  // Data for the dial visualization
  const dialData = [
    { name: 'Score', value: healthScore, fill: getScoreColor(healthScore) },
    { name: 'Remaining', value: 100 - healthScore, fill: '#E5E7EB' }
  ]

  const componentData = [
    { name: 'NPS', score: npsScore, weight: '30%' },
    { name: 'Usage', score: usageScore, weight: '30%' },
    { name: 'Support', score: supportScore, weight: '20%' },
    { name: 'Billing', score: billingScore, weight: '20%' }
  ]

  function getScoreColor(score: number): string {
    if (score >= 75) return '#10B981' // green
    if (score >= 60) return '#F59E0B' // yellow
    return '#EF4444' // red
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main Dial */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-48 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dialData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {dialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Score Display */}
            <div className="absolute inset-0 flex items-end justify-center pb-4">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: getScoreColor(healthScore) }}>
                  {healthScore}
                </div>
                <div className="text-sm text-gray-500">Overall Health</div>
              </div>
            </div>
          </div>
        </div>

        {/* Component Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Component Scores</h4>
          {componentData.map((component) => (
            <div key={component.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{component.name}</span>
                <span className="text-xs text-gray-500">({component.weight})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${component.score}%`,
                      backgroundColor: getScoreColor(component.score)
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-8 text-right">{component.score}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}