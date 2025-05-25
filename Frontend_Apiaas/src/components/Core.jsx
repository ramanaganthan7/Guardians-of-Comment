"use client"

import { useState, useEffect, useRef} from "react"
import { Eye, EyeOff, Copy, Trash2, Plus, Crown, X } from "lucide-react"
import "../styles/core.css"

const Core = () => {
  const [activeTab, setActiveTab] = useState("Generate key")

  // Initialize apiKeys as object with keys for each API type
  const initialApiKeys = {
    analyzeHarmfulness: [],
    analyzeHarmfulnessWithPhoneCheck: [],
  }
  const [apiKeys, setApiKeys] = useState(initialApiKeys)

  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const userId = localStorage.getItem("userId")
  const userName = localStorage.getItem("userName")
  const plane = localStorage.getItem("plane")

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

  const fetchKeys = async () => {
  try {
    const res = await fetch(`https://guardians-of-comment-7g14.vercel.app/get-api-key?id=${userId}&apiLevel=basic`)
    if (!res.ok) throw new Error("Failed to fetch API keys")

    const result = await res.json()
    console.log(result, "result")

    const groupedKeys = initialApiKeys

    ;(result.data || []).forEach((key) => {
      const apiTypeName = key.apiType || "analyzeHarmfulness"

      if (!groupedKeys[apiTypeName]) groupedKeys[apiTypeName] = []

      groupedKeys[apiTypeName].push({
        id: key.id,
        key: key.apiKey,
        plan: key.apiLevel,
        isVisible: false,
        createdAt: key.createdAt || new Date().toISOString(),
      })
    })

    setApiKeys(groupedKeys)
    console.log(groupedKeys, "Formatted API Keys")
  } catch (err) {
    console.error("Error fetching API keys:", err)
  }
}

// Prevent double execution using useRef
const useFetchKeysOnce = (userId, initialApiKeys, setApiKeys) => {
  const fetched = useRef(false)

  useEffect(() => {
    if (!fetched.current) {
      fetchKeys()
      fetched.current = true
    }
  }, [])
}

  useEffect(() => {
    if (userId) fetchKeys()
  }, [userId])

  const generateNewKey = async (apiType) => {
    if (apiType === "analyzeHarmfulnessWithPhoneCheck") {
      setShowUpgradeModal(true)
      return
    }

    if ((apiKeys[apiType] || []).length >= 1) return

    try {
      const res = await fetch("https://guardians-of-comment-7g14.vercel.app/generate-api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, apiLevel: "basic", apiType }),
      })

      if (!res.ok) throw new Error("Failed to generate API key")

      const response = await res.json()
      const newKey = { ...response.data, isVisible: false }

      setApiKeys((prev) => ({
        ...prev,
        [apiType]: [...(prev[apiType] || []), newKey],
      }))
      window.location.reload();

    } catch (err) {
      console.error("Error generating API key:", err)
    }
  }

  // Toggle visibility of a specific key
  const toggleKeyVisibility = (apiType, keyId) => {
    setApiKeys((prev) => {
      const updatedKeys = prev[apiType].map((k) =>
        k.id === keyId ? { ...k, isVisible: !k.isVisible } : k
      )
      return { ...prev, [apiType]: updatedKeys }
    })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard'))
      .catch(() => alert('Failed to copy'));
  }

  const deleteKey = async (apiType, keyId) => {
    try {
      const res = await fetch('https://guardians-of-comment-7g14.vercel.app/delete-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: keyId, apiLevel: 'basic' }),
      })

      if (!res.ok) throw new Error('Delete failed')

      alert('Key deleted')

      // Remove the key from state
      setApiKeys((prev) => {
        const filteredKeys = prev[apiType].filter((k) => k.id !== keyId)
        return { ...prev, [apiType]: filteredKeys }
      })
    } catch {
      alert('Error deleting key')
    }
  }

  const renderApiSection = (apiType) => {
    const keys = apiKeys[apiType.name] || []

    return (
      <div key={apiType.name} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm container_core">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{apiType.title}</h3>
            <p className="text-sm text-gray-600">{apiType.description}</p>
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
          {keys.slice(0, 1).map((apiKey) => (
            <div key={apiKey.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">API Key</span>
                <span className="text-xs text-gray-500">
                  Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type={apiKey.isVisible ? 'text' : 'password'}
                  value={apiKey.key}
                  readOnly
                  className="border px-2 py-1 rounded"
                />

                <button
                  onClick={() => toggleKeyVisibility(apiType.name, apiKey.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  {apiKey.isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
                >
                  <Copy size={16} />
                </button>

                <button
                  onClick={() => deleteKey(apiType.name, apiKey.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">GUARDIANS OF COMMENTS</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500">{plane}</div>
            </div>
            <button className="p-2 text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors">
              <Crown size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
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

        <main className="main_content_core p-6 flex-1">{renderContent()}</main>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Upgrade Required</h2>
            <p className="text-gray-600 mb-4">
              To access this API, please upgrade your plan. Contact support or visit the billing section.
            </p>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Core;
