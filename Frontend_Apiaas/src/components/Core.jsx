"use client"

import { useState } from "react"
import { Eye, EyeOff, Copy, Trash2, Plus, Crown } from "lucide-react"
import "../styles/core.css"
const Core = () => {
  const [activeTab, setActiveTab] = useState("Generate key")
  const [apiKeys, setApiKeys] = useState({
    analyzeHarmfulness: [
      {
        id: 1,
        key: "goc_1234567890abcdef1234567890abcdef",
        isVisible: false,
        createdAt: new Date().toISOString(),
      },
    ],
    analyzeHarmfulnessWithPhoneCheck: [
      {
        id: 2,
        key: "goc_abcdef1234567890abcdef1234567890",
        isVisible: false,
        createdAt: new Date().toISOString(),
      },
    ],
  })

  const menuItems = ["API Documentation", "Generate key", "Dashboard", "Billing"]

  const apiTypes = [
    {
      name: "analyzeHarmfulness",
      title: "Analyze Harmfulness API",
      description: "Detect harmful content in text comments",
    },
    {
      name: "analyzeHarmfulnessWithPhoneCheck",
      title: "Analyze Harmfulness with Phone Check API",
      description: "Detect harmful content with additional phone number validation",
    },
  ]

  const generateNewKey = (apiType) => {
    const newKey = {
      id: Date.now(),
      key: `goc_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      isVisible: false,
      createdAt: new Date().toISOString(),
    }

    setApiKeys((prev) => ({
      ...prev,
      [apiType]: [...(prev[apiType] || []), newKey],
    }))
  }

  const toggleKeyVisibility = (apiType, id) => {
    setApiKeys((prev) => ({
      ...prev,
      [apiType]: prev[apiType].map((key) => (key.id === id ? { ...key, isVisible: !key.isVisible } : key)),
    }))
  }

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key)
    // You could add a toast notification here bg-white border border-gray-200 rounded-lg p-6 shadow-sm
  }

  const deleteKey = (apiType, id) => {
    setApiKeys((prev) => ({
      ...prev,
      [apiType]: prev[apiType].filter((key) => key.id !== id),
    }))
  }

  const renderApiSection = (apiType) => {
    const apiInfo = apiTypes.find((api) => api.name === apiType.name)
    const keys = apiKeys[apiType.name] || []

    return (
      <div key={apiType.name} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm container_core">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{apiInfo.title}</h3>
            <p className="text-sm text-gray-600">{apiInfo.description}</p>
          </div>
          <button
            onClick={() => generateNewKey(apiType.name)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} />
            Generate Key
          </button>
        </div>

        <div className="space-y-3">
          {keys.map((apiKey) => (
            <div key={apiKey.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">API Key</span>
                <span className="text-xs text-gray-500">
                  Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white border border-gray-200 rounded px-3 py-2 font-mono text-sm">
                  {apiKey.isVisible ? apiKey.key : "•".repeat(32)}
                </div>

                <button
                  onClick={() => toggleKeyVisibility(apiType.name, apiKey.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title={apiKey.isVisible ? "Hide key" : "Show key"}
                >
                  {apiKey.isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                  title="Copy key"
                >
                  <Copy size={16} />
                </button>

                <button
                  onClick={() => deleteKey(apiType.name, apiKey.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  title="Delete key"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {keys.length === 0 && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <p className="text-sm">No API keys generated for this endpoint.</p>
              <p className="text-xs mt-1">Click "Generate Key" to create your first API key.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Generate key":
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">API Key Management</h2>
              <p className="text-gray-600">Generate and manage API keys for different endpoints</p>
            </div>
            <div className="space-y-6">{apiTypes.map((apiType) => renderApiSection(apiType))}</div>
          </div>
        )

      case "API Documentation":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 container_core">
              <p className="text-gray-600">API documentation content will be displayed here.</p>
            </div>
          </div>
        )

      case "Dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 container_core">
              <p className="text-gray-600">Dashboard analytics and metrics will be displayed here.</p>
            </div>
          </div>
        )

      case "Billing":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Billing</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 container_core">
              <p className="text-gray-600">Billing information and payment history will be displayed here.</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">GUARDIANS OF COMMENTS</h1>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Name</div>
              <div className="text-xs text-gray-500">Plan</div>
            </div>

            <button className="p-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
              <Crown size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActiveTab(item)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content flex-1 p-6 w-full h-full box-border */}
        <main className="main_content_core">{renderContent()}</main>
      </div>
    </div>
  )
}

export default Core
