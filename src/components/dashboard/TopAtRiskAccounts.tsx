import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react'
import { Account } from '@/data/mockData'
import { formatCurrency, getDaysUntilRenewal } from '@/lib/utils'

interface TopAtRiskAccountsProps {
  accounts: Account[]
  onAccountSelect: (account: Account) => void
}

interface TopAtRiskAccountsProps {
  accounts: Account[]
  onAccountSelect: (account: Account) => void
  darkMode?: boolean
}

export function TopAtRiskAccounts({ accounts, onAccountSelect, darkMode = false }: TopAtRiskAccountsProps) {
  const atRiskAccounts = accounts
    .filter(acc => acc.healthScore < 60)
    .sort((a, b) => b.arr - a.arr)
    .slice(0, 5)

  if (atRiskAccounts.length === 0) {
    return (
      <Card className={`transition-colors duration-200 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader>
          <CardTitle className={`flex items-center space-x-2 transition-colors duration-200 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            <AlertTriangle className="h-5 w-5 text-green-600" />
            <span>Top 5 At-Risk Accounts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎉</div>
            <p className={`text-lg font-medium mb-1 transition-colors duration-200 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>All accounts healthy!</p>
            <p className={`text-sm transition-colors duration-200 ${
              darkMode ? 'text-gray-300' : 'text-gray-500'
            }`}>Nothing at risk today</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`transition-colors duration-200 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <span>Top 5 At-Risk Accounts</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {atRiskAccounts.map((account) => {
            const daysUntilRenewal = getDaysUntilRenewal(account.renewalDate)
            
            return (
              <div
                key={account.id}
               className={`p-4 border rounded-lg transition-colors duration-200 ${
                 darkMode 
                   ? 'border-red-700 bg-red-900/20' 
                   : 'border-red-200 bg-red-50/50'
               }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                   <h4 className={`font-medium transition-colors duration-200 ${
                     darkMode ? 'text-gray-100' : 'text-gray-900'
                   }`}>{account.name}</h4>
                   <p className={`text-sm transition-colors duration-200 ${
                     darkMode ? 'text-gray-300' : 'text-gray-600'
                   }`}>{formatCurrency(account.arr)} ARR</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">
                      Health: {Math.round(account.healthScore)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                 <div className={`flex items-center space-x-4 text-sm transition-colors duration-200 ${
                   darkMode ? 'text-gray-300' : 'text-gray-600'
                 }`}>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{daysUntilRenewal} days to renewal</span>
                    </div>
                    <span>•</span>
                    <span>CSM: {account.csm}</span>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAccountSelect(account)}
                    className="flex items-center space-x-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}