import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, AlertTriangle, Users } from 'lucide-react'
import { KPIData } from '@/data/mockData'
import { formatCurrency, formatPercentage } from '@/lib/utils'

interface KPITilesProps {
  kpis: KPIData
  darkMode?: boolean
}

export function KPITiles({ kpis, darkMode = false }: KPITilesProps) {
  const tiles = [
    {
      title: "Healthy Accounts",
      value: formatPercentage(kpis.healthyPercentage),
      subtitle: "Health Score ≥ 75",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "At-Risk Accounts",
      value: formatPercentage(kpis.atRiskPercentage),
      subtitle: "Health Score < 60",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "ARR at Risk",
      value: formatCurrency(kpis.totalARRAtRisk),
      subtitle: `From ${Math.round(kpis.atRiskPercentage)}% of accounts`,
      icon: TrendingDown,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Average NPS",
      value: Math.round(kpis.avgNPS).toString(),
      subtitle: `Across ${kpis.totalAccounts} accounts`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiles.map((tile) => {
        const Icon = tile.icon
        return (
          <Card 
            key={tile.title} 
            className={`hover:shadow-md transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:shadow-lg' 
                : 'bg-white border-gray-200 hover:shadow-md'
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {tile.title}
              </CardTitle>
              <div className={`${tile.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${tile.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                {tile.value}
              </div>
              <p className={`text-xs mt-1 transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {tile.subtitle}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}