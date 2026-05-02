const { getPluginsByCategory } = require('../../lib/plugins')

const pluginConfig = {
  name: 'menupp',
  alias: ['help'],
  category: 'main',
  description: 'Tampilkan menu bot',
  isEnabled: true
}

async function handler(m, { sock }) {
  const data = getPluginsByCategory()

  let text = '📜 *MENU BOT*\n\n'

  for (let cat in data) {
    text += `📂 *${cat.toUpperCase()}*\n`
    data[cat].forEach(p => {
      text += `- ${p.config.name}\n`
    })
    text += '\n'
  }

  await sock.sendMessage(m.chat, { text }, { quoted: m, ai: true })
}

module.exports = { config: pluginConfig, handler }