import React, { useState } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { KPITiles } from './components/dashboard/KPITiles'
import { AccountsLeaderboard } from './components/dashboard/AccountsLeaderboard'
import { HealthScoreRadar } from './components/dashboard/HealthScoreRadar'
import { TopAtRiskAccounts } from './components/dashboard/TopAtRiskAccounts'
import { AccountDetailPage } from './components/account/AccountDetailPage'
import { mockAccounts, mockKPIs, Account } from './data/mockData'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account)
    setActiveTab('account-detail')
  }

  const handleBackToOverview = () => {
    setSelectedAccount(null)
    setActiveTab('overview')
  }

  const renderContent = () => {
    if (activeTab === 'account-detail' && selectedAccount) {
      return (
        <AccountDetailPage 
          account={selectedAccount} 
          onBack={handleBackToOverview}
        />
      )
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Customer Health Overview
              </h1>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Monitor account health and identify at-risk customers
              </p>
            </div>
            
            <KPITiles kpis={mockKPIs} darkMode={darkMode} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AccountsLeaderboard 
                accounts={mockAccounts} 
                onAccountSelect={handleAccountSelect}
                darkMode={darkMode}
              />
              <HealthScoreRadar accounts={mockAccounts} darkMode={darkMode} />
            </div>
            
            <TopAtRiskAccounts 
              accounts={mockAccounts}
              onAccountSelect={handleAccountSelect}
              darkMode={darkMode}
            />
          </div>
        )
        
      case 'accounts':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Account Management</h1>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Detailed view of all customer accounts</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <AccountsLeaderboard 
                accounts={mockAccounts} 
                onAccountSelect={handleAccountSelect}
                darkMode={darkMode}
              />
            </div>
          </div>
        )
        
      case 'renewals':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Renewal Calendar & Risk Dashboard</h1>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Track upcoming renewals and manage retention</p>
            </div>
            
            <div className={`rounded-lg border p-8 text-center transition-colors duration-200 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="text-6xl mb-4">📅</div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Coming Soon</h3>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Renewal calendar and risk dashboard features are in development</p>
            </div>
          </div>
        )
        
      case 'playbooks':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Playbook & Action Center</h1>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Manage customer success strategies and tasks</p>
            </div>
            
            <div className={`rounded-lg border p-8 text-center transition-colors duration-200 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="text-6xl mb-4">📚</div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Coming Soon</h3>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Playbook library and action center features are in development</p>
            </div>
          </div>
        )
        
      case 'reports':
        return (
          <div className="space-y-6">
            <div>
              <h1 className={`text-2xl font-bold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Reporting & Executive Briefs</h1>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Generate reports and executive summaries</p>
            </div>
            
            <div className={`rounded-lg border p-8 text-center transition-colors duration-200 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="text-6xl mb-4">📊</div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Coming Soon</h3>
              <p className={`transition-colors duration-200 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Report builder and executive brief features are in development</p>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className={`relative flex h-screen transition-colors duration-200 ${
      darkMode 
        ? 'dark bg-gray-900' 
        : 'bg-gray-50'
    }`}>
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        darkMode={darkMode} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          darkMode={darkMode} 
          onToggleDarkMode={() => setDarkMode(!darkMode)} 
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App