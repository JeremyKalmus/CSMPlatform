import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { Account } from '@/data/mockData'

interface TicketTimelineProps {
  account: Account
}

export function TicketTimeline({ account }: TicketTimelineProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <Clock className="h-4 w-4" />
      case 'low': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const sortedTickets = [...account.recentTickets].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTickets.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No recent support tickets</p>
            </div>
          ) : (
            sortedTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`p-1 rounded-full ${getSeverityColor(ticket.severity)}`}>
                  {getSeverityIcon(ticket.severity)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ticket.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {ticket.createdAt.toLocaleDateString()} • {ticket.id}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      <Badge className={getSeverityColor(ticket.severity)} variant="outline">
                        {ticket.severity.toUpperCase()}
                      </Badge>
                      <Badge variant={ticket.status === 'open' ? 'destructive' : 'secondary'}>
                        {ticket.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {account.recentTickets.filter(t => t.status === 'open').length}
              </div>
              <div className="text-xs text-gray-500">Open</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {account.recentTickets.filter(t => t.severity === 'high').length}
              </div>
              <div className="text-xs text-gray-500">High Priority</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">
                {Math.round((account.recentTickets.filter(t => t.status === 'closed').length / 
                  Math.max(account.recentTickets.length, 1)) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Resolution Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}