import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`
}

export function getDaysUntilRenewal(renewalDate: Date): number {
  const today = new Date()
  const renewal = new Date(renewalDate)
  const diffTime = renewal.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getRiskTier(healthScore: number, daysUntilRenewal: number): 'low' | 'medium' | 'high' {
  if (healthScore >= 80 && daysUntilRenewal > 90) return 'low'
  if (healthScore >= 60 && daysUntilRenewal > 30) return 'medium'
  return 'high'
}

export function getRiskColor(tier: 'low' | 'medium' | 'high'): string {
  switch (tier) {
    case 'low': return 'text-green-600 bg-green-50 border-green-200'
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'high': return 'text-red-600 bg-red-50 border-red-200'
  }
}