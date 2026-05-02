const pluginConfig = {
  name: 'contact',
  alias: ['vcf', 'vcard', 'owner', 'botinfo'],
  category: 'tools',
  description: 'Mengirim kontak vCard AI Bot',
  usage: '.contact',
  cooldown: 3,
  isEnabled: true
}

async function handler(m, { sock }) {

  const botName = global.namaBot || "AI Assistant"
  const botNumber = "13135550002"

  // 🔥 PREMIUM VCARD
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${botName};;;
FN:${botName}
ORG:${global.namaBot || "AI System"};
TITLE:AI Assistant Bot
TEL;type=CELL;type=VOICE;waid=${botNumber}:+1 (313) 555-0002
item1.TEL:+1 (313) 555-0002
item1.X-ABLabel:Support
EMAIL;type=INTERNET:support@ai.bot
item2.X-ABLabel:Email
URL:https://wa.me/${botNumber}
item3.X-ABLabel:Chat Bot
ADR:;;AI System Server;;;;
item4.X-ABLabel:Location
NOTE:Automated AI Assistant System
END:VCARD`

  // 🔥 SEND CONTACT
  await sock.sendMessage(m.chat, {
    contacts: {
      displayName: botName,
      contacts: [
        {
          displayName: botName,
          vcard: vcard
        }
      ]
    }
  }, {
    quoted: m,
    ai: true
  })
}

module.exports = { config: pluginConfig, handler }