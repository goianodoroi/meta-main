'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { models } from '@/components/sections/configurator-data'

export default function ConfigPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  
  const [links, setLinks] = useState<Record<string, string>>({})
  const [scripts, setScripts] = useState<string[]>([])
  
  const [saving, setSaving] = useState(false)

  // Initialization: load current links from server, and fallback to `models` just in case
  useEffect(() => {
    if (authenticated) {
      fetch('/api/config')
        .then(res => res.json())
        .then(data => {
          const loadedLinks = data.checkoutLinks || {}
          // Fill in missing links using defaults from configurator-data
          const defaultLinks = models.reduce((acc, m) => {
            acc[m.id] = loadedLinks[m.id] || m.checkoutUrl
            return acc
          }, {} as Record<string, string>)
          setLinks(defaultLinks)
          setScripts(data.utmScripts || [])
        })
    }
  }, [authenticated])

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form onSubmit={(e) => {
          e.preventDefault()
          if (password === 'aglomerado') setAuthenticated(true)
          else alert('Senha incorreta')
        }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
          <h2 className="text-xl tracking-tight font-sans font-bold text-gray-900 mb-6 text-center">Administração</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-200 p-3 rounded-xl font-sans mb-4 outline-none focus:border-gray-900 transition-colors"
            placeholder="Digite a senha"
          />
          <button className="w-full bg-gray-900 font-sans text-sm font-semibold text-white py-3 rounded-xl hover:bg-gray-800 transition shadow">
            Entrar
          </button>
        </form>
      </div>
    )
  }

  function handleSave() {
    setSaving(true)
    fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkoutLinks: links, utmScripts: scripts })
    }).then(() => {
      alert('Configurações salvas com sucesso!')
      setSaving(false)
    }).catch(() => {
      alert('Erro ao salvar')
      setSaving(false)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-sans tracking-tight text-gray-900">Configurações</h1>
          <p className="mt-2 text-gray-600 font-sans text-sm">Gerencie dinamicamente os links de checkout e os scripts do UTMify.</p>
        </div>

        {/* Links */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold font-sans text-gray-900 mb-6">Links de Checkout</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.keys(links).map(modelId => (
              <div key={modelId} className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold font-sans text-gray-700 capitalize">
                  {modelId.replace('-', ' ')}
                </label>
                <input
                  type="text"
                  value={links[modelId]}
                  onChange={e => setLinks({ ...links, [modelId]: e.target.value })}
                  className="w-full border border-gray-200 p-3 font-sans rounded-xl outline-none focus:border-gray-900 transition-colors text-[13px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scripts */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-sans text-gray-900">Scripts de Rastreamento (UTMify)</h2>
            <button
              onClick={() => setScripts([...scripts, ''])}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 font-sans px-4 py-2 bg-blue-50 rounded-lg transition-colors"
            >
              + Adicionar Script
            </button>
          </div>
          <div className="space-y-4">
            <AnimatePresence>
              {scripts.map((script, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  key={idx} 
                  className="flex flex-col gap-2 relative"
                >
                  <textarea
                    rows={6}
                    value={script}
                    onChange={e => {
                      const newScripts = [...scripts]
                      newScripts[idx] = e.target.value
                      setScripts(newScripts)
                    }}
                    className="w-full border border-gray-200 font-mono p-4 rounded-xl outline-none focus:border-gray-900 transition-colors text-xs text-gray-800 bg-gray-50/50"
                    placeholder="Cole todo o bloco <script>...</script> aqui"
                  />
                  <button
                    onClick={() => setScripts(scripts.filter((_, i) => i !== idx))}
                    className="absolute top-3 right-3 text-xs bg-red-50 text-red-600 px-3 py-1.5 font-semibold font-sans rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Remover
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {scripts.length === 0 && <p className="text-[14px] text-gray-500 font-sans italic">Nenhum pixel configurado.</p>}
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end pt-4 pb-12">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gray-900 hover:bg-gray-800 font-sans text-white px-8 py-3.5 rounded-xl font-semibold transition shadow-md disabled:opacity-50 text-sm"
          >
            {saving ? 'Salvando...' : 'Salvar todas as alterações'}
          </button>
        </div>
      </div>
    </div>
  )
}
