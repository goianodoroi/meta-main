import { NextResponse } from 'next/server'
import { getConfig, saveConfig } from '@/lib/config'

export async function GET() {
  const config = getConfig()
  return NextResponse.json(config)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const success = saveConfig(data)
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: 'Failed to write config' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}
