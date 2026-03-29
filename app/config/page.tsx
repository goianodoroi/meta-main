'use client'

import React, { useState, useEffect } from 'react'

export default function ConfigPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  
  const [price, setPrice] = useState('$ 87.00')
  const [checkoutUrl, setCheckoutUrl] = useState('https://laulfre.shop/cart/61698616099186:1')
  const [scripts, setScripts] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if(data) {
          setPrice(data.price)
          setCheckoutUrl(data.checkoutUrl)
          setScripts(data.utmifyScripts || [])
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'aglomerado') {
      setIsAuthenticated(true)
    } else {
      alert('Senha incorreta!')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMsg('')
    
    try {
      const resp = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, checkoutUrl, utmifyScripts: scripts }),
      })
      
      if (resp.ok) {
        setSuccessMsg('Configurações salvas com sucesso!')
        setTimeout(() => setSuccessMsg(''), 3000)
      } else {
        alert('Erro ao salvar as configurações.')
      }
    } catch (err) {
      alert('Erro de comunicação com o servidor.')
    } finally {
      setSaving(false)
    }
  }

  const addScript = () => setScripts([...scripts, ''])
  
  const removeScript = (index: number) => {
    setScripts(scripts.filter((_, i) => i !== index))
  }
  
  const updateScript = (index: number, val: string) => {
    const newScripts = [...scripts]
    newScripts[index] = val
    setScripts(newScripts)
  }

  if (loading) {
    return <div className="p-10 text-center font-sans">Carregando...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center text-slate-800">Acesso Restrito</h2>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-slate-600">Senha de Administrador</span>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-slate-300 rounded-md p-3 outline-none focus:border-blue-500"
              placeholder="Digite a senha..."
            />
          </label>
          <button type="submit" className="bg-slate-900 text-white font-semibold py-3 rounded-md hover:bg-slate-800 transition">
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-6 text-slate-800 font-sans pb-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-600 mt-1">Gerencie dinamicamente os links de checkout e os scripts do UTMify.</p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          
          {/* Card Produto Ativo */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Produto Ativo (Wayfarer Gen 2)</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Preço em Exibição</span>
                <input 
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="Ex: $ 87.00"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Link de Checkout</span>
                <input 
                  type="url"
                  value={checkoutUrl}
                  onChange={(e) => setCheckoutUrl(e.target.value)}
                  className="border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="https://sua-loja.com/cart..."
                />
              </label>
            </div>
          </div>

          {/* Card UTMify */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <h2 className="text-xl font-bold text-slate-900">Scripts de Rastreamento (UTMify)</h2>
              <button 
                type="button" 
                onClick={addScript}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold px-4 py-2 rounded-lg transition text-sm flex items-center gap-2"
              >
                + Adicionar Script
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {scripts.map((script, idx) => (
                <div key={idx} className="relative group flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-slate-500">Script {idx + 1}</span>
                    <button 
                      type="button"
                      onClick={() => removeScript(idx)}
                      className="text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md text-xs font-bold transition"
                    >
                      Remover
                    </button>
                  </div>
                  <textarea 
                    rows={6}
                    value={script}
                    onChange={(e) => updateScript(idx, e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-4 font-mono text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition bg-slate-50"
                    placeholder="Cole seu código <script> aqui..."
                  />
                </div>
              ))}
              {scripts.length === 0 && (
                <p className="text-slate-500 text-sm py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
                  Nenhum script configurado no momento.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 px-8 z-10 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
            {successMsg && <span className="text-green-600 font-semibold text-sm">{successMsg}</span>}
            <button 
              type="submit" 
              disabled={saving}
              className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition shadow-sm disabled:opacity-50"
            >
              {saving ? 'Salvando...' : 'Salvar todas as alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
