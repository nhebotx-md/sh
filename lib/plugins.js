const fs = require('fs')
const path = require('path')
const { logHeader, logPlugin, logCompact, logFooter } = require('./logger')

const plugins = new Map()

function readDirRecursive(dir) {
  let results = []

  const list = fs.readdirSync(dir)

  for (let file of list) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory()) {
      results = results.concat(readDirRecursive(filePath))
    } else {
      results.push(filePath)
    }
  }

  return results
}

async function loadPlugins(silent = false) {
  const baseDir = path.join(__dirname, '../plugins')

  const files = readDirRecursive(baseDir).filter(f => f.endsWith('.js'))

  plugins.clear() // 🔥 penting biar gak numpuk

  for (let filePath of files) {
    try {
      delete require.cache[require.resolve(filePath)]

      const plugin = require(filePath)

      if (!plugin.config || !plugin.handler) continue

      const relative = path.relative(baseDir, filePath)
      const folder = relative.split(path.sep)[0]

      if (!plugin.config.category) {
        plugin.config.category = folder
      }

      plugins.set(plugin.config.name, plugin)

    } catch (err) {
      console.log('❌ ERROR:', filePath)
    }
  }

  // 🔥 COMPACT LOG
  if (!silent) {
    const grouped = getPluginsByCategory()
    logCompact(grouped)
  }
}

function getAllPlugins() {
  return [...plugins.values()]
}
function getPluginsByCategory() {
  const result = {}

  for (let plugin of plugins.values()) {
    const cat = plugin.config.category || 'other'

    if (!result[cat]) result[cat] = []
    result[cat].push(plugin)
  }

  return result
}
function reloadPlugin(filePath) {
  try {
    delete require.cache[require.resolve(filePath)]

    const plugin = require(filePath)

    if (!plugin.config || !plugin.handler) return

    plugins.set(plugin.config.name, plugin)

    console.log(`♻️ Reloaded: ${plugin.config.name}`)
  } catch (err) {
    console.log(`❌ Error reload ${filePath}`, err)
  }
}
module.exports = {
  loadPlugins,
  getAllPlugins,
  getPluginsByCategory
}