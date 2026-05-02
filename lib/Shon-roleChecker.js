const { getDatabase } = require('./Shon-database')

// optional (aman kalau gak ada file)


//━━━━━━━━━━━━━━━[ UTIL ]
function cleanNumber(number) {
  if (!number) return ''
  return String(number).split(':')[0].replace(/[^0-9]/g, '')
}

function isNumberMatch(a, b) {
  if (!a || !b) return false
  return a === b || a.endsWith(b) || b.endsWith(a)
}

//━━━━━━━━━━━━━━━[ OWNER ]
function isOwner(number) {
  if (!number) return false

  const cleanNum = cleanNumber(number)

  // bot = owner
  if (global.botnum?.length) {
    if (global.botnum.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
      return true
    }
  }

  try {
    const db = getDatabase()

    // global owner
    if (global.owner?.length) {
      if (global.owner.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
        return true
      }
    }

    // db owner.json
    if (Array.isArray(db.data.owner)) {
      if (db.data.owner.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
        return true
      }
    }

    // settings
    const setOwner = db.setting?.('ownerNumbers') || []
    if (setOwner.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
      return true
    }

    // 🔥 PATCH: fallback ke global.db (LOWDB lama)
    if (global.db?.data?.owner) {
      if (global.db.data.owner.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
        return true
      }
    }

  } catch {}

  return false
}

//━━━━━━━━━━━━━━━[ PREMIUM ]
function isPremium(number) {
  if (!number) return false
  if (isOwner(number)) return true

  const cleanNum = cleanNumber(number)

  try {
    const db = getDatabase()

    if (Array.isArray(db.data.premium)) {
      const now = Date.now()

      const index = db.data.premium.findIndex(p => {
        if (typeof p === 'string') return cleanNumber(p) === cleanNum
        if (p.id) return cleanNumber(p.id) === cleanNum
        return false
      })

      if (index !== -1) {
        const found = db.data.premium[index]

        if (typeof found === 'string') return true

        const expire =
          found.expired ||
          (found.expiredAt ? new Date(found.expiredAt).getTime() : 0)

        if (expire && expire < now) {
          db.data.premium.splice(index, 1)

          const jid = cleanNum + '@s.whatsapp.net'
          const user = db.getUser?.(jid)

          if (user) {
            user.isPremium = false
            db.setUser?.(jid, user)
          }

          db.save?.()
          return false
        }

        return true
      }
    }

    const setPremium = db.setting?.('premiumUsers') || []
    if (setPremium.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
      return true
    }

    // 🔥 PATCH: fallback global.db
    if (global.db?.data?.premium) {
      if (global.db.data.premium.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
        return true
      }
    }

  } catch {}

  try {
    if (ownerPremiumDb?.isPremium?.(cleanNum)) return true
  } catch {}

  return false
}

//━━━━━━━━━━━━━━━[ PARTNER ]
function isPartner(number) {
  if (!number) return false
  if (isOwner(number)) return true

  const cleanNum = cleanNumber(number)

  try {
    const db = getDatabase()

    if (Array.isArray(db.data.partner)) {
      const now = Date.now()

      const index = db.data.partner.findIndex(p => {
        if (typeof p === 'string') return cleanNumber(p) === cleanNum
        if (p.id) return cleanNumber(p.id) === cleanNum
        return false
      })

      if (index !== -1) {
        const found = db.data.partner[index]

        if (typeof found === 'string') return true

        const expire =
          found.expired ||
          (found.expiredAt ? new Date(found.expiredAt).getTime() : 0)

        if (expire && expire < now) {
          db.data.partner.splice(index, 1)
          db.save?.()
          return false
        }

        return true
      }
    }

    // 🔥 PATCH: fallback global.db
    if (global.db?.data?.partner) {
      if (global.db.data.partner.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
        return true
      }
    }

  } catch {}

  try {
    if (ownerPremiumDb?.isPartner?.(cleanNum)) return true
  } catch {}

  return false
}

//━━━━━━━━━━━━━━━[ BANNED ]
function isBanned(number) {
  if (!number) return false
  if (isOwner(number)) return false

  const cleanNum = cleanNumber(number)

  try {
    const db = getDatabase()
    const banned = db.setting?.('bannedUsers') || []

    if (banned.some(v => isNumberMatch(cleanNum, cleanNumber(v)))) {
      return true
    }

    // 🔥 PATCH: fallback global.db
    if (global.db?.data?.banned) {
      return global.db.data.banned.some(v =>
        isNumberMatch(cleanNum, cleanNumber(v))
      )
    }

  } catch {}

  return false
}

//━━━━━━━━━━━━━━━[ BOT NUMBER ]
function setBotNumber(number) {
  if (!number) return
  const clean = cleanNumber(number)

  if (!global.botnum) global.botnum = []
  global.botnum = [clean]
}

//━━━━━━━━━━━━━━━[ SELF ]
function isSelf(number) {
  if (!number || !global.botnum) return false

  const cleanNum = cleanNumber(number)

  return global.botnum.some(v =>
    isNumberMatch(cleanNum, cleanNumber(v))
  )
}

module.exports = {
  isOwner,
  isPremium,
  isPartner,
  isBanned,
  isSelf,
  setBotNumber
}