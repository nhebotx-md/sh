process.on("uncaughtException", (err) => {});
process.on("unhandledRejection", (reason, promise) => {});



require("./config"); // Memastikan `config.js` dimuat terlebih dahulu
const { default: makeWASocket, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, getContentType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, getAggregateVotesInPollMessage, proto, delay } = require("@itsukichan/baileys");
const { uncache, nocache } = require('./lib/loader');
const { levelUpdate } = require("./lib/leveling"); 
const { color } = require('./lib/color');
const readline = require("readline");
const NodeCache = require("node-cache");
const msgRetryCounterCache = new NodeCache();
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const { Low, JSONFile } = require('./lib/lowdb');
const yargs = require('yargs/yargs');
const fs = require('fs');
const chalk = require('chalk');
const fetch = require('node-fetch');
const FileType = require('file-type');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment-timezone');
const PhoneNumber = require('awesome-phonenumber');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/scp/exif');
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, await, sleep, reSize } = require('./lib/myfunc');
global.autoswview = false;
global.welcome = true;
global.adminevent = true;
global.groupevent = true;
global.anticall = false;
global.public = true;
global.groupOnly = false;
global.privateChatOnly = false;
global.autoBio = true;

const store = makeInMemoryStore({
	logger: pino().child({
		level: 'silent',
		stream: 'store'
	})
});
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

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

	if (global.db.data !== null) return;

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
};

loadDatabase();

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

require('./case.js');
nocache('./case.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'));

const phoneNumber = ownerNumber;
const owner = JSON.parse(fs.readFileSync('./owner.json'));
const contacts = JSON.parse(fs.readFileSync('./src/data/role/contacts.json'));
const usePairingCode = true;
const session = `./${sessionName}`;

const question = (text) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	return new Promise((resolve) => {
		rl.question(text, resolve)
	});
};

const colors = [
    chalk.red,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.magenta,
    chalk.cyan,
  ];

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
    const coloredBanner = chalk.cyan(banner); // Gunakan warna cyan (biru langit)
    
    console.clear(); // Bersihkan konsol
    console.log(coloredBanner); // Tampilkan banner dengan warna tetap
}

displayBanner();

let versionFetchInProgress = false; // Menandakan apakah pengambilan versi sedang berlangsung
let retryFetchTimeout = null; // Menyimpan waktu penundaan untuk mencoba ulang pengambilan versi

async function fetchVersion() {
    // Cek apakah fetch sedang dalam proses untuk mencegah spam
    if (versionFetchInProgress) return;
    
    versionFetchInProgress = true;

    try {
        const response = await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json');
        const data = await response.json();
        return data.version;
    } catch (error) {
        console.log("Error fetching version:", error.message);
        
        // Jika gagal, coba ulang setelah 5 detik
        retryFetchTimeout = setTimeout(() => {
            versionFetchInProgress = false;
            fetchVersion(); // Coba lagi setelah timeout
        }, 5000);
        
        return [2, 3000, 1017531287]; // Versi default jika gagal
    } finally {
        versionFetchInProgress = false;
    }
}

async function startshoNhe() {
    const { state, saveCreds } = await useMultiFileAuthState(session);
    const shoNhe = makeWASocket({
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
            keys: makeCacheableSignalKeyStore(state.keys, pino().child({ 
                level: 'silent', 
                stream: 'store' 
            })), 
        }
    });


	if (!shoNhe.authState.creds.registered) {
    console.clear(); // Membersihkan layar untuk tampilan yang bersih dan misterius
    console.log(chalk.bgBlack.redBright.bold('\n\n💀 [AKSES TERBATAS] 💀\nScript Ini Dijual And Thx Yang Sudah Membeli, Silahkan Bergabung dengan Group WhatsApp dan Channel WhatsApp Yang telah disediakan\n\n❕Channel WhatsApp: https://whatsapp.com/channel/0029Vb0v3F71yT264EejzJ3e\n❕Group WhatsApp: https://chat.whatsapp.com/IvvRbhbWE2RCwknzQYBAPt'));
    console.log(chalk.bgBlack.greenBright.bold('=============================================='));
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Efek loading untuk menambah ketegangan

    console.log(chalk.cyan.bold('\n🔐 Sistem Deteksi: Autentikasi Diperlukan...'));
    await new Promise(resolve => setTimeout(resolve, 1000)); // Efek jeda untuk memberi kesan profesional

    const phoneNumber = await question(chalk.yellowBright.bold('\n⚠️ Masukkan Nomor Whatsapp (Awali dengan 62):\n'));

    console.log(chalk.blueBright.bold('\n📞 Memproses nomor...'));
    await new Promise(resolve => setTimeout(resolve, 1500)); // Efek seolah-olah nomor diproses secara real-time

    const code = await shoNhe.requestPairingCode(phoneNumber.trim());

    await new Promise(resolve => setTimeout(resolve, 2000)); // Jeda untuk menciptakan ketegangan

    console.log(chalk.bgBlack.whiteBright.bold('\n🔓 Kode Pairing Bot Whatsapp kamu:'));
    console.log(chalk.bgBlack.red.bold(`💬 ${code}`));
    
    console.log(chalk.green.bold('\n🚀 Siap untuk melanjutkan koneksi...'));
    console.log(chalk.magenta.bold('==============================================\n'));
}

shoNhe.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === "close") {
        const reason = lastDisconnect?.error ? new Boom(lastDisconnect.error)?.output.statusCode : null;
        
        console.log(chalk.bgBlack.red.bold("⚠️ Koneksi Terputus:"), chalk.yellow(lastDisconnect?.error || "Unknown Error"));

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
    else if (connection === "connecting") {
        console.log(chalk.cyan("🔄 Menghubungkan ke WhatsApp..."));
    } 
    else if (connection === "open") {
        console.clear();
        console.log(chalk.bgBlack.greenBright.bold("\n✅ Bot berhasil tersambung!"));
        try {
            const userJid = shoNhe.user.id;
            await new Promise(resolve => setTimeout(resolve, 2500)); // Jeda tambahan

            const username = shoNhe.user.name || shoNhe.user.id.split('@')[0];

            // *Dapatkan Foto Profil Pengguna*
            let profilePicture;
            try {
                profilePicture = await shoNhe.profilePictureUrl(userJid, "image");
            } catch {
                profilePicture = "https://telegra.ph/file/0d245e2b48196b75efc71.jpg"; // Default jika tidak ditemukan
            }

            // *Ambil Random Background dari Repo*
            async function getRandomBackground() {
                try {
                    let txtUrl = "https://raw.githubusercontent.com/NHEBotx/HelloUserNHEBotx/main/backgrounds.txt";
                    let res = await axios.get(txtUrl);
                    let backgrounds = res.data.split("\n").filter(line => line.trim() !== "");
                    return backgrounds.length > 0 ? backgrounds[Math.floor(Math.random() * backgrounds.length)] : "https://source.unsplash.com/800x400/?technology,ai";
                } catch (error) {
                    console.error("❌ Gagal mendapatkan background:", error);
                    return "https://source.unsplash.com/800x400/?technology,ai"; // Fallback background
                }
            }

            const randomBackground = await getRandomBackground();

            // *URL Welcome Image API*
            let welcomeImageURL = `https://api.popcat.xyz/welcomecard?background=https://i.ibb.co.com/q3BXntPd/20250305-225610.jpg&text1=${encodeURIComponent(username)}&text2=Selamat+Terhubung+Dengan+Bot!&text3=Waktu:+${encodeURIComponent(new Date().toLocaleString())}&avatar=${encodeURIComponent(profilePicture)}`;

            let imageBuffer = null;
            try {
                const response = await axios.get(welcomeImageURL, { responseType: 'arraybuffer' });
                imageBuffer = Buffer.from(response.data, "binary");
            } catch (error) {
                console.error("❌ Gagal mengunduh gambar welcome:", error);
            }

            let messageContent = {
                caption: `🎉 *WELCOME ${username}!* 🎉\n\n🛡️ *NOTIFIKASI SISTEM - KEAMANAN TINGKAT LANJUT* 🛡️\n\n✅ Nomor Anda: *${shoNhe.user.id.split('@')[0]}*\n📅 Waktu Koneksi: *${new Date().toLocaleString()}*\n🚀 Status: *TERHUBUNG*`,
                footer: "INFO BIKIN BOT",
                buttons: [
                    { buttonId: "bikinbot", buttonText: { displayText: "🤖 INFO BIKIN BOT" }, type: 1 },
                    { buttonId: "pilih_paket", buttonText: { displayText: "💰 PILIH PAKET" }, type: 1 }
                ],
                viewOnce: true,
                contextInfo: {
                    externalAdReply: {
                        title: "🔥 BIKIN BOT WA PRIBADI 🔥",
                        body: "Bebas kustom fitur & full support!",
                        sourceUrl: "https://wa.me/6288989971490"
                    }
                }
            };

            if (imageBuffer) {
                messageContent.image = imageBuffer;
            } else {
                messageContent.text = `🚀 *Sistem terhubung!* Selamat datang, ${username}!`;
            }

            await shoNhe.sendMessage(userJid, messageContent, {
                quoted: {
                    key: {
                        participant: "0@s.whatsapp.net",
                        remoteJid: "status@broadcast",
                        fromMe: false,
                        id: ""
                    },
                    message: {
                        conversation: `whatsapp Bot by ${username}`
                    }
                }
            });

            // Efek chat baru (Bru)
            setTimeout(async () => {
                await shoNhe.sendMessage(userJid, { text: "*💬 Informasi Update Pembaruan Script Bot ShoNhe Generation*\n_Join Ke Channel WhatsApp Resmi Developers_\n\n> https://whatsapp.com/channel/0029Vb0v3F71yT264EejzJ3e" });
            }, 2000);

            // Kirim teks iklan setelah delay
            setTimeout(async () => {
                let iklanText = `┏━━━━━━━━━━━━━━━━━━━┓  
┃ 🤖 *JASA PEMBUATAN BOT WHATSAPP*  
┗━━━━━━━━━━━━━━━━━━━┛  
- Hubungi Developers/Admin Dibawah:
> [ wa.me/6288989971490 ] 
> [ wa.me/62882008702155 ]

🔥 *KENAPA HARUS MEMILIKI BOT PRIBADI?*  
✅ *Bebas kustomisasi* sesuai kebutuhan Anda!  
✅ *Anti-banned* dengan fitur keamanan terbaru.  
✅ Cocok untuk *bisnis, komunitas, atau hiburan!*  
✅ *Support penuh* & *update berkala!*  

━━━━━━━━━━━━━━━━━━  
🎁 *PAKET & KEUNTUNGAN*  
━━━━━━━━━━━━━━━━━━  

1️⃣ *Paket Basic - Rp 25K*  
🔗 No Enc SC *V5-V7 Basic*  
▶️ *FREE UPDATE V4-V6*  

📌 *Perbedaan keuntungan:*  
- Update ke versi terbaru *V5-V7* dikenakan biaya tambahan *Rp 10K* per update.  

━━━━━━━━━━━━━━━━━━  

2️⃣ *Paket Premium - Rp 45K*  
🔗 No Enc SC *V5-V8 Premium*  
▶️ *FREE UPDATE V5-V8*  

📌 *Perbedaan keuntungan:*  
- *Gratis update* ke semua fitur & versi *V4-V7* tanpa biaya tambahan.  
- *Dukungan penuh* untuk perbaikan fitur dan permintaan tambahan.  
- Jika membeli di harga *25K*, akan terkena biaya update tambahan.  

━━━━━━━━━━━━━━━━━━  

3️⃣ *Paket Custom - Rp 65K*  
🔗 No Enc SC *V5-V12 Custom*  
▶️ *FREE UPDATE V5-V12*  

📌 *Perbedaan keuntungan:*  
✅ *MASUK GROUP PENGAJARAN/LES:*  
   📋 Update Fitur Bot  
   📋 Pembuatan SC Awal  
   📋 Bimbingan Bikin SC Sendiri  
   📋 Fix Error & Bug  

✅ *Prioritas Utama Custom Service*  
✅ *Bisa Dijual Lagi* dengan harga sesuka hati!  
✅ *Benefit Tambahan:* Support Paid Promote Tata Cara Jual  
✅ *Cukup bayar sekali!* Semua fitur & layanan sudah termasuk dalam harga!  

━━━━━━━━━━━━━━━━━━  

💡 Dengan paket *Custom*, Anda mendapatkan *fitur eksklusif*, *update gratis*, *akses komunitas*, dan *bimbingan langsung* untuk mengembangkan bot Anda sendiri! 🚀  

📩 *Hubungi Admin untuk Pemesanan & Konsultasi!*`;

                await shoNhe.sendMessage(userJid, { text: iklanText });
            }, 5000);

            console.log(chalk.green.bold('\n📬 Notifikasi & Iklan berhasil dikirim ke WhatsApp!'));
        } catch (error) {
            console.error(chalk.red.bold('\n❌ Gagal mengirim notifikasi & iklan:'), error);
        }
    }
});

////tesrlt welcome
async function getRandomBackground() {
    let txtUrl = "https://raw.githubusercontent.com/NHEBotx/HelloUserNHEBotx/refs/heads/main/backgrounds.txt";

    try {
        let response = await axios.get(txtUrl);
        let text = response.data;
        
        let backgrounds = text.split("\n").map(line => line.trim()).filter(line => line);

        if (backgrounds.length === 0) {
            console.error("❌ Tidak ada background tersedia.");
            return "https://files.catbox.moe/umiwpu.jpg"; // Default background jika kosong
        }

        let randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        return randomBackground;
    } catch (error) {
        console.error("❌ Gagal mengambil daftar background:", error);
        return "https://files.catbox.moe/umiwpu.jpg"; // Default background jika error
    }
}

shoNhe.ev.on("group-participants.update", async (update) => {
    try {
        let groupMetadata = await shoNhe.groupMetadata(update.id);
        let participants = update.participants;

        for (let participant of participants) {
            let profilePicture;
            try {
                profilePicture = await shoNhe.profilePictureUrl(participant, "image");
            } catch (error) {
                profilePicture = "https://files.catbox.moe/vxymmw.jpg"; // Default jika tidak ditemukan
            }

            let member = groupMetadata.participants.find(p => p.id === participant);
            let username = update.pushName || member?.name || `@${participant.split("@")[0]}`;
            let totalMembers = groupMetadata.participants.length;
            let groupName = groupMetadata.subject;

            if (update.action === "add") {
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

                // 🔹 Kirim pesan pribadi setelah beberapa detik
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
                                body: "Bebas kustom fitur & full support!",
                                thumbnail: imageBuffer, // Menggunakan gambar welcome sebagai thumbnail
                                sourceUrl: "https://wa.me/6288989971490"
                            }
                        }
                    };

                    await shoNhe.sendMessage(participant, privateMessage);
                }, 3000);
            

                // 🔹 Kirim pesan register di grup setelah 5 detik
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
            

            } else if (update.action === "remove") {
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

	shoNhe.ev.on('call', async (callData) => {
		if (anticall) {
			let botNumber = await shoNhe.decodeJid(shoNhe.user.id);
			console.log(callData);
			for (let user of callData) {
				if (!user.isGroup && user.status === "offer") {
					try {
						let callType = user.isVideo ? '📹 Video Call' : '📞 Voice Call';
						let warningMessage = `⚠️ *Ups, shoNhe gak bisa menerima panggilan ${callType}.*\n\nMaaf, @${user.from.split('@')[0]}, panggilan seperti ini cuma bikin bot error. Kamu akan diblokir sementara.\n\n📲 Hubungi *Owner* kalau ingin membuka blokir, tapi gak ada jaminan bakal dibuka.`;
						await shoNhe.rejectCall(user.id, user.from);
						await shoNhe.sendMessage(user.from, { text: warningMessage, mentions: [user.from] });
						await shoNhe.sendMessage(
							user.from, 
							{
								contacts: {
									displayName: "Owner",
									contacts: contacts
								}
							}
						);
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

	shoNhe.ev.on('messages.upsert', async (chatUpdate) => {
		if (autoswview) {
			const msg = chatUpdate.messages[0];
			if (msg.key && msg.key.remoteJid === 'status@broadcast') {
				try {
					await shoNhe.readMessages([msg.key]);
					const caption = msg.message?.extendedTextMessage?.text || null;
					const mimeType = msg.message?.imageMessage?.mimetype || msg.message?.videoMessage?.mimetype || msg.message?.audioMessage?.mimetype || msg.message?.documentMessage?.mimetype || null;
					let profilePicture = `https://files.catbox.moe/vxymmw.jpg`;
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
						body = `🎉 *Selamat @${num.split("@")[0]}!* Kamu baru saja dipromosikan menjadi *admin* 🥳\n\nWaktu: ${time}\nTanggal: ${date}`;
						shoNhe.sendMessage(anu.id, {
							text: body,
							contextInfo: {
								mentionedJid: [num],
								"externalAdReply": {
									"shoNhewAdAttribution": true,
									"containsAutoReply": true,
									"title": `Pemberitahuan Admin`,
									"body": `Selamat Bergabung!`,
									"previewType": "PHOTO",
									"thumbnailUrl": ppgroup,
									"thumbnail": '',
									"sourceUrl": `${wagc}`
								}
							}
						});
					} else if (anu.action == 'demote') {
						const time = moment.tz('Asia/Jakarta').format('HH:mm:ss');
						const date = moment.tz('Asia/Jakarta').format('DD/MM/YYYY');
						body = `😬 *Ups, @${num.split("@")[0]}!* Kamu telah *di-demote* dari posisi *admin*.\n\nWaktu: ${time}\nTanggal: ${date}`;
						shoNhe.sendMessage(anu.id, {
							text: body,
							contextInfo: {
								mentionedJid: [num],
								"externalAdReply": {
									"shoNhewAdAttribution": true,
									"containsAutoReply": true,
									"title": `Pemberitahuan Admin`,
									"body": `Ada perubahan status admin`,
									"previewType": "PHOTO",
									"thumbnailUrl": ppgroup,
									"thumbnail": '',
									"sourceUrl": `${wagc}`
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

	shoNhe.ev.on("groups.update", async (json) => {
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
						text: `🔒 *Gerbang Grup Ditutup Sementara!* 🔒\n\nSekarang cuma *admin* yang bisa ngobrol di sini. Nunggu aja dulu sampai admin buka lagi.`,
					});
				} else if (res.announce === false) {
					await sleep(2000);
					shoNhe.sendMessage(res.id, {
						text: `🔓 *Gerbang Grup Terbuka Kembali* 🔓\n\nSekarang semua anggota bisa ngobrol lagi di sini. Silakan ikut berpartisipasi.`,
					});
				}

				if (res.restrict === true) {
					await sleep(2000);
					shoNhe.sendMessage(res.id, {
						text: `🔐 *Info Grup Dikunci* 🔐\n\nSaat ini hanya *admin* yang bisa mengedit info grup. Mohon tetap tertib.`,
					});
				} else if (res.restrict === false) {
					await sleep(2000);
					shoNhe.sendMessage(res.id, {
						text: `🔓 *Info Grup Dibuka* 🔓\n\nSemua anggota bisa mengedit info grup. Mohon untuk tetap sopan dan bijak.`,
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
						text: `🛡️ *Tambah Anggota? Tertutup Dulu* 🛡️\n\nSekarang cuma *admin* yang bisa nambah anggota baru. Harap patuhi aturan ya. 🌱`,
					});
				} else if (res.memberAddMode === false) {
					await sleep(2000);
					shoNhe.sendMessage(res.id, {
						text: `✅ *Tambah Anggota Bebas* ✅\n\nSekarang semua anggota bisa ngajak teman-temannya masuk grup ini. Yuk, makin ramai! 🌿`,
					});
				}

				if (res.joinApprovalMode === true) {
					await sleep(2000);
					shoNhe.sendMessage(res.id, {
						text: `🛡️ *Pintu Masuk Dijaga Ketat* 🛡️\n\nCalon anggota baru harus dapet *persetujuan admin* dulu ya sebelum bisa gabung. Tetap aman dan tertib! 🌱`,
					});
				} else if (res.joinApprovalMode === false) {
					await sleep(2000);
					shoNhe.sendMessage(res.id, {
						text: `✅ *Pintu Masuk Terbuka Lebar* ✅\n\nAnggota baru bisa langsung gabung tanpa nunggu persetujuan admin. Yuk, tambah ramai di sini! 🌟`,
					});
				}

			} catch (error) {
				console.error('❌ Oops, ada yang error waktu proses pembaruan grup:', error);
			}
		}
	});

	shoNhe.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        msg = chatUpdate.messages[0];
        if (!msg.message) return;
        msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') 
            ? msg.message.ephemeralMessage.message 
            : msg.message;
        if (msg.key && msg.key.remoteJid === 'status@broadcast') return;
        if (!shoNhe.public && !msg.key.fromMe && chatUpdate.type === 'notify') return;
        if (msg.key.id.startsWith('') && msg.key.id.length === 16) return;
        if (msg.key.id.startsWith('BAE5')) return;
        m = smsg(shoNhe, msg, store);
        require("./case")(shoNhe, m, chatUpdate, store);
    } catch (err) {
        console.log(err);
    }
}); // <--- Ini adalah tanda kurung tutup yang harus ada
const reSize = async (buffer, ukur1, ukur2) => {
		return new Promise(async (resolve, reject) => {
			try {
				const jimp = require('jimp');
				const baper = await jimp.read(buffer);
				const ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG);
				resolve(ab);
			} catch (error) {
				reject(error);
			}
		});
	};
	
	shoNhe.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}

	shoNhe.ev.on('contacts.update', update => {
		for (let contact of update) {
			let id = shoNhe.decodeJid(contact.id)
			if (store && store.contacts) store.contacts[id] = {
				id,
				name: contact.notify
			}
		}
	})

	shoNhe.getName = (jid, withoutContact = false) => {
		id = shoNhe.decodeJid(jid)
		withoutContact = shoNhe.withoutContact || withoutContact
		let v
		if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
			v = store.contacts[id] || {}
			if (!(v.name || v.subject)) v = shoNhe.groupMetadata(id) || {}
			resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
		})
		else v = id === '0@s.whatsapp.net' ? {
			id,
			name: 'WhatsApp'
		} : id === shoNhe.decodeJid(shoNhe.user.id) ? shoNhe.user : (store.contacts[id] || {})
		return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
	}

	shoNhe.sendContact = async (jid, kontak, quoted = '', opts = {}) => {
		let list = []
		for (let i of kontak) {
			list.push({
				displayName: await shoNhe.getName(i),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await shoNhe.getName(i)}\nFN:${await shoNhe.getName(i)}\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Mobile\nEND:VCARD`
			})
		}
		shoNhe.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
	}

	shoNhe.public = true

	shoNhe.serializeM = (m) => smsg(shoNhe, m, store)

	shoNhe.sendText = (jid, text, quoted = '', options) => shoNhe.sendMessage(jid, {
		text: text,
		...options
	}, {
		quoted,
		...options
	})

	shoNhe.sendImage = async (jid, path, caption = '', quoted = '', options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await shoNhe.sendMessage(jid, {
			image: buffer,
			caption: caption,
			...options
		}, {
			quoted
		})
	}

	shoNhe.sendTextWithMentions = async (jid, text, quoted, options = {}) => shoNhe.sendMessage(jid, {
		text: text,
		mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
		...options
	}, {
		quoted
	})

	shoNhe.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split `,` [1], "base64") : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifImg(buff, options)
		} else {
			buffer = await imageToWebp(buff)
		}

		await shoNhe.sendMessage(jid, {
			sticker: {
				url: buffer
			},
			...options
		}, {
			quoted
		})
		return buffer
	}

	shoNhe.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await shoNhe.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
	}

	shoNhe.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
		let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		return await shoNhe.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
	}

	shoNhe.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
		let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
		let buffer
		if (options && (options.packname || options.author)) {
			buffer = await writeExifVid(buff, options)
		} else {
			buffer = await videoToWebp(buff)
		}
		await shoNhe.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
		return buffer
	}

	shoNhe.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
		let mime = '';
		let res = await axios.head(url)
		mime = res.headers['content-type']
		if (mime.split("/")[1] === "gif") {
			 return shoNhe.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
		}
		let type = mime.split("/")[0]+"Message"
		if (mime === "application/pdf"){
			return shoNhe.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
		}
		if (mime.split("/")[0] === "image"){
			return shoNhe.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
		}
		if (mime.split("/")[0] === "video"){
			return shoNhe.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
		}
		if (mime.split("/")[0] === "audio"){
			return shoNhe.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
		}
	}

	shoNhe.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		//if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}

	shoNhe.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
		let type = await shoNhe.getFile(path, true);
		let { res, data: file, filename: pathFile } = type;
		if (res && res.status !== 200 || file.length <= 65536) {
		try {
			throw {
				json: JSON.parse(file.toString())
			};
		} catch (e) {
			if (e.json) throw e.json;
		}
	}
	let opt = {
		filename
	};
	if (quoted) opt.quoted = quoted;
	if (!type) options.asDocument = true;
	let mtype = '',
	mimetype = type.mime,
	convert;
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
			//console.error(e)
			m = null;
		} finally {
			if (!m) m = await shoNhe.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
			file = null;
			return m;
		}
	}

	shoNhe.cMod = (jid, copy, text = '', sender = shoNhe.user.id, options = {}) => {
		//let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
		if (isEphemeral) {
			mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
		}
		let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
		if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
		}
		if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === shoNhe.user.id
		return proto.WebMessageInfo.fromObject(copy)
	}

	shoNhe.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		let types = await shoNhe.getFile(path, true)
		let { mime, ext, res, data, filename } = types
		if (res && res.status !== 200 || file.length <= 65536) {
			try { throw { json: JSON.parse(file.toString()) } }
			catch (e) { if (e.json) throw e.json }
		}
		let type = '', mimetype = mime, pathFile = filename
		if (options.asDocument) type = 'document'
		if (options.asSticker || /webp/.test(mime)) {
			let { writeExif } = require('./lib/scp/exif')
			let media = { mimetype: mime, data }
			pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
			await fs.promises.unlink(filename)
			type = 'sticker'
			mimetype = 'image/webp'
		}
		else if (/image/.test(mime)) type = 'image'
		else if (/video/.test(mime)) type = 'video'
		else if (/audio/.test(mime)) type = 'audio'
		else type = 'document'
		await shoNhe.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
		return fs.promises.unlink(pathFile)
	}

	shoNhe.copyNForward = async (jid, message, forceForward = false, options = {}) => {
		let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}
		let mtype = Object.keys(message.message)[0]
		let content = await generateForwardMessageContent(message, forceForward)
		let ctype = Object.keys(content)[0]
		let context = {}
		if (mtype != "conversation") context = message.message[mtype].contextInfo
		content[ctype].contextInfo = {
			...context,
			...content[ctype].contextInfo
		}
		const waMessage = await generateWAMessageFromContent(jid, content, options ? {
			...content[ctype],
			...options,
			...(options.contextInfo ? {
				contextInfo: {
					...content[ctype].contextInfo,
					...options.contextInfo
				}
			} : {})
		} : {})
		await shoNhe.relayMessage(jid, waMessage.message, { messageId:waMessage.key.id })
		return waMessage
	}

	shoNhe.parseMention = (text = '') => {
		return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	}

	shoNhe.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		let quoted = message.msg ? message.msg : message
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(quoted, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}
		let type = await FileType.fromBuffer(buffer)
		let trueFileName = attachExtension ? ('./temp/' + filename + '.' + type.ext) : './temp/' + filename
		await fs.writeFileSync(trueFileName, buffer)
		return trueFileName
	}

	shoNhe.downloadMediaMessage = async (message) => {
		let mime = (message.msg || message).mimetype || ''
		let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
		const stream = await downloadContentFromMessage(message, messageType)
		let buffer = Buffer.from([])
		for await(const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk])
		}

		return buffer
	}
    shoNhe.ev.on('creds.update', saveCreds)
	return shoNhe
}
startshoNhe();
