import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, CheckCircle, Clock, Lightbulb } from 'lucide-react'
import { Account } from '@/data/mockData'

interface PlaybookRecommendationsProps {
  account: Account
}

export function PlaybookRecommendations({ account }: PlaybookRecommendationsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200'
      case 'active': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'suggested': return 'text-orange-600 bg-orange-50 border-orange-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'active': return <Clock className="h-4 w-4" />
      case 'suggested': return <Lightbulb className="h-4 w-4" />
      default: return <BookOpen className="h-4 w-4" />
    }
  }

  // Generate additional smart recommendations based on account health
  const smartRecommendations = []
  
  if (account.healthScore < 60) {
    smartRecommendations.push({
      id: 'emergency-call',
      name: 'Emergency Check-in Call',
      status: 'suggested' as const,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      priority: 'high'
    })
  }
  
  if (account.usage < 50) {
    smartRecommendations.push({
      id: 'usage-workshop',
      name: 'Product Adoption Workshop',
      status: 'suggested' as const,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      priority: 'high'
    })
  }
  
  if (account.supportTickets > 5) {
    smartRecommendations.push({
      id: 'support-review',
      name: 'Support Process Review',
      status: 'suggested' as const,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      priority: 'medium'
    })
  }

  const allPlaybooks = [...account.playbooks, ...smartRecommendations]
  const sortedPlaybooks = allPlaybooks.sort((a, b) => {
    const statusOrder = { 'suggested': 0, 'active': 1, 'completed': 2 }
    return statusOrder[a.status] - statusOrder[b.status] || a.dueDate.getTime() - b.dueDate.getTime()
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Playbook Recommendations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPlaybooks.map((playbook) => {
            const isSmartRecommendation = smartRecommendations.some(sr => sr.id === playbook.id)
            
            return (
              <div 
                key={playbook.id} 
                className={`p-3 border rounded-lg ${
                  isSmartRecommendation ? 'border-orange-200 bg-orange-50/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-2">
                    <div className={`p-1 rounded-full ${getStatusColor(playbook.status)}`}>
                      {getStatusIcon(playbook.status)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {playbook.name}
                        {isSmartRecommendation && (
                          <span className="ml-2 text-xs text-orange-600 font-semibold">
                            AI SUGGESTED
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {playbook.dueDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(playbook.status)} variant="outline">
                    {playbook.status.toUpperCase()}
                  </Badge>
                </div>
                
                {playbook.status === 'suggested' && (
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs text-gray-600">
                      Dismiss
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        {/* Quick Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-orange-600">
                {allPlaybooks.filter(p => p.status === 'suggested').length}
              </div>
              <div className="text-xs text-gray-500">Suggested</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {allPlaybooks.filter(p => p.status === 'active').length}
              </div>
              <div className="text-xs text-gray-500">Active</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">
                {allPlaybooks.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-xs text-gray-500">Completed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}