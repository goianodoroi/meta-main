import fs from 'fs'
import path from 'path'

export interface AppConfig {
  price: string
  checkoutUrl: string
  utmifyScripts: string[]
}

const DEFAULT_CONFIG: AppConfig = {
  price: '$ 87.00',
  checkoutUrl: 'https://laulfre.shop/cart/61698616099186:1',
  utmifyScripts: []
}

export function getConfig(): AppConfig {
  try {
    const configPath = path.join(process.cwd(), 'data', 'config.json')
    if (!fs.existsSync(configPath)) {
      return DEFAULT_CONFIG
    }
    const data = fs.readFileSync(configPath, 'utf-8')
    return { ...DEFAULT_CONFIG, ...JSON.parse(data) }
  } catch (error) {
    console.error('Failed to read config:', error)
    return DEFAULT_CONFIG
  }
}

export function saveConfig(config: AppConfig): boolean {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    const configPath = path.join(dataDir, 'config.json')
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error('Failed to save config:', error)
    return false
  }
}
