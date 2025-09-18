export interface Account {
  id: string
  name: string
  arr: number
  healthScore: number
  nps: number
  usage: number
  supportTickets: number
  billingHealth: number
  renewalDate: Date
  industry: string
  region: string
  segment: string
  csm: string
  executiveContact: string
  usageData: Array<{ date: string; value: number; anomaly?: boolean }>
  recentTickets: Array<{
    id: string
    title: string
    severity: 'low' | 'medium' | 'high'
    status: 'open' | 'closed'
    createdAt: Date
  }>
  playbooks: Array<{
    id: string
    name: string
    status: 'suggested' | 'active' | 'completed'
    dueDate: Date
  }>
}

export interface KPIData {
  healthyPercentage: number
  atRiskPercentage: number
  totalARRAtRisk: number
  avgNPS: number
  totalAccounts: number
  renewalsThisQuarter: number
}

// Generate mock usage data with anomalies
function generateUsageData(): Array<{ date: string; value: number; anomaly?: boolean }> {
  const data = []
  const baseUsage = 75 + Math.random() * 20
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    let value = baseUsage + (Math.random() - 0.5) * 10
    let anomaly = false
    
    // Add occasional anomalies
    if (Math.random() < 0.15) {
      value = value * (0.4 + Math.random() * 0.3) // Drop to 40-70% of normal
      anomaly = true
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.max(0, Math.min(100, value)),
      anomaly
    })
  }
  
  return data
}

// Generate mock support tickets
function generateTickets(): Array<{
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  status: 'open' | 'closed'
  createdAt: Date
}> {
  const tickets = []
  const severities: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high']
  const statuses: Array<'open' | 'closed'> = ['open', 'closed']
  const titles = [
    'Login issues with SSO',
    'Performance degradation',
    'Feature request: Export functionality',
    'API rate limiting concerns',
    'Dashboard loading slowly',
    'Integration setup help needed',
    'Billing discrepancy',
    'User permission problems'
  ]
  
  for (let i = 0; i < Math.floor(Math.random() * 8) + 2; i++) {
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 60))
    
    tickets.push({
      id: `TICK-${Math.floor(Math.random() * 10000)}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt
    })
  }
  
  return tickets
}

// Generate mock playbooks
function generatePlaybooks(): Array<{
  id: string
  name: string
  status: 'suggested' | 'active' | 'completed'
  dueDate: Date
}> {
  const playbooks = []
  const playbookNames = [
    'Quarterly Business Review',
    'Executive Check-in',
    'Usage Optimization Workshop',
    'Renewal Discussion',
    'Feature Adoption Training',
    'Success Planning Session',
    'Risk Mitigation Call',
    'Expansion Opportunity Review'
  ]
  const statuses: Array<'suggested' | 'active' | 'completed'> = ['suggested', 'active', 'completed']
  
  for (let i = 0; i < Math.floor(Math.random() * 4) + 1; i++) {
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 30) + 5)
    
    playbooks.push({
      id: `PB-${Math.floor(Math.random() * 10000)}`,
      name: playbookNames[Math.floor(Math.random() * playbookNames.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      dueDate
    })
  }
  
  return playbooks
}

// Calculate health score based on multiple factors
function calculateHealthScore(nps: number, usage: number, supportTickets: number, billingHealth: number): number {
  const npsScore = (nps + 100) / 2 // Convert -100 to 100 scale to 0-100
  const usageScore = usage
  const ticketScore = Math.max(0, 100 - (supportTickets * 10)) // More tickets = lower score
  const billingScore = billingHealth
  
  // Weighted average
  const healthScore = (npsScore * 0.3) + (usageScore * 0.3) + (ticketScore * 0.2) + (billingScore * 0.2)
  return Math.max(0, Math.min(100, healthScore))
}

// Generate mock accounts
export function generateMockAccounts(count: number = 50): Account[] {
  const accounts: Account[] = []
  const companies = [
    'TechCorp', 'GlobalSoft', 'DataDyne', 'CloudFirst', 'InnovateLabs',
    'DigitalEdge', 'SmartSystems', 'FutureWorks', 'NextGenTech', 'ProActive Solutions',
    'StreamlineInc', 'VelocityGroup', 'PivotPoint', 'ScaleUp Enterprises', 'ModernStack',
    'AgileFlow', 'ConnectCore', 'BrightPath', 'OptimalTech', 'FlexiSoft'
  ]
  
  const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education']
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America']
  const segments = ['Enterprise', 'Mid-Market', 'SMB']
  const csms = ['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Jessica Taylor']
  
  for (let i = 0; i < count; i++) {
    const nps = Math.floor(Math.random() * 201) - 100 // -100 to 100
    const usage = Math.floor(Math.random() * 101) // 0 to 100
    const supportTickets = Math.floor(Math.random() * 15)
    const billingHealth = Math.floor(Math.random() * 101)
    const healthScore = calculateHealthScore(nps, usage, supportTickets, billingHealth)
    
    const renewalDate = new Date()
    renewalDate.setDate(renewalDate.getDate() + Math.floor(Math.random() * 365))
    
    accounts.push({
      id: `ACC-${Math.floor(Math.random() * 10000)}`,
      name: `${companies[i % companies.length]} ${i > companies.length ? Math.floor(i / companies.length) : ''}`.trim(),
      arr: Math.floor(Math.random() * 500000) + 50000,
      healthScore,
      nps,
      usage,
      supportTickets,
      billingHealth,
      renewalDate,
      industry: industries[Math.floor(Math.random() * industries.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      segment: segments[Math.floor(Math.random() * segments.length)],
      csm: csms[Math.floor(Math.random() * csms.length)],
      executiveContact: `exec${i}@${companies[i % companies.length].toLowerCase().replace(' ', '')}.com`,
      usageData: generateUsageData(),
      recentTickets: generateTickets(),
      playbooks: generatePlaybooks()
    })
  }
  
  return accounts.sort((a, b) => b.arr - a.arr) // Sort by ARR descending
}

export function calculateKPIs(accounts: Account[]): KPIData {
  const healthyAccounts = accounts.filter(acc => acc.healthScore >= 75)
  const atRiskAccounts = accounts.filter(acc => acc.healthScore < 60)
  const totalARR = accounts.reduce((sum, acc) => sum + acc.arr, 0)
  const arrAtRisk = atRiskAccounts.reduce((sum, acc) => sum + acc.arr, 0)
  const avgNPS = accounts.reduce((sum, acc) => sum + acc.nps, 0) / accounts.length
  
  const today = new Date()
  const quarterEnd = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3 + 3, 0)
  const renewalsThisQuarter = accounts.filter(acc => acc.renewalDate <= quarterEnd).length
  
  return {
    healthyPercentage: (healthyAccounts.length / accounts.length) * 100,
    atRiskPercentage: (atRiskAccounts.length / accounts.length) * 100,
    totalARRAtRisk: arrAtRisk,
    avgNPS,
    totalAccounts: accounts.length,
    renewalsThisQuarter
  }
}

// Generate initial mock data
export const mockAccounts = generateMockAccounts(50)
export const mockKPIs = calculateKPIs(mockAccounts)