import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Mail, Phone, AlertTriangle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Account } from '@/data/mockData'
import { formatCurrency, getDaysUntilRenewal, getRiskTier, getRiskColor } from '@/lib/utils'
import { HealthScoreDial } from './HealthScoreDial'
import { PlaybookRecommendations } from './PlaybookRecommendations'
import { TicketTimeline } from './TicketTimeline'

interface AccountDetailPageProps {
  account: Account
  onBack: () => void
}

export function AccountDetailPage({ account, onBack }: AccountDetailPageProps) {
  const daysUntilRenewal = getDaysUntilRenewal(account.renewalDate)
  const riskTier = getRiskTier(account.healthScore, daysUntilRenewal)

  // Custom tooltip for usage chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium">{`Date: ${label}`}</p>
          <p className="text-sm text-blue-600">
            {`Usage: ${Math.round(payload[0].value)}%`}
          </p>
          {data.anomaly && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Anomaly detected
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{account.name}</h1>
            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
              <span>{account.industry}</span>
              <span>•</span>
              <span>{account.region}</span>
              <span>•</span>
              <span>{formatCurrency(account.arr)} ARR</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge className={getRiskColor(riskTier)}>
            {riskTier.toUpperCase()} RISK
          </Badge>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule QBR
          </Button>
        </div>
      </div>

      {/* Key Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">CSM</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{account.csm}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Renewal Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{account.renewalDate.toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">{daysUntilRenewal} days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Executive Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{account.executiveContact}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{account.segment}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score Dial */}
        <div className="lg:col-span-1">
          <HealthScoreDial account={account} />
        </div>
        
        {/* Usage Trends */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={account.usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={(props) => {
                      const { payload } = props
                      if (payload?.anomaly) {
                        return <circle cx={props.cx} cy={props.cy} r={4} fill="#EF4444" stroke="#DC2626" strokeWidth={2} />
                      }
                      return <circle cx={props.cx} cy={props.cy} r={2} fill="#3B82F6" />
                    }}
                  />
                  <ReferenceLine y={50} stroke="#EF4444" strokeDasharray="5 5" label="Low Usage Threshold" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TicketTimeline account={account} />
        <PlaybookRecommendations account={account} />
      </div>
    </div>
  )
}