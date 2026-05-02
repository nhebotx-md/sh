const fs = require('fs')
const path = require('path')

function createFakeQuoted(userJid, options = {}) {
    const {
        name = 'ShoNhe-Bot',
        verified = true,
        org = 'Verified Bot'
    } = options

    return {
        key: {
          participant: `13135550002@s.whatsapp.net`,
          remoteJid: `13135550002@s.whatsapp.net`,
        },
        message: {
          contactMessage: {
            displayName: `🪸 ${name}`,
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=13135550002:+1 (313) 555-0002\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            sendEphemeral: true,
          },
        },
      };
}

module.exports = { createFakeQuoted }