const os = require('os')
const { execSync } = require('child_process')
const axios = require('axios')
const { performance } = require('perf_hooks')
const { createFakeQuoted } = require('../../lib/fakeQuoted')

const pluginConfig = {
  name: 'ping',
  alias: ['systeminfo'],
  category: 'tools',
  description: 'Cek status bot & server',
  usage: '.ping',
  cooldown: 3,
  isEnabled: true
}

async function handler(m, { sock }) {

  //async function handler(m, { sock }) {

  const config = global.config // 👈 TARUH DI SINI (awal handler)

  // 🔹 Hitung latensi
  let start = performance.now()
  let latensi = (performance.now() - start).toFixed(4)

  // 🔹 CPU
  let cpuInfo = os.cpus()?.[0]?.model || "Unknown CPU"
  let cpuCores = os.cpus()?.length || "N/A"

  // 🔹 RAM
  let totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB"
  let usedMem = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2) + " GB"

  // 🔹 Uptime
  let uptime = process.uptime()
  let days = Math.floor(uptime / 86400)
  let hours = Math.floor((uptime % 86400) / 3600)
  let minutes = Math.floor((uptime % 3600) / 60)
  let seconds = Math.floor(uptime % 60)

  let uptimeFormatted = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`

  // 🔥 GABUNGIN INFO CONFIG DI SINI
  let status = `🚀 *BOT STATUS*\n\n`
    + `🤖 *${namaBot || 'Bot'}*\n`
    + `👑 Owner: ${nomorOwner || '-'}\n\n`
    + `⏳ *Ping*: ${latensi} s\n`
    + `🖥️ *CPU*: ${cpuInfo} (${cpuCores} Cores)\n`
    + `💾 *RAM*: ${usedMem} / ${totalMem}\n`
    + `⏰ *Uptime*: ${uptimeFormatted}`

  await sock.sendMessage(m.chat, {
    text: status
  }, { quoted: m, ai: true })
}
    
 

module.exports = { config: pluginConfig, handler }