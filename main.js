
// =====[ PROCESS ERROR HANDLERS ]=====
// Menangani uncaughtException dan unhandledRejection agar bot tidak crash
process.on("uncaughtException", (err) => {});
process.on("unhandledRejection", (reason, promise) => {});

// =====[ CORE DEPENDENCIES ]=====
// Modul-modul utama yang dibutuhkan sebelum inisialisasi bot

// =====[ Node.js Built-in Modules ]=====
const fs = require("fs");
const path = require("path");
const readline = require("readline");


// =====[ Third-Party Modules ]=====
const pino = require("pino");
const chalk = require("chalk");
const axios = require("axios");
const fetch = require("node-fetch");
const FileType = require("file-type");
const _ = require("lodash");
const moment = require("moment-timezone");
const NodeCache = require("node-cache");
const yargs = require("yargs/yargs");
const PhoneNumber = require("awesome-phonenumber");
const { Boom } = require("@hapi/boom");

require('./config')
// Memastikan `config.js` dimuat terlebih dahulu
// =====[ Baileys (WhatsApp Library) ]=====
const { default: makeWASocket, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason,
        fetchLatestBaileysVersion, getContentType, generateForwardMessageContent,
        prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID,
        downloadContentFromMessage, makeInMemoryStore, jidDecode,
        getAggregateVotesInPollMessage, proto, delay } = require("@itsukichan/baileys");

// =====[ Internal Libraries ]=====
const { uncache, nocache } = require("./lib/loader");
const { color } = require("./lib/color");
const { levelUpdate } = require("./lib/leveling");
const { Low, JSONFile } = require("./lib/lowdb");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/scp/exif");
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, await: sleep, sleep: sleepFn, reSize } = require("./lib/myfunc");
const { loadPlugins, getAllPlugins } = require("./lib/plugins");

// =====[ GLOBAL CONFIGURATION ]=====
 // Memastikan config.js dimuat terlebih dahulu

// =====[ Bot Behavior Flags ]=====
global.autoswview = false;
global.welcome = true;
global.adminevent = true;
global.groupevent = true;
global.anticall = false;
global.public = true;
global.groupOnly = false;
global.privateChatOnly = false;
global.autoBio = true;

// =====[ IN-MEMORY STORE & CACHES ]=====
// Store untuk menyimpan data sementara dan cache retry pesan
const store = makeInMemoryStore({
    logger: pino().child({ level: 'silent', stream: 'store' })
});

const msgRetryCounterCache = new NodeCache();

// =====[ CLI Argument Parser ]=====
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

// =====[ DATABASE SETUP (LOWDB) ]=====
global.db = new Low(new JSONFile('src/database.json'));
global.DATABASE = global.db;

global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (!global.db.READ) {
                    clearInterval(interval);
                    resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
                }
            }, 1000);
        });
    }

    if (global.db.data !== null) return global.db.data;

    global.db.READ = true;

    try {
        await global.db.read();
        global.db.data = {
            users: {},
            database: {},
            chats: {},
            game: {},
            settings: {},
            message: {},
            ...(global.db.data || {})
        };
        global.db.chain = _.chain(global.db.data);
    } catch (err) {
        console.error('⚠️ Gagal membaca database:', err);
    } finally {
        global.db.READ = false;
    }

    return global.db.data;
};

// =====[ INIT SEMUA SETELAH DB SIAP ]=====
(async () => {
    await loadDatabase();

    // 🔥 WAJIB: sinkron struktur biar role checker aman
    global.db.data.owner = global.db.data.owner || [];
    global.db.data.premium = global.db.data.premium || [];
    global.db.data.partner = global.db.data.partner || [];
    global.db.data.banned = global.db.data.banned || [];

    // =====[ ROLE + DATABASE INTEGRATION ]=====
    const { initDatabase } = require('./lib/Shon-database');
    const role = require('./lib/Shon-roleChecker');

    initDatabase(); // Shon-db lu

    // inject global
    global.isOwner = role.isOwner;
    global.isPremium = role.isPremium;
    global.isPartner = role.isPartner;
    global.isBanned = role.isBanned;
    global.isSelf = role.isSelf;

    console.log('✅ Database & Role system siap');
})();

// =====[ AUTO SAVE ]=====
if (global.db) {
    setInterval(async () => {
        if (global.db.data && !global.db.READ) {
            try {
                await global.db.write();
            } catch (err) {
                console.error('⚠️ Gagal menyimpan database:', err);
            }
        }
    }, 30 * 1000);
}

// =====[ CASE.JS HOT RELOAD ]=====
// Load case.js dengan mekanisme nocache untuk auto-reload saat development
require('./case.js');
nocache('./case.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'));

// =====[ SESSION & OWNER CONFIGURATION ]=====
// Konfigurasi nomor owner, kontak, dan session path
const phoneNumber = ownerNumber;
const owner = JSON.parse(fs.readFileSync("./owner.json"));
const contacts = JSON.parse(fs.readFileSync("./src/data/role/contacts.json"));
const getThumb = () => {
    return fs.readFileSync(path.join(process.cwd(), './src/thum2/shoNhe.jpg'))
}
const usePairingCode = true;
const session = `./${sessionName}`;

// =====[ UTILITY FUNCTIONS ]=====
// Helper functions untuk readline prompt, cooldowns, dan formatting

// =====[ Readline Prompt Helper ]=====
const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(text, resolve)
    });
};

// =====[ Chalk Color Collection for Banner ]=====
const colors = [
    chalk.red,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
];

// =====[ BANNER DISPLAY ]=====
// Tampilan ASCII art saat bot pertama kali dijalankan
function displayBanner() {
    const banner = `

╭━━━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╮╭━━╮
┃╭━╮┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃┃╭╮┃
┃╰━╯┣━━┳╮╭╮╭┳━━┳━┳━━┳━╯┃┃╰╯╰┳╮╱╭╮
┃╭━━┫╭╮┃╰╯╰╯┃┃━┫╭┫┃━┫╭╮┃┃╭━╮┃┃╱┃┃
┃┃╱╱┃╰╯┣╮╭╮╭┫┃━┫┃┃┃━┫╰╯┃┃╰━╯┃╰━╯┃
╰╯╱╱╰━━╯╰╯╰╯╰━━┻╯╰━━┻━━╯╰━━━┻━╮╭╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰━━╯
Bot whatsapp only termux ©
SHO-NHE V5 | Created sychyy & nhebotx
░█▀▀▀█ ░█─░█ ░█▀▀▀█ ░█▄─░█ ░█─░█ ░█▀▀▀ 
─▀▀▀▄▄ ░█▀▀█ ░█──░█ ░█░█░█ ░█▀▀█ ░█▀▀▀ 
░█▄▄▄█ ░█─░█ ░█▄▄▄█ ░█──▀█ ░█─░█ ░█▄▄▄


██╗░░░██╗███████╗
██║░░░██║██╔════╝
╚██╗░██╔╝██████╗░
░╚████╔╝░╚════██╗
░░╚██╔╝░░██████╔╝
░░░╚═╝░░░╚═════╝░
`;

    // Terapkan warna biru langit menggunakan chalk
    const coloredBanner = chalk.cyan(banner);
    console.clear();
    console.log(coloredBanner);
}

displayBanner();

// =====[ BAILEYS VERSION FETCHER ]=====
// Mengambil versi Baileys terbaru dari remote dengan retry mechanism
let versionFetchInProgress = false;
let retryFetchTimeout = null;

async function fetchVersion() {
    if (versionFetchInProgress) return;

    versionFetchInProgress = true;

    try {
        const response = await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json');
        const data = await response.json();
        return data.version;
    } catch (error) {
        console.log('Error fetching version:', error.message);

        retryFetchTimeout = setTimeout(() => {
            versionFetchInProgress = false;
            fetchVersion();
        }, 5000);

        return [2, 3000, 1017531287]; // Versi default jika gagal
    } finally {
        versionFetchInProgress = false;
    }
}

// =====[ MAIN BOT INITIALIZER ]=====
// Fungsi utama yang menginisialisasi socket Baileys dan semua event handlers

async function startshoNhe() {

    // =====[ AUTH STATE & SOCKET CONFIGURATION ]=====
    const { state, saveCreds } = await useMultiFileAuthState(session);

    const shoNhe = makeWASocket({
    // ===== EXISTING (TETAP) =====
    printQRInTerminal: !usePairingCode,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,

    patchMessageBeforeSending: (message) => {
        const requiresPatch = !!(
            message.buttonsMessage
            || message.templateMessage
            || message.listMessage
        );
        if (requiresPatch) {
            message = {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadataVersion: 2,
                            deviceListMetadata: {},
                        },
                        ...message,
                    },
                },
            };
        }
        return message;
    },

    version: await fetchVersion(),
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: 'fatal' }),

    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(
            state.keys,
            pino().child({
                level: 'silent',
                stream: 'store'
            })
        ),
    },

    // ===== 🔥 TAMBAHAN (ADVANCED) =====

    // 🔹 filter JID aneh (biar stabil)
    shouldIgnoreJid: (jid) => {
        if (!jid) return true
        return (
            jid.includes("meta_ai") ||
            jid === "status@broadcast" ||
            jid.endsWith("@broadcast")
        )
    },

    // 🔹 ambil pesan dari store (anti error retry)
    getMessage: async (key) => {
        if (!store) return undefined
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message || undefined
    },

    // 🔹 cache metadata group (hemat request)
    cachedGroupMetadata: async (jid) => {
        if (!groupCache) return undefined

        const cached = groupCache.get(jid)
        if (cached) return cached

        try {
            const fresh = await shoNhe.groupMetadata(jid)
            groupCache.set(jid, fresh)
            return fresh
        } catch {
            return undefined
        }
    },

    // 🔹 retry system (anti gagal kirim)
    msgRetryCounterCache,
})

// ====[ AI ICON ]====
const originalSendMessage = shoNhe.sendMessage.bind(shoNhe)

shoNhe.sendMessage = async (jid, content = {}, options = {}) => {

if (options.ai || options.AI) {

const botName = global.namaBot || "AI Assistant"
const botJid = shoNhe.decodeJid(shoNhe.user.id)

// 🔥 SAFE TEXT/CAPTION INJECTION
if (content.text) {
content.text = `${content.text}\n\n> ${botName}`
}

if (content.caption) {
content.caption = `${content.caption}\n\n> ${botName}`
}

// 🔥 FAKE CONTACT QUOTED (SYSTEM STYLE)
const fakeQuoted = {
key: {
participant: "13135550002@s.whatsapp.net",
remoteJid: "13135550002@s.whatsapp.net"
},
message: {
contactMessage: {
displayName: `🪸 Meta AI || ${botName}`,
vcard: `BEGIN:VCARD
VERSION:3.0
N:;${botName};;;
FN:${botName}
ORG:${global.namaBot || "AI System"};
TITLE:AI Assistant Bot
TEL;type=CELL;type=VOICE;waid=13135550002:+1 (313) 555-0002
item1.TEL:+1 (313) 555-0002
item1.X-ABLabel:Support
EMAIL;type=INTERNET:support@ai.bot
item2.X-ABLabel:Email
URL:https://wa.me/13135550002
item3.X-ABLabel:Chat Bot
ADR:;;AI System Server;;;;
item4.X-ABLabel:Location
NOTE:Automated AI Assistant System
END:VCARD`,
sendEphemeral: true
}
}
}

// 🔥 CONTEXT INFO MINIMAL (NO LINK PREVIEW, NO ADREPLY)
content.contextInfo = {
...content.contextInfo,
mentionedJid: [botJid]
}

options.quoted = fakeQuoted
}

return originalSendMessage(jid, content, options)
}

    // =====[ PAIRING CODE AUTHENTICATION ]=====
    if (!shoNhe.authState.creds.registered) {
        console.clear();
        console.log(chalk.bgBlack.redBright.bold('\n\n💀 [AKSES TERBATAS] 💀\nScript Ini Dijual And Thx Yang Sudah Membeli, Silahkan Bergabung dengan Group WhatsApp dan Channel WhatsApp Yang telah disediakan\n\n❕Channel WhatsApp: https://whatsapp.com/channel/0029Vb0v3F71yT264EejzJ3e\n❕Group WhatsApp: https://chat.whatsapp.com/IvvRbhbWE2RCwknzQYBAPt'));
        console.log(chalk.bgBlack.greenBright.bold('=============================================='));

        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log(chalk.cyan.bold('\n🔐 Sistem Deteksi: Autentikasi Diperlukan...'));
        await new Promise(resolve => setTimeout(resolve, 1000));

        const phoneNumber = await question(chalk.yellowBright.bold('\n⚠️ Masukkan Nomor Whatsapp (Awali dengan 62):\n'));

        console.log(chalk.blueBright.bold('\n📞 Memproses nomor...'));
        await new Promise(resolve => setTimeout(resolve, 1500));

        const code = await shoNhe.requestPairingCode(phoneNumber.trim());

        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(chalk.bgBlack.whiteBright.bold('\n🔓 Kode Pairing Bot Whatsapp kamu:'));
        console.log(chalk.bgBlack.red.bold(`💬 ${code}`));

        console.log(chalk.green.bold('\n🚀 Siap untuk melanjutkan koneksi...'));
        console.log(chalk.magenta.bold('==============================================\n'));
    }

    // =====[ EVENT: CONNECTION UPDATE ]=====
    // Menangani perubahan koneksi: close, connecting, open
    shoNhe.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const reason = lastDisconnect?.error
                ? new Boom(lastDisconnect.error)?.output.statusCode
                : null;

            console.log(
                chalk.bgBlack.red.bold('⚠️ Koneksi Terputus:'),
                chalk.yellow(lastDisconnect?.error || 'Unknown Error')
            );

            if (reason === DisconnectReason.badSession) {
                console.log(chalk.red("❌ Bad Session, harap hapus session dan scan ulang!"));
                process.exit();
            }

            if (reason === DisconnectReason.connectionClosed) {
                console.log(chalk.cyan("🔄 Koneksi ditutup, memulai ulang bot dalam 5 detik..."));
                setTimeout(() => startshoNhe(), 5000);
            }

            if (reason === DisconnectReason.connectionLost) {
                console.log(chalk.magenta("⚡ Koneksi terputus, memulai ulang bot dalam 5 detik..."));
                setTimeout(() => startshoNhe(), 5000);
            }

            if (reason === DisconnectReason.connectionReplaced) {
                console.log(chalk.red("🔄 Sesi digantikan, harap tutup sesi sebelumnya."));
                await shoNhe.logout();
                process.exit();
            }

            if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red("🔑 Perangkat logout, harap scan ulang QR!"));
                await shoNhe.logout();
                process.exit();
            }

            if (reason === DisconnectReason.restartRequired) {
                console.log(chalk.green("♻️ Restart dibutuhkan, memulai ulang bot..."));
                setTimeout(() => startshoNhe(), 5000);
            }

            if (reason === DisconnectReason.timedOut) {
                console.log(chalk.blue("⏳ Koneksi timeout, memulai ulang bot dalam 5 detik..."));
                setTimeout(() => startshoNhe(), 5000);
            }

            console.log(chalk.yellow("⚠️ Error tidak diketahui, memulai ulang bot..."));
            setTimeout(() => startshoNhe(), 5000);
        }
        else if (connection === 'connecting') {
            console.log(chalk.cyan("🔄 Menghubungkan ke WhatsApp..."));
        }
        else if (connection === 'open') {
            console.log(chalk.bgBlack.greenBright.bold("\n✅ Bot berhasil tersambung!"));
            await loadPlugins();

            // =====[ PLUGIN FILE WATCHER ]=====
            let reloadTimeout;

            function watchPlugins(dir) {
                const files = fs.readdirSync(dir);

                for (let file of files) {
                    const filePath = path.join(dir, file);

                    if (fs.statSync(filePath).isDirectory()) {
                        watchPlugins(filePath);
                    } else if (file.endsWith('.js')) {
                        fs.watchFile(filePath, () => {
                            console.log('♻️ Reload:', filePath);
                            reloadPlugin(filePath);
                        });
                    }
                }
            }

            watchPlugins('./plugins');
            }
            });

           
    // =====[ HELPER: RANDOM BACKGROUND FETCHER ]=====
    async function getRandomBackground() {
        let txtUrl = 'https://raw.githubusercontent.com/NHEBotx/HelloUserNHEBotx/refs/heads/main/backgrounds.txt';

        try {
            let response = await axios.get(txtUrl);
            let text = response.data;
            let backgrounds = text.split('\n').map(line => line.trim()).filter(line => line);

            if (backgrounds.length === 0) {
                console.error("❌ Tidak ada background tersedia.");
                return "https://files.catbox.moe/umiwpu.jpg";
            }

            let randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
            return randomBackground;
        } catch (error) {
            console.error("❌ Gagal mengambil daftar background:", error);
            return "https://files.catbox.moe/umiwpu.jpg";
        }
    }

    // =====[ EVENT: GROUP PARTICIPANTS UPDATE (WELCOME/LEAVE) ]=====
    shoNhe.ev.on('group-participants.update', async (update) => {
        try {
            let groupMetadata = await shoNhe.groupMetadata(update.id);
            let participants = update.participants;

            for (let participant of participants) {
                let profilePicture;
                try {
                    profilePicture = await shoNhe.profilePictureUrl(participant, "image");
                } catch (error) {
                    profilePicture = "https://files.catbox.moe/vxymmw.jpg";
                }

                let member = groupMetadata.participants.find(p => p.id === participant);
                let username = update.pushName || member?.name || `@${participant.split('@')[0]}`;
                let totalMembers = groupMetadata.participants.length;
                let groupName = groupMetadata.subject;

                if (update.action === 'add') {
                    let randomBackground = await getRandomBackground();

                    let welcomeImageURL = `https://api.popcat.xyz/welcomecard?background=${encodeURIComponent(randomBackground)}&text1=${encodeURIComponent(username)}&text2=Welcome+To+${encodeURIComponent(groupName)}&text3=Member+${totalMembers}&avatar=${encodeURIComponent(profilePicture)}`;

                    let now = new Date();
                    let options = { timeZone: "Asia/Jakarta", hour12: false };
                    let time = now.toLocaleTimeString("id-ID", options);
                    let date = now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

                    let welcomeText = `👋 *Welcome, ${username}!*
📌 *Group:* ${groupMetadata.subject}
🕒 *Time:* ${time} WIB
📅 *Date:* ${date}
📢 *Rules:* Jangan spam, hormati sesama, dan aktif di grup!`;

                    let imageBuffer = null;
                    try {
                        let response = await axios.get(welcomeImageURL, { responseType: "arraybuffer" });
                        imageBuffer = Buffer.from(response.data);
                    } catch (error) {
                        console.error("❌ Gagal mengambil gambar dari API Popcat:", error);
                    }

                    let buttonMessage = {
                        image: imageBuffer,
                        caption: welcomeText,
                        footer: global.namaBot,
                        buttons: [
                            { buttonId: "register", buttonText: { displayText: "⚠️ REGISTER" } },
                            { buttonId: "cek", buttonText: { displayText: "📌 CEK REGIS" } }
                        ],
                        viewOnce: true
                    };

                    await shoNhe.sendMessage(update.id, buttonMessage);

                    // Kirim pesan pribadi setelah beberapa detik
                    setTimeout(async () => {
                        let privateMessage = {
                            text: `🚀 *Selamat datang di grup ${groupName}, ${username}!*
🔰 *Tertarik membuat bot WhatsApp pribadi?*
💡 Bisa digunakan untuk bisnis, komunitas, atau hiburan!

📌 *PILIHAN PAKET SC NO ENC:*
1️⃣ *Paket Basic - Rp 25K*
2️⃣ *Paket Premium - Rp 45K*
3️⃣ *Paket Custom - Rp 65K*

📞 *Hubungi Admin:* wa.me/6288989971490
🔗 *Pilih tombol di bawah untuk informasi lebih lanjut!*`,
                            footer: "INFO BIKIN BOT",
                            buttons: [
                                { buttonId: "bikinbot", buttonText: { displayText: "🤖 INFO BIKIN BOT" } },
                                { buttonId: "pilih_paket", buttonText: { displayText: "💰 PILIH PAKET" } }
                            ],
                            viewOnce: true,
                            contextInfo: {
                                externalAdReply: {
                                    title: "🔥 BIKIN BOT WA PRIBADI 🔥",
                                    body: 'Bebas kustom fitur & full support!',
                                    thumbnail: imageBuffer,
                                    sourceUrl: "https://wa.me/6288989971490"
                                }
                            }
                        };

                        await shoNhe.sendMessage(participant, privateMessage);
                    }, 3000);

                    // Kirim pesan register di grup setelah 5 detik
                    setTimeout(async () => {
                        let registerText = `🔰 *Halo ${username}, sebelum melanjutkan, silakan lakukan registrasi!*
📝 *Ketik perintah:* *.register* untuk mendaftar.
🚀 Dengan mendaftar, Anda akan mendapatkan akses ke fitur lengkap di dalam grup ini!`;

                        let registerMessage = {
                            text: registerText,
                            footer: global.namaBot,
                            buttons: [
                                { buttonId: "register", buttonText: { displayText: "REGIS ⚡" } }
                            ],
                            viewOnce: true,
                            quoted: {
                                key: {
                                    participant: "0@s.whatsapp.net",
                                    remoteJid: "status@broadcast",
                                    fromMe: false,
                                    id: ""
                                },
                                message: {
                                    conversation: `whatsapp Bot by ${global.namaBot}`
                                }
                            }
                        };

                        await shoNhe.sendMessage(update.id, registerMessage);
                    }, 5000);

                } else if (update.action === 'remove') {
                    let randomBackground = await getRandomBackground();

                    let farewellImageURL = `https://api.popcat.xyz/welcomecard?background=${encodeURIComponent(randomBackground)}&text1=${encodeURIComponent(username)}&text2=Goodbye+From+${encodeURIComponent(groupName)}&text3=Becareful&avatar=${encodeURIComponent(profilePicture)}`;

                    let farewellText = `😢 *Selamat Tinggal, ${username}!*
📌 *Group:* ${groupMetadata.subject}
👥 *Sisa Anggota:* ${totalMembers}

Terima kasih telah menjadi bagian dari grup ini. Semoga sukses dalam perjalananmu! 🚀`;

                    let imageBuffer = null;
                    try {
                        let response = await axios.get(farewellImageURL, { responseType: "arraybuffer" });
                        imageBuffer = Buffer.from(response.data);
                    } catch (error) {
                        console.error("❌ Gagal mengambil gambar dari API Popcat:", error);
                    }

                    let buttonMessage = {
                        image: imageBuffer,
                        caption: farewellText,
                        footer: global.namaBot,
                        buttons: [
                            { buttonId: "menu", buttonText: { displayText: "📜 MENU BOT" } },
                            { buttonId: "bikinbot", buttonText: { displayText: "📌 BIKIN BOT" } }
                        ],
                        viewOnce: true,
                        quoted: {
                            key: {
                                participant: "0@s.whatsapp.net",
                                remoteJid: "status@broadcast",
                                fromMe: false,
                                id: ""
                            },
                            message: {
                                conversation: `whatsapp Bot by ${global.namaBot}`
                            }
                        }
                    };

                    await shoNhe.sendMessage(update.id, buttonMessage);
                }
            }
        } catch (error) {
            console.error("❌ Terjadi kesalahan pada fitur welcome/leave:", error);
        }
    });

    // =====[ EVENT: CALL HANDLER (ANTI-CALL) ]=====
    shoNhe.ev.on('call', async (callData) => {
        if (anticall) {
            let botNumber = await shoNhe.decodeJid(shoNhe.user.id);
            console.log(callData);

            for (let user of callData) {
                if (!user.isGroup && user.status === 'offer') {
                    try {
                        let callType = user.isVideo ? '📹 Video Call' : '📞 Voice Call';
                        let warningMessage = `⚠️ *Ups, shoNhe gak bisa menerima panggilan ${callType}.*\n\nMaaf, @${user.from.split('@')[0]}, panggilan seperti ini cuma bikin bot error. Kamu akan diblokir sementara.\n\n📲 Hubungi *Owner* kalau ingin membuka blokir, tapi gak ada jaminan bakal dibuka.`;

                        await shoNhe.rejectCall(user.id, user.from);
                        await shoNhe.sendMessage(user.from, { text: warningMessage, mentions: [user.from] });
                        await shoNhe.sendMessage(user.from, {
                            contacts: {
                                displayName: "Owner",
                                contacts: contacts
                            }
                        });
                        await sleep(5000);
                        await shoNhe.updateBlockStatus(user.from, "block");
                        console.log(`🔒 Pengguna ${user.from} berhasil diblokir karena melakukan panggilan.`);
                    } catch (err) {
                        console.error(`❌ Gagal memproses panggilan dari ${user.from}:`, err);
                    }
                }
            }
        }
    });

    // =====[ EVENT: STATUS VIEW (AUTO-VIEW STATUS) ]=====
    shoNhe.ev.on('messages.upsert', async (chatUpdate) => {
        if (autoswview) {
            const msg = chatUpdate.messages[0];

            if (msg.key && msg.key.remoteJid === 'status@broadcast') {
                try {
                    await shoNhe.readMessages([msg.key]);
                    const caption = msg.message?.extendedTextMessage?.text || null;
                    const mimeType = msg.message?.imageMessage?.mimetype
                        || msg.message?.videoMessage?.mimetype
                        || msg.message?.audioMessage?.mimetype
                        || msg.message?.documentMessage?.mimetype
                        || null;

                    let profilePicture = 'https://files.catbox.moe/vxymmw.jpg';
                    try {
                        profilePicture = await shoNhe.profilePictureUrl(msg.key.participant, 'image');
                    } catch (err) {
                        console.warn('⚠️ Tidak dapat mengambil foto profil, menggunakan foto default.');
                    }

                    let ownerMessage = '';
                    if (!caption && !mimeType) {
                        ownerMessage = `🗑️ *Status telah dihapus oleh pengguna!*\n\n🕒 *Waktu:* ${moment.tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n👤 *Dari:* ${msg.pushName || 'Guest'}\n📱 *Nomor:* ${msg.key.participant.split('@')[0]}`;
                    } else {
                        ownerMessage = `📢 *Bot telah melihat status baru!*\n\n🕒 *Waktu:* ${moment.tz('Asia/Jakarta').format('HH:mm:ss DD/MM/YYYY')}\n👤 *Dari:* ${msg.pushName || 'Guest'}\n📱 *Nomor:* ${msg.key.participant.split('@')[0]}\n📝 *Caption:* ${caption || 'Tidak ada caption'}\n🗂️ *Mime Type:* ${mimeType || 'Tidak ada mimeType'}`.trim();
                    }

                    await shoNhe.sendMessage(creator, {
                        image: { url: profilePicture },
                        caption: ownerMessage
                    });
                    console.log('✅ Status berhasil dikirim ke owner dengan foto profil & informasi.');
                } catch (error) {
                    console.error('❌ Error saat memproses status:', error);
                }
            }
        }
    });

    // =====[ EVENT: ADMIN PROMOTE/DEMOTE NOTIFICATIONS ]=====
    shoNhe.ev.on('group-participants.update', async (anu) => {
        if (adminevent) {
            console.log(anu);
            try {
                let participants = anu.participants;

                for (let num of participants) {
                    try {
                        ppuser = await shoNhe.profilePictureUrl(num, 'image');
                    } catch (err) {
                        ppuser = 'https://files.catbox.moe/vxymmw.jpg';
                    }

                    try {
                        ppgroup = await shoNhe.profilePictureUrl(anu.id, 'image');
                    } catch (err) {
                        ppgroup = 'https://files.catbox.moe/vxymmw.jpg';
                    }

                    if (anu.action == 'promote') {
                        const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
                        const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
                        body = `🎉 *Selamat @${num.split('@')[0]}!* Kamu baru saja dipromosikan menjadi *admin* 🥳\n\nWaktu: ${time}\nTanggal: ${date}`;
                        shoNhe.sendMessage(anu.id, {
                            text: body,
                            contextInfo: {
                                mentionedJid: [num],
                                externalAdReply: {
                                    shoNhewAdAttribution: true,
                                    containsAutoReply: true,
                                    title: "Pemberitahuan Admin",
                                    body: "Selamat Bergabung!",
                                    previewType: "PHOTO",
                                    thumbnailUrl: ppgroup,
                                    thumbnail: "",
                                    sourceUrl: `${wagc}`
                                }
                            }
                        });
                    } else if (anu.action == 'demote') {
                        const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
                        const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
                        body = `😬 *Ups, @${num.split('@')[0]}!* Kamu telah *di-demote* dari posisi *admin*.\n\nWaktu: ${time}\nTanggal: ${date}`;
                        shoNhe.sendMessage(anu.id, {
                            text: body,
                            contextInfo: {
                                mentionedJid: [num],
                                externalAdReply: {
                                    shoNhewAdAttribution: true,
                                    containsAutoReply: true,
                                    title: "Pemberitahuan Admin",
                                    body: "Ada perubahan status admin",
                                    previewType: "PHOTO",
                                    thumbnailUrl: ppgroup,
                                    thumbnail: "",
                                    sourceUrl: `${wagc}`
                                }
                            }
                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    // =====[ EVENT: GROUP SETTINGS UPDATE ]=====
    shoNhe.ev.on('groups.update', async (json) => {
        if (groupevent) {
            try {
                let ppgroup = 'https://files.catbox.moe/vxymmw.jpg';
                try {
                    ppgroup = await shoNhe.profilePictureUrl(json[0].id, 'image');
                } catch (err) {
                    console.warn('⚠️ Gagal dapetin foto grup, pake gambar default aja ya.');
                }

                const res = json[0];

                if (res.announce === true) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '🔒 *Gerbang Grup Ditutup Sementara!* 🔒\n\nSekarang cuma *admin* yang bisa ngobrol di sini. Nunggu aja dulu sampai admin buka lagi.',
                    });
                } else if (res.announce === false) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '🔓 *Gerbang Grup Terbuka Kembali* 🔓\n\nSekarang semua anggota bisa ngobrol lagi di sini. Silakan ikut berpartisipasi.',
                    });
                }

                if (res.restrict === true) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '🔐 *Info Grup Dikunci* 🔐\n\nSaat ini hanya *admin* yang bisa mengedit info grup. Mohon tetap tertib.',
                    });
                } else if (res.restrict === false) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '🔓 *Info Grup Dibuka* 🔓\n\nSemua anggota bisa mengedit info grup. Mohon untuk tetap sopan dan bijak.',
                    });
                }

                if (res.desc) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: `📝 *Deskripsi Baru Nih* 📝\n\nGrup ini punya deskripsi baru lho:\n\n${res.desc}\n\nCek aja, semoga bermanfaat! 🌿`,
                    });
                }

                if (res.subject) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: `🖊️ *Nama Grup Baru* 🖊️\n\nSekarang grup kita punya nama baru:\n\n*${res.subject}*\n\nSemoga makin nyaman di sini! 🌟`,
                    });
                }

                if (res.memberAddMode === true) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '🛡️ *Tambah Anggota? Tertutup Dulu* 🛡️\n\nSekarang cuma *admin* yang bisa nambah anggota baru. Harap patuhi aturan ya. 🌱',
                    });
                } else if (res.memberAddMode === false) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '✅ *Tambah Anggota Bebas* ✅\n\nSekarang semua anggota bisa ngajak teman-temannya masuk grup ini. Yuk, makin ramai! 🌿',
                    });
                }

                if (res.joinApprovalMode === true) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '🛡️ *Pintu Masuk Dijaga Ketat* 🛡️\n\nCalon anggota baru harus dapet *persetujuan admin* dulu ya sebelum bisa gabung. Tetap aman dan tertib! 🌱',
                    });
                } else if (res.joinApprovalMode === false) {
                    await sleep(2000);
                    shoNhe.sendMessage(res.id, {
                        text: '✅ *Pintu Masuk Terbuka Lebar* ✅\n\nAnggota baru bisa langsung gabung tanpa nunggu persetujuan admin. Yuk, tambah ramai di sini! 🌟',
                    });
                }
            } catch (error) {
                console.error('❌ Oops, ada yang error waktu proses pembaruan grup:', error);
            }
        }
    });

    // =====[ EVENT: MESSAGE PROCESSOR (PLUGIN SYSTEM + CASE FALLBACK) ]=====
    shoNhe.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            let msg = chatUpdate.messages[0]
if (!msg || !msg.message) return

// unwrap ephemeral
if (msg.message?.ephemeralMessage?.message) {
    msg.message = msg.message.ephemeralMessage.message
}

// skip system message
if (msg.message?.protocolMessage) return


            if (msg.key && msg.key.remoteJid === 'status@broadcast') return;

            let m = smsg(shoNhe, msg, store);

            const body = m.text || '';
            const prefix = '.';

            // 🔥 kalau bukan command → fallback ke case
            if (!body.startsWith(prefix)) {
                return require("./case")(shoNhe, m, chatUpdate, store);
            }

            const args = body.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            const plugins = getAllPlugins();

            const plugin = plugins.find(p =>
                p.config.name === command ||
                p.config.alias?.includes(command)
            );

            console.log('🔎 CMD:', command);
            console.log('🎯 FOUND:', plugin?.config?.name);

            // 🔥 kalau plugin ketemu → jalanin
            // 🔥 kalau plugin ketemu → jalanin
if (plugin) {
    const user = m.sender;
    const now = Date.now();

    const key = `${user}:${plugin.config.name}`

    // 🔐 PERMISSION CHECK
    if (plugin.config.isOwner && !isOwner) return;
    if (plugin.config.isGroup && !m.isGroup) return;
    if (plugin.config.isPrivate && m.isGroup) return;
    if (!plugin.config.isEnabled) return;

    return await plugin.handler(m, {
        sock: shoNhe,
        args,
        command
    });
}

            // 🔥 kalau gak ada → fallback ke case
            return require("./case")(shoNhe, m, chatUpdate, store);

        } catch (err) {
            console.log(err);
        }
    });

    // =====[ UTILITY: IMAGE RESIZE HELPER ]=====
    const reSize = async (buffer, ukur1, ukur2) => {
        return new Promise(async (resolve, reject) => {
            try {
                const jimp = require("jimp");
                const baper = await jimp.read(buffer);
                const ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG);
                resolve(ab);
            } catch (error) {
                reject(error);
            }
        });
    };

    // =====[ SHONHE UTILITY METHODS ]=====
    // Semua helper method yang ditambahkan ke instance shoNhe

    // Decode JID helper
    shoNhe.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    // Get contact name from store or fallback
    shoNhe.getName = (jid, withoutContact = false) => {
        id = shoNhe.decodeJid(jid);
        withoutContact = shoNhe.withoutContact || withoutContact;
        let v;
        if (id.endsWith('@g.us')) return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = shoNhe.groupMetadata(id) || {};
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'));
        });
        else v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' }
            : id === shoNhe.decodeJid(shoNhe.user.id) ? shoNhe.user
            : (store.contacts[id] || {});
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName
            || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    };

    // Send contact vCards
    shoNhe.sendContact = async (jid, kontak, quoted = '', opts = {}) => {
        let list = [];
        for (let i of kontak) {
            list.push({
                displayName: await shoNhe.getName(i),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await shoNhe.getName(i)}\nFN:${await shoNhe.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
            });
        }
        shoNhe.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted });
    };

    // Public mode flag
    shoNhe.public = true;

    // Serialize message helper
    shoNhe.serializeM = (m) => smsg(shoNhe, m, store);

    // Send text message
    shoNhe.sendText = (jid, text, quoted = '', options) => shoNhe.sendMessage(jid, {
        text: text,
        ...options
    }, { quoted, ...options });

    // Send image message with auto-buffer conversion
    shoNhe.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path
            : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`, `[1], 'base64')
            : /^https?:\/\//.test(path) ? await (await getBuffer(path))
            : fs.existsSync(path) ? fs.readFileSync(path)
            : Buffer.alloc(0);
        return await shoNhe.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted });
    };

    // Send text with @mentions auto-detection
    shoNhe.sendTextWithMentions = async (jid, text, quoted, options = {}) => shoNhe.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, { quoted });

    // Send image as WebP sticker
    shoNhe.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path
            : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`, `[1], 'base64')
            : /^https?:\/\//.test(path) ? await (await getBuffer(path))
            : fs.existsSync(path) ? fs.readFileSync(path)
            : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await imageToWebp(buff);
        }
        await shoNhe.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    // Send audio message with optional PTT (push-to-talk)
    shoNhe.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path
            : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`, `[1], 'base64')
            : /^https?:\/\//.test(path) ? await (await getBuffer(path))
            : fs.existsSync(path) ? fs.readFileSync(path)
            : Buffer.alloc(0);
        return await shoNhe.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted });
    };

    // Send video message with optional GIF playback
    shoNhe.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path
            : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`, `[1], 'base64')
            : /^https?:\/\//.test(path) ? await (await getBuffer(path))
            : fs.existsSync(path) ? fs.readFileSync(path)
            : Buffer.alloc(0);
        return await shoNhe.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted });
    };

    // Send video as WebP animated sticker
    shoNhe.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path
            : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`, `[1], 'base64')
            : /^https?:\/\//.test(path) ? await (await getBuffer(path))
            : fs.existsSync(path) ? fs.readFileSync(path)
            : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }
        await shoNhe.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted });
        return buffer;
    };

    // Send file from URL with auto mime-type detection
    shoNhe.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url);
        mime = res.headers['content-type'];

        if (mime.split("/")[1] === "gif") {
            return shoNhe.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options });
        }

        if (mime === "application/pdf") {
            return shoNhe.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options });
        }

        if (mime.split("/")[0] === "image") {
            return shoNhe.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options });
        }

        if (mime.split("/")[0] === "video") {
            return shoNhe.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options });
        }

        if (mime.split("/")[0] === "audio") {
            return shoNhe.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options });
        }
    };

    // Get file info and buffer from various sources (URL, path, base64, Buffer)
    shoNhe.getFile = async (PATH, save) => {
        let res;
        let data = Buffer.isBuffer(PATH) ? PATH
            : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`, `[1], 'base64')
            : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH))
            : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH))
            : typeof PATH === 'string' ? PATH
            : Buffer.alloc(0);

        let type = await FileType.fromBuffer(data) || { mime: 'application/octet-stream', ext: '.bin' };
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext);

        if (data && save) fs.promises.writeFile(filename, data);

        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        };
    };

    // Send file with auto type detection and optional conversion
    shoNhe.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await shoNhe.getFile(path, true);
        let { res, data: file, filename: pathFile } = type;

        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw { json: JSON.parse(file.toString()) };
            } catch (e) {
                if (e.json) throw e.json;
            }
        }

        let opt = { filename };
        if (quoted) opt.quoted = quoted;
        if (!type) options.asDocument = true;

        let mtype = '', mimetype = type.mime, convert;

        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) {
            convert = await (ptt ? toPTT : toAudio)(file, type.ext);
            file = convert.data;
            pathFile = convert.filename;
            mtype = 'audio';
            mimetype = 'audio/ogg; codecs=opus';
        } else mtype = 'document';

        if (options.asDocument) mtype = 'document';

        delete options.asSticker;
        delete options.asLocation;
        delete options.asVideo;
        delete options.asDocument;
        delete options.asImage;

        let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
        let m;

        try {
            m = await shoNhe.sendMessage(jid, message, { ...opt, ...options });
        } catch (e) {
            m = null;
        } finally {
            if (!m) m = await shoNhe.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
            file = null;
            return m;
        }
    };

    // Modify and copy message to another JID
    shoNhe.cMod = (jid, copy, text = '', sender = shoNhe.user.id, options = {}) => {
        let mtype = Object.keys(copy.message)[0];
        let isEphemeral = mtype === 'ephemeralMessage';
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
        let content = msg[mtype];
        if (typeof content === 'string') msg[mtype] = text || content;
        else if (content.caption) content.caption = text || content.caption;
        else if (content.text) content.text = text || content.text;
        if (typeof content !== 'string') msg[mtype] = { ...content, ...options };
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        copy.key.fromMe = sender === shoNhe.user.id;
        return proto.WebMessageInfo.fromObject(copy);
    };

    // Send media with auto type detection and exif support for stickers
    shoNhe.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await shoNhe.getFile(path, true);
        let { mime, ext, res, data, filename } = types;

        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) }; }
            catch (e) { if (e.json) throw e.json; }
        }

        let type = '', mimetype = mime, pathFile = filename;

        if (options.asDocument) type = 'document';

        if (options.asSticker || /webp/.test(mime)) {
            let { writeExif } = require('./lib/scp/exif');
            let media = { mimetype: mime, data };
            pathFile = await writeExif(media, {
                packname: options.packname ? options.packname : global.packname,
                author: options.author ? options.author : global.author,
                categories: options.categories ? options.categories : [ ]
            });
            await fs.promises.unlink(filename);
            type = 'sticker';
            mimetype = 'image/webp';
        } else if (/image/.test(mime)) type = 'image';
        else if (/video/.test(mime)) type = 'video';
        else if (/audio/.test(mime)) type = 'audio';
        else type = 'document';

        await shoNhe.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options });
        return fs.promises.unlink(pathFile);
    };

    // Copy and forward message (supports viewOnce bypass)
    shoNhe.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype;
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message
                ? message.message.ephemeralMessage.message
                : (message.message || undefined);
            vtype = Object.keys(message.message.viewOnceMessage.message)[0];
            delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined));
            delete message.message.viewOnceMessage.message[vtype].viewOnce;
            message.message = { ...message.message.viewOnceMessage.message };
        }

        let mtype = Object.keys(message.message)[0];
        let content = await generateForwardMessageContent(message, forceForward);
        let ctype = Object.keys(content)[0];
        let context = {};

        if (mtype != 'conversation') context = message.message[mtype].contextInfo;

        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        };

        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {});

        await shoNhe.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id });
        return waMessage;
    };

    // Extract @mentions from text
    shoNhe.parseMention = (text = '') => {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    };

    // Download media from message and save to file
    shoNhe.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension
            ? ('./temp/' + filename + '.' + type.ext)
            : './temp/' + filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };

    // Download media from message and return buffer
    shoNhe.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    };


    // =====[ EVENT: CONTACTS UPDATE (STORE SYNC) ]=====
    shoNhe.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = shoNhe.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            };
        }
    });
    // =====[ EVENT: CREDENTIALS UPDATE ]=====
    shoNhe.ev.on('creds.update', saveCreds);

    return shoNhe;
}

// =====[ EVENT: CONTACTS UPDATE (STORE SYNC) ]=====
// NOTE: Handler ini berada di luar startshoNhe karena bergantung pada store global
//       dan akan dipasang setelah store terinisialisasi via shoNhe instance

// =====[ START THE BOT ]=====
startshoNhe();