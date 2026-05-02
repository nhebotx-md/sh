// .lib/Shon-databas

//━━━━━━━━━━━━━━━ UTILS
function getRole() {
  return require('./Shon-roleChecker')
}
function cleanJid(jid) {
  if (!jid) return null
  return jid.replace(/@.+/, '')
}

//━━━━━━━━━━━━━━━ DATABASE CLASS (ADAPTER)
class Database {
  constructor() {
    this.db = global.db
  }

  //━━━━━━━━━━━━━━━ CORE
  get data() {
    return this.db.data
  }

  async save() {
    try {
      await this.db.write()
    } catch {}
  }

  //━━━━━━━━━━━━━━━ USER
  getUser(jid) {
    const id = cleanJid(jid)
    if (!id) return null
    return this.db.data.users[id] || null
  }

  setUser(jid, input = {}) {
    const id = cleanJid(jid)
    if (!id) return null

    const user = this.db.data.users[id] || {}

    this.db.data.users[id] = {
      ...user,
      jid: id,
      name: input.name || user.name || 'Unknown',
      number: id,
      energi: input.energi ?? user.energi ?? 25,
      exp: input.exp ?? user.exp ?? 0,
      level: input.level ?? user.level ?? 1,

      // 🔥 AUTO SYNC ROLE (pakai roleChecker)
      const role = getRole()

isPremium: role.isPremium(jid),
isBanned: role.isBanned(jid),

      ...input
    }

    return this.db.data.users[id]
  }

  deleteUser(jid) {
    const id = cleanJid(jid)
    if (!id) return
    delete this.db.data.users[id]
  }

  //━━━━━━━━━━━━━━━ GROUP
  getGroup(jid) {
    return this.db.data.chats[jid] || null
  }

  setGroup(jid, input = {}) {
    const group = this.db.data.chats[jid] || {}

    this.db.data.chats[jid] = {
      ...group,
      jid,
      name: input.name || group.name || 'Unknown Group',
      welcome: input.welcome ?? group.welcome ?? global.settings?.welcomeEnabled ?? false,
      ...input
    }

    return this.db.data.chats[jid]
  }

  //━━━━━━━━━━━━━━━ SETTINGS
  setting(key, value) {
    if (!this.db.data.settings) this.db.data.settings = {}

    if (value !== undefined) {
      this.db.data.settings[key] = value
    }

    return this.db.data.settings[key]
  }

  //━━━━━━━━━━━━━━━ ROLE STORAGE (NYAMBUNG KE LOWDB)
  addOwner(num) {
    if (!this.db.data.owner) this.db.data.owner = []
    if (!this.db.data.owner.includes(num)) {
      this.db.data.owner.push(num)
    }
  }

  addPremium(num) {
    if (!this.db.data.premium) this.db.data.premium = []
    if (!this.db.data.premium.includes(num)) {
      this.db.data.premium.push(num)
    }
  }

  addPartner(num) {
    if (!this.db.data.partner) this.db.data.partner = []
    if (!this.db.data.partner.includes(num)) {
      this.db.data.partner.push(num)
    }
  }

  banUser(num) {
    let banned = this.setting('bannedUsers') || []
    if (!banned.includes(num)) {
      banned.push(num)
      this.setting('bannedUsers', banned)
    }
  }
}

//━━━━━━━━━━━━━━━ SINGLETON
let instance = null

async function initDatabase() {
  if (!global.db) {
    throw new Error('global.db belum siap (main.js belum load)')
  }

  if (!global.db.data) {
    await global.loadDatabase()
  }

  if (!instance) {
    instance = new Database()
  }

  return instance
}

function getDatabase() {
  if (!instance) {
    // fallback langsung ke global.db (biar gak crash)
    return new Database()
  }
  return instance
}

module.exports = {
  initDatabase,
  getDatabase
}