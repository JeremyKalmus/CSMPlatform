import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Account } from '@/data/mockData'
import { formatCurrency, getDaysUntilRenewal, getRiskTier, getRiskColor } from '@/lib/utils'

interface AccountsLeaderboardProps {
  accounts: Account[]
  onAccountSelect: (account: Account) => void
}

interface AccountsLeaderboardProps {
  accounts: Account[]
  onAccountSelect: (account: Account) => void
  darkMode?: boolean
}

export function AccountsLeaderboard({ accounts, onAccountSelect, darkMode = false }: AccountsLeaderboardProps) {
  const sortedAccounts = [...accounts]
    .sort((a, b) => b.arr - a.arr)
    .slice(0, 10)

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
          Top Accounts by ARR
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Fixed height container with scroll - KEY CHANGE for scrollable accounts */}
        <div className="h-96 overflow-y-auto px-6 pb-6">
          <div className="space-y-4 pt-6">
          {sortedAccounts.map((account) => {
            const daysUntilRenewal = getDaysUntilRenewal(account.renewalDate)
            const riskTier = getRiskTier(account.healthScore, daysUntilRenewal)
            
            return (
              <div
                key={account.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  darkMode 
                    ? 'border-gray-600 hover:bg-gray-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => onAccountSelect(account)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <p className={`text-sm font-medium truncate transition-colors duration-200 ${
                        darkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {account.name}
                      </p>
                      <p className={`text-xs transition-colors duration-200 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {account.industry} • {account.region}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium transition-colors duration-200 ${
                        darkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>{formatCurrency(account.arr)}</p>
                      <p className={`text-xs transition-colors duration-200 ${
                        darkMode ? 'text-gray-300' : 'text-gray-500'
                      }`}>ARR</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 ml-4">
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      account.healthScore >= 75 ? 'bg-green-100' :
                      account.healthScore >= 60 ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        account.healthScore >= 75 ? 'text-green-700' :
                        account.healthScore >= 60 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {Math.round(account.healthScore)}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 transition-colors duration-200 ${
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Health</p>
                  </div>
                  
                  <Badge className={getRiskColor(riskTier)}>
                    {riskTier.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}