import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function autoDailyFeedsPlugin() {
  const gmDir = path.resolve(__dirname, 'public/GoodMorning')
  const gmJsonPath = path.resolve(__dirname, 'src/data/goodMorningAutoList.json')
  
  const gnDir = path.resolve(__dirname, 'public/GoodNight')
  const gnJsonPath = path.resolve(__dirname, 'src/data/goodNightAutoList.json')

  const jmDir = path.resolve(__dirname, 'public/Janmashtami')
  const jmJsonPath = path.resolve(__dirname, 'src/data/janmashtamiAutoList.json')

  const validExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.gif', '.svg'])

  function syncFeed(folderDir, outputJsonPath, prefix, title, category) {
    try {
      if (!fs.existsSync(folderDir)) return
      const files = fs.readdirSync(folderDir).filter(f => {
        const ext = path.extname(f).toLowerCase()
        return validExts.has(ext) && !f.startsWith('.')
      })

      // Sort naturally so good_night_2 comes before good_night_10
      files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

      const items = files.map((file, idx) => ({
        id: `${prefix}-${idx + 1}`,
        category: category,
        title: title,
        quote: '',
        hasEmbeddedText: true,
        image: `/${path.basename(folderDir)}/${encodeURIComponent(file)}`
      }))

      fs.writeFileSync(outputJsonPath, JSON.stringify(items, null, 2), 'utf-8')
      console.log(`[Auto-DailyFeeds] Synced ${items.length} images from ${path.basename(folderDir)}/`)
    } catch (err) {
      console.error(`[Auto-DailyFeeds] Sync error in ${folderDir}:`, err)
    }
  }

  function syncAll() {
    syncFeed(gmDir, gmJsonPath, 'gm', 'शुभ प्रभात', 'Good Morning')
    syncFeed(gnDir, gnJsonPath, 'gn', 'शुभ रात्रि', 'Good Night')
    syncFeed(jmDir, jmJsonPath, 'jk', 'श्री कृष्ण जन्माष्टमी', 'Janmashtami Special')
  }

  return {
    name: 'auto-daily-feeds-sync',
    buildStart() {
      syncAll()
    },
    configureServer(server) {
      syncAll()
      server.watcher.add(gmDir)
      server.watcher.add(gnDir)
      server.watcher.add(jmDir)
      server.watcher.on('all', (event, filePath) => {
        if (filePath && (filePath.startsWith(gmDir) || filePath.startsWith(gnDir) || filePath.startsWith(jmDir))) {
          syncAll()
          const gmMod = server.moduleGraph.getModuleById(gmJsonPath)
          if (gmMod) server.moduleGraph.invalidateModule(gmMod)
          const gnMod = server.moduleGraph.getModuleById(gnJsonPath)
          if (gnMod) server.moduleGraph.invalidateModule(gnMod)
          const jmMod = server.moduleGraph.getModuleById(jmJsonPath)
          if (jmMod) server.moduleGraph.invalidateModule(jmMod)
          server.ws.send({ type: 'full-reload' })
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autoDailyFeedsPlugin()],
  server: {
    host: true, // Expose to local network (0.0.0.0)
    allowedHosts: true, // Allow external tunnel hosts
  }
})
