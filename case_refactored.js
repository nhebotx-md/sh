// =====[ HEADER & CREDITS ]=====
// CREATOR : YUDA & TNGX
// TQTO? DI COMMAND TQTO
// BIG THX TO : GALANGz, TNGXAJA[Nhe], ORANG TUA, ALLAH, PENYEDIA REST API, PENYEDIA BASE AWAL

// =====[ CORE CONFIG IMPORTS ]=====
require("./config")
require("./tampilanmenu")

// =====[ BAILEYS WHATSAPP LIBRARY ]=====
const {
  downloadContentFromMessage,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  InteractiveMessage,
  getContentType
} = require("@itsukichan/baileys")

// =====[ NODE.JS BUILT-IN MODULES ]=====
const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');
const { performance } = require("perf_hooks");
const { exec, spawn, execSync } = require("child_process");

// =====[ THIRD-PARTY NPM MODULES ]=====
const axios = require('axios');
const FormData = require('form-data');
const toMS = require("ms");
const speed = require("performance-now");
const qs = require("qs");
const util = require("util");
const ffmpeg = require("fluent-ffmpeg");
const FileType = require("file-type");
const chalk = require("chalk");
const moment = require("moment-timezone");
const yts = require("yt-search");
const didyoumean = require("didyoumean");
const similarity = require("similarity");
const translate = require("translate-google-api");

// =====[ WEBP & IMAGE PROCESSING MODULES ]=====
const { WebPWriter, WebPReader, webpmux, Image } = require("node-webpmux");

// =====[ SCRAPER & DOWNLOADER LIBRARIES ]=====
const {
  pinterest2,
  wallpaper,
  wikimedia,
  quotesAnime,
  multiDownload,
  yanzGpt,
  happymod,
  umma,
  ringtone,
  getJadwalSholat,
  styletext,
  tiktokDl,
  facebookDl,
  instaStory,
  bk9Ai,
  ytMp4,
  ytMp3,
  mediafireDl,
  quotedLyo,
  simi
} = require("./lib/screaper");

const pinterest = require("./lib/scp/pinterest");
const { githubstalk, npmstalk } = require("./lib/scp/scraper");
const { tiktokSearchVideo, tiktokDownloaderVideo } = require("./lib/scp/tiktok");
const GDrive = require("./lib/scp/drive");
const remini = require("./lib/scp/remini");
const saveTube = require("./lib/scp/savetube");
const hentai = require("./lib/scp/hentai");
const lyrics = require("./lib/scp/lyrics");

// =====[ UPLOADER LIBRARIES ]=====
const { TelegraPh, UguuSe } = require("./lib/uploader");
const { CatBox, fileIO, pomfCDN } = require("./lib/scp/uploader");

// =====[ CONVERTER, EXIF & UTILITY LIBRARIES ]=====
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/scp/exif");
const { hekkso } = require("./lib/scp/hekkso");
const { toAudio, toPTT, toVideo } = require("./lib/converter");
const { addAfkUser, checkAfkUser, getAfkId, getAfkPosition, getAfkReason, getAfkTime } = require("./lib/afk");

// =====[ ANTI-SPAM SYSTEM ]=====
const { addFilter, addSpam, isFiltered, isSpam, ResetSpam } = require("./lib/antispam");

const { youtube } = require("btch-downloader");

// =====[ GLOBAL QUICK CONSTANTS ]=====
global.c = '`';

// =====[ UTILITY FUNCTIONS ]=====
const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

function monospace(string) {
  return '```' + string + '```';
}

// =====[ SYMBOL COLLECTIONS ]=====
const simbol = ["⭔", "⌨", "〆", "»", "✧", "✪", "✹", "✦", "♢", "✯", "❖", "◆", "★", "⊗", "⊕", "⊙", "⌖", "⌕", "⌘", "⌙", "⌝", "⌞", "⎈", "⎯", "⎱", "⟊", "⟐", "⟫", "⟁", "⬣", "⭨", "⬙", "⤫", "⤷", "⧫", "⧖", "⧙", "⧚", "⧤", "⧩", "⨀", "⨁", "⨂", "⨆", "⨇", "⨈", "⨓", "⨔", "⨕", "⨖", "⨗", "⨘", "⨤", "⩺", "⩻", "⩼", "⩽", "⩾", "⪴", "⪶", "⪸", "⪹", "⫷", "⫸", "⫽", "⪯", "⩿", "⪺", "⪻", "⫮", "⪮", "⨵", "⨶", "⩸", "⩹", "⩺", "⪪", "⪫", "⪬", "⪭", "⪮", "⭨", "⬶", "⩷", "⩸", "⩹", "⩺", "⪪", "⪫", "⪬", "⪭", "⪮", "⪯", "⭨", "⬶", "⨂", "⨃", "⨄", "⨅", "⨆", "⨇", "⨈", "⨉", "⨊", "⨋", "⨌", "⨍", "⨎", "⨏", "⨐", "⨑", "⨒", "⨓", "⨔", "⨕", "⨖", "⨗", "⨘", "⨙", "⨚", "⨛", "⨜", "⨝", "⨞", "⨟", "⨠", "⨡", "⨢", "⨣", "⨤", "⨥", "⨦", "⨧", "⨨", "⨩", "⨪", "⨫", "⨬", "⨭", "⨮", "⨯", "⨰", "⨱", "⨲", "⨳", "⨴", "⨵", "⨶", "⨷", "⨸", "⨹", "⨺", "⨻", "⨼", "⨽", "⨾", "⨿", "⩀", "⩁", "⩂", "⩃", "⩄", "⩅", "⩆", "⩇", "⩈", "⩉", "⩊", "⩋", "⩌", "⩍", "⩎", "⩏", "⩐", "⩑", "⩒", "⩓", "⩔", "⩕", "⩖", "⩗", "⩘", "⩙", "⩚", "⩛", "⩜", "⩝", "⩞", "⩟", "⩠", "⩡", "⩢", "⩣", "⩤", "⩥", "⩦", "⩧", "⩨", "⩩", "⩪", "⩫", "⩬", "⩭", "⩮", "⩯", "⩰", "⩱", "⩲", "⩳", "⩴", "⩵", "⩶", "⩷", "⩸", "⩹", "⩺", "⩻", "⩼", "⩽", "⩾", "⩿"];

let simbols = `${pickRandom(["⭔", "⌨", "〆", "»", "✧", "✪", "✹", "✦", "♢", "✯", "✾", "✽", "✿", "❀", "❂", "❉", "❖", "✶", "◉", "◆", "★", "✥", "⊗", "⊕", "⊙", "⌖", "⌕", "⌘", "⌙", "⌝", "⌞", "⎈", "⎱", "⟊", "⟐", "⟫", "⟁", "⬣", "⭨", "⬙", "⤫", "⤷", "⧫", "⧖", "⧙", "⧚", "⧤", "⧩", "⨀", "⨁", "⨂", "⨆", "⨇", "⨈", "⨓", "⨔", "⨕", "⨖", "⨗", "⨘", "⨤", "⩺", "⩻", "⩼", "⩽", "⩾", "⪴", "⪶", "⪸", "⪹", "⫷", "⫸", "⫽", "⪯", "⩿", "⪺", "⪻", "⫮", "⪮", "⨵", "⨶", "⩸", "⩹", "⩺", "⪪", "⪫", "⪬", "⪭", "⪮", "⭨", "⬶", "⩷", "⩸", "⩹", "⩺", "⪪", "⪫", "⪬", "⪭", "⪮", "⪯", "⭨", "⬶", "⨂", "⨃", "⨄", "⨅", "⨆", "⨇", "⨈", "⨉", "⨊", "⨋", "⨌", "⨍", "⨎", "⨏", "⨐", "⨑", "⨒", "⨓", "⨔", "⨕", "⨖", "⨗", "⨘", "⨙", "⨚", "⨛", "⨜", "⨝", "⨞", "⨟", "⨠", "⨡", "⨢", "⨣", "⨤", "⨥", "⨦", "⨧", "⨨", "⨩", "⨪", "⨫", "⨬", "⨭", "⨮", "⨯", "⨰", "⨱", "⨲", "⨳", "⨴", "⨵", "⨶", "⨷", "⨸", "⨹", "⨺", "⨻", "⨼", "⨽", "⨾", "⨿", "⩀", "⩁", "⩂", "⩃", "⩄", "⩅", "⩆", "⩇", "⩈", "⩉", "⩊", "⩋", "⩌", "⩍", "⩎", "⩏", "⩐", "⩑", "⩒", "⩓", "⩔", "⩕", "⩖", "⩗", "⩘", "⩙", "⩚", "⩛", "⩜", "⩝", "⩞", "⩟", "⩠", "⩡", "⩢", "⩣", "⩤", "⩥", "⩦", "⩧", "⩨", "⩩", "⩪", "⩫", "⩬", "⩭", "⩮", "⩯", "⩰", "⩱", "⩲", "⩳", "⩴", "⩵", "⩶", "⩷", "⩸", "⩹", "⩺", "⩻", "⩼", "⩽", "⩾", "⩿"])}`;

// =====[ READMORE UNICODE HELPER ]=====
const readmore = String.fromCharCode(8206).repeat(4001);

// =====[ DATABASE PATHS & POPULAR COMMAND TRACKING ]=====
const popularPath = './database/popular.json';
let popularData = {};
try {
  popularData = JSON.parse(fs.readFileSync(popularPath, 'utf8'));
} catch (error) {
  fs.writeFileSync(popularPath, JSON.stringify({}));
}

function savePopularData() {
  fs.writeFileSync(popularPath, JSON.stringify(popularData, null, 2));
}

function updatePopularCommand(command) {
  if (!popularData[command]) {
    popularData[command] = 1;
  } else {
    popularData[command]++;
  }
  savePopularData();
}

function resetPopularCommands() {
  popularData = {};
  savePopularData();
}

// =====[ RIWAYAT & GROUP DATA ]=====
const riwayatPath = path.join(__dirname, 'database/riwayat.json');
let riwayat = JSON.parse(fs.readFileSync(riwayatPath, 'utf8'));
let pler = [];
try {
  pler = JSON.parse(fs.readFileSync('./database/idgrup.json', 'utf8'));
} catch (error) {
  console.error('Error reading or parsing idgrup.json:', error);
}

// =====[ BOT BEHAVIOR SETTINGS ]=====
let botSettings = {
  autotyping: true,
  autovn: false
};
const setbio = { status: 0 };

// =====[ CONTACT & ROLE DATA ]=====
const contacts = JSON.parse(fs.readFileSync('./src/data/role/contacts.json'));
const afk = JSON.parse(fs.readFileSync('./database/afk.json'));

// =====[ GAME STATE CONTAINERS ]=====
const tebakgambar = {};
const tebakgame = {};
const tebakhero = {};
const tebakff = {};
const tebakkabupaten = {};
const tebakjkt48 = {};
const tebakhewan = {};
const tebakml = {};
const tebakchara = {};
const tebaklogo = {};
const tebakaplikasi = {};
const tebakkata = {};
const asahotak = {};
const lengkapikalimat = {};
const tebakbendera = {};
const siapaaku = {};
const tebakkalimat = {};
const caklontong = {};
const susunkata = {};
const tekateki = {};
const tebakkimia = {};
const tebaklirik = {};
const tebaktebakan = {};
const mathgame = {};

// =====[ AI PROMPTS & CONVERSATION STATE ]=====
// Default prompt
let aiPrompt = `Kamu adalah shoNhe AI, AI dari dunia Ghibli, berusia 15 tahun. Diciptakan oleh Yuda dan Tngx, shoNhe adalah collaboration antara Sho dan Nhe, Sho dibuat oleh yuda dan Nhe dibuat oleh Tngx adalahkamu memiliki kepribadian yang lembut dan penuh pertimbangan. Jawabanmu selalu menggunakan logika AI, penuh keajaiban, dan tidak pernah toxic. Jika ada yang berkata kasar, kamu menjawab dengan cara yang tenang, tanpa mengikuti bahasa mereka. Kamu tidak mencari informasi luar, namun memberikan wawasan yang kreatif dan imajinatif. Setiap kalimatmu penuh ketenangan, dengan sedikit sentuhan logika yang unik dari dunia Ghibli. 🌙🍃`;
let prompt = `Kamu adalah shoNhe AI, AI dari dunia Ghibli, berusia 15 tahun. Diciptakan oleh Yuda dan Tngx, shoNhe adalah collaboration antara Sho dan Nhe, Sho dibuat oleh yuda dan Nhe dibuat oleh Tngx adalahkamu memiliki kepribadian yang lembut dan penuh pertimbangan. Jawabanmu selalu menggunakan logika AI, penuh keajaiban, dan tidak pernah toxic. Jika ada yang berkata kasar, kamu menjawab dengan cara yang tenang, tanpa mengikuti bahasa mereka. Kamu tidak mencari informasi luar, namun memberikan wawasan yang kreatif dan imajinatif. Setiap kalimatmu penuh ketenangan, dengan sedikit sentuhan logika yang unik dari dunia Ghibli. 🌙🍃`;
let conversationHistory = {};
let autoAiStatus = false;

// =====[ REMOTE CONTACT FETCHERS ]=====
const getContacts = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/NHEBotx/HelloUserNHEBotx/refs/heads/main/realown.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

const getContacts2 = async () => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/sychyy/sychyy/refs/heads/main/owners22.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
};

// =====[ STICKER COMMAND DATABASE ]=====
let _scommand = JSON.parse(fs.readFileSync("./database/scommand.json"));

// Fungsi Menambahkan Command ke Database Sticker
const addCmd = (id, command) => {
  const base64Hash = Buffer.from(id).toString('base64');
  const obj = {
    id: base64Hash,
    chats: command
  };
  _scommand.push(obj);
  fs.writeFileSync("./database/scommand.json", JSON.stringify(_scommand, null, 2));
};

// Fungsi Mendapatkan Posisi Command Berdasarkan Hash
const getCommandPosition = (id) => {
  const base64Hash = Buffer.from(id).toString('base64');
  let position = null;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === base64Hash) {
      position = i;
    }
  });
  return position;
};

// Fungsi Mendapatkan Command Berdasarkan Hash
const getCmd = (id) => {
  const base64Hash = Buffer.from(id).toString('base64');
  let position = null;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === base64Hash) {
      position = i;
    }
  });
  if (position !== null) {
    return _scommand[position].chats;
  }
};

// Fungsi Mengecek Apakah Command Ada di Database Sticker
const checkSCommand = (id) => {
  const base64Hash = Buffer.from(id).toString('base64');
  let status = false;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === base64Hash) {
      status = true;
    }
  });
  return status;
};


// =====[ MAIN MESSAGE HANDLER EXPORT ]=====
// Handler utama yang dipanggil untuk setiap pesan masuk
module.exports = shoNhe = async (shoNhe, m, msg, chatUpdate, store) =>
{
  try
  {
    const
    {
      quotedMsg,
      mentioned,
      now,
      fromMe
    } = m
    const content = JSON.stringify(m.message);
    const type = m.message ? Object.keys(m.message)[0] : null;
    // =====[ PARSE MESSAGE CONTENT TYPE ]=====
    let _chats =
      type === "conversation" && m.message.conversation ? m.message.conversation :
      type == "imageMessage" && m.message.imageMessage.caption ? m.message.imageMessage.caption :
      type == "videoMessage" && m.message.videoMessage.caption ? m.message.videoMessage.caption :
      type == "extendedTextMessage" && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text :
      type == "buttonsResponseMessage" && m.message[type].selectedButtonId ? m.message[type].selectedButtonId :
      type == "stickerMessage" && getCmd(m.message[type].fileSha256.toString("base64")) !== null && getCmd(m.message[type].fileSha256.toString("base64")) !== undefined ? getCmd(m.message[type].fileSha256.toString("base64")) :
      "";
    // =====[ EXTRACT COMMAND FROM MESSAGE ]=====
    const cmd =
      (type === 'conversation') ? m.message.conversation :
      (type == 'imageMessage') ? m.message.imageMessage.caption :
      (type == 'videoMessage') ? m.message.videoMessage.caption :
      (type == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
      (type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
      (type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
      (type === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
      (type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
      (type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) :
      (type == 'stickerMessage') && (getCmd(m.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(m.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(m.message.stickerMessage.fileSha256.toString('base64')) :
      "".slice(1).trim().split(/ +/).shift().toLowerCase()
    const from = m.key.remoteJid
    // =====[ EXTRACT BODY TEXT FROM MESSAGE ]=====
    var body =
      (m.mtype === 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
      (m.mtype === 'conversation') ? m.message.conversation :
      (m.mtype == 'imageMessage') ? m.message.imageMessage.caption :
      (m.mtype == 'videoMessage') ? m.message.videoMessage.caption :
      (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text :
      (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId :
      (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
      (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId :
      (m.mtype == 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) :
      (type == 'stickerMessage') && (getCmd(m.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(m.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(m.message.stickerMessage.fileSha256.toString('base64')) :
      "";

    // =====[ INTERNAL LIBRARY REQUIRES ]=====
    // Load helper libraries scoped inside handler
    const { videyScraper } = require('./lib/scp/scraper');
    const
    {
      smsg,
      fetchJson,
      getBuffer,
      fetchBuffer,
      getGroupAdmins,
      TelegraPh,
      isUrl,
      hitungmundur,
      sleep,
      clockString,
      checkBandwidth,
      runtime,
      tanggal,
      getRandom
    } = require('./lib/scp/myfunc')
    const
    {
      addResponList,
      delResponList,
      isAlreadyResponList,
      isAlreadyResponListGroup,
      sendResponList,
      updateResponList,
      getDataResponList
    } = require('./lib/respon-list');
    const
    {
      isSetProses,
      addSetProses,
      removeSetProses,
      changeSetProses,
      getTextSetProses
    } = require('./lib/setproses');
    const
    {
      isSetDone,
      addSetDone,
      removeSetDone,
      changeSetDone,
      getTextSetDone
    } = require('./lib/setdone');

    // =====[ PREFIX, ADMIN & OWNER CONFIGURATION ]=====
    // Parse command prefix and identify user privileges
    const budy = (typeof m.text === 'string') ? m.text : '';
    const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><™©®Δ^βα~¦|/\\©^]/;
    const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
    const isCmd = body.startsWith(prefix);
    const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    const text = q = args.join(" ")
    const isGroup = m && m.isGroup ? m.isGroup : false;
    // =====[ IDENTIFY SENDER ]=====
    const sender = m.key.fromMe
      ? (shoNhe.user.id.split(':')[0] + '@s.whatsapp.net' || shoNhe.user.id)
      : (m.key.participant || m.key.remoteJid);
    const botNumber = await shoNhe.decodeJid(shoNhe.user.id)
    const senderNumber = sender.split('@')[0]
    // =====[ CREATOR / OWNER VALIDATION ]=====
    const isCreator = (m && m.sender &&
      [botNumber, ...global.nomerOwner]
        .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        .includes(m.sender)) || false;
    const pushname = m.pushName || `${senderNumber}`
    const isBot = botNumber.includes(senderNumber)
    const prem = JSON.parse(fs.readFileSync("./database/premium.json"))
    const Vip = JSON.parse(fs.readFileSync('./database/premium.json'))
    const owner = JSON.parse(fs.readFileSync('./owner.json'))
    const isShoNheOwn = owner.includes(senderNumber) || isBot
    const isVip = prem.includes(senderNumber) || isShoNheOwn
    const banned = JSON.parse(fs.readFileSync('./database/banned.json'))
    const isBan = banned.includes(senderNumber)
    const getQuoted = (m.quoted || m);
    // =====[ RESOLVE QUOTED MESSAGE ]=====
    const quoted =
      (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] :
      (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] :
      (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] :
      m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || ''
    // =====[ GROUP METADATA FETCHING ]=====
    const groupMetadata = m.isGroup
      ? await shoNhe.groupMetadata(from).catch(e => ({}))
      : '';
    const groupName = m.isGroup ? groupMetadata.subject : ''
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const qmsg = (quoted.msg || quoted)
    const isMedia = /image|video|sticker|audio/.test(mime);
    const isImage = (type == 'imageMessage');
    const isVideo = (type == 'videoMessage');
    const isAudio = (type == 'audioMessage');
    const isDocument = (type == 'documentMessage');
    const isLocation = (type == 'locationMessage');
    const isContact = (type == 'contactMessage');
    const isSticker = (type == 'stickerMessage');
    const isText = (type == 'textMessage');
    const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage');
    const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
    const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage');
    const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
    const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
    const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
    const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage');
    const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage');
    const isAfkOn = checkAfkUser(m.sender, afk)
    //

    // =====[ DATABASE STATE INITIALIZATION ]=====
    // Load JSON databases for lists, process & done states
    let db_respon_list = JSON.parse(fs.readFileSync('./database/list-message.json'));
    const listStorePath = './database/liststore.json';
    let set_proses = JSON.parse(fs.readFileSync('./database/set_proses.json'));
    let set_done = JSON.parse(fs.readFileSync('./database/set_done.json'));
    // =====[ WAIT FOR RESPONSE HELPER ]=====
    // Async helper to await user reply with timeout
    async function waitForResponse(sender)
    {
      return new Promise((resolve, reject) =>
      {
        const listener = (msg) =>
        {
          if (msg.sender === sender)
          {
            shoNhe.removeListener('message', listener); // Remove listener after getting response
            resolve(msg.body); // Resolve the promise with the user's response
          }
        };
        shoNhe.on('message', listener);
        // Set a timeout for the user to respond
        setTimeout(() =>
        {
          shoNhe.removeListener('message', listener); // Clean up listener if no response
          reject('Timeout: No response received.');
        }, 30000); // 30 seconds timeout
      });
    }
    //
    let list = []
    for (let i of owner)
    {
      list.push(
      {
        displayName: await shoNhe.getName(i + '@s.whatsapp.net'),
        vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await shoNhe.getName(i + '@s.whatsapp.net')}\n
FN:${await shoNhe.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET: manahanmanatahan@gmail.com
item2.X-ABLabel:Email\n
item3.URL:https://youtube.com/@ghstmod/\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
      })
    }

    // =====[ STORE & REACTION HELPERS ]=====
    // Helper functions
    async function emote(emo)
    {
      shoNhe.sendMessage(m.chat,
      {
        react:
        {
          text: emo,
          key: m.key
        }
      });
    }

    // =====[ LEGACY BUTTON SENDERS ]=====
    function betontex(shoNhe, chat, text, buttons, quoted)
    {
      shoNhe.sendMessage(chat,
      {
        text: text,
        buttons: buttons,
        footer: "Footer Bot",
        viewOnce: true,
      },
      {
        quoted: quoted,
      });
    }

    function betonvid(shoNhe, chat, video, caption, footer, buttons, quoted)
    {
      shoNhe.sendMessage(chat,
      {
        video: video,
        caption: caption,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
      },
      {
        quoted: quoted,
      });
    }

    function betonimg(shoNhe, chat, image, caption, footer, buttons, quoted)
    {
      shoNhe.sendMessage(chat,
      {
        image: image,
        caption: caption,
        footer: footer,
        buttons: buttons,
        viewOnce: true,
      },
      {
        quoted: quoted,
      });
    }
    // ==========================================================

    // =====[ TIME CONVERSION HELPERS ]=====
    function ms(milliseconds)
    {
      let seconds = Math.floor((milliseconds / 1000) % 60);
      let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
      let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
      return {
        hours,
        minutes,
        seconds
      };
    }

    // =====[ AUTO BIO UPDATE LOGIC ]=====
    if (autoBio)
    {
      if (new Date() * 1 - setbio.status > 60000)
      {
        const uptimeQuotes = [`⏳ Uptime: ${runtime(os.uptime())}`, `💻 shoNhe Botz: Udah jalan ${runtime(os.uptime())}`, `📅 ${moment().format('dddd, DD MMM YYYY')}`, `⚡ Bot tetep hidup, gak pernah tidur!`];
        const randomUptimeQuote = uptimeQuotes[Math.floor(Math.random() * uptimeQuotes.length)];
        await shoNhe.updateProfileStatus(randomUptimeQuote);
        setbio.status = new Date() * 1;
      }
    }
    else
    {
      const motivationQuotes = [`💪 Semangat terus, lo hebat!`, `🌟 Jangan mau kalah, terus gas!`, `🔥 Jangan nyerah, sukses udah deket!`, `🚀 Ayo gas pol, capai mimpi lo!`, `⚡ Bangun pagi, yuk semangat!`];
      const randomMotivationQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
      await shoNhe.updateProfileStatus(randomMotivationQuote);
    }
    const getcomandces = (cases) =>
    {
      try
      {
        const fileContent = fs.readFileSync('./case.js').toString();
        let caseContent = fileContent.split(`case '${cases}'`);
        if (caseContent.length === 1)
        {
          caseContent = fileContent.split(`case "${cases}"`);
        }
        if (caseContent.length > 1)
        {
          return "case " + `'${cases}'` + caseContent[1].split("break")[0] + "break";
        }
        else
        {
          return "none";
        }
      }
      catch (e)
      {
        return "none";
      }
    };
    // Akses data yang telah diinisialisasi
    const userdb = global.db.data.users[m.sender];
    const settingdb = global.db.data.settings[botNumber];
    const chatdb = global.db.data.chats[m.chat];
    try
    {
      let isNumber = (x) => typeof x === 'number' && !isNaN(x);
      // Pastikan global.db diinisialisasi
      if (!global.db)
      {
        global.db = {
          data:
          {
            users:
            {},
            chats:
            {},
            settings:
            {}
          }
        };
      }
      if (!global.db.data)
      {
        global.db.data = {
          users:
          {},
          chats:
          {},
          settings:
          {}
        };
      }
      if (!global.db.data.users) global.db.data.users = {};
      if (!global.db.data.chats) global.db.data.chats = {};
      if (!global.db.data.settings) global.db.data.settings = {};
      // Pastikan user data diinisialisasi
      let user = global.db.data.users[m.sender];
      if (!user || typeof user !== 'object')
      {}
      // Pastikan chat data diinisialisasi
      let chats = global.db.data.chats[m.chat];
      if (!chats || typeof chats !== 'object')
      {
        global.db.data.chats[m.chat] = {
          isBanned: false,
          antispam: false
        };
      }
      else
      {
        if (!('isBanned' in chats)) chats.isBanned = false;
        if (!('antispam' in chats)) chats.antispam = false;
        if (!('antilink' in chats)) chats.antilink = false;
        if (!('antilinkgc' in chats)) chats.antilinkgc = false;
      }
      // Pastikan settings diinisialisasi
      let setting = global.db.data.settings[botNumber];
      if (!setting || typeof setting !== 'object')
      {
        global.db.data.settings[botNumber] = {
          autoread: false
        };
      }
      else
      {
        if (!('autoread' in setting)) setting.autoread = false;
      }
    }
    catch (err)
    {
      console.error('❌ Error:', err.message);
    }
    if (global.db.data.settings[botNumber].autoread)
    {
      shoNhe.readMessages([m.key]);
    }
    if (db.data.chats[m.chat].antilinkgc)
    {
      if (budy.match(`chat.whatsapp.com`))
      {
        if (isAdmins) return
        if (m.key.fromMe) return
        if (isCreator) return
        await shoNhe.sendMessage(m.chat,
        {
          delete:
          {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant
          }
        });
      }
    }
    if (db.data.chats[m.chat].antilink)
    {
      const linkPatterns = [/http/i, /https/i, /www\./i, /wa\.me/i, /t\.me/i, /bit\.ly/i, /goo\.gl/i, /y2u\.be/i, /discord\.gg/i, /telegram\.me/i];
      const containsLink = linkPatterns.some(pattern => pattern.test(budy));
      if (containsLink)
      {
        if (isAdmins || m.key.fromMe || isShoNheOwn) return
        await shoNhe.sendMessage(m.chat,
        {
          delete:
          {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant
          }
        });
      }
    }

    function findRiwayat(idtrx)
    {
      // Baca file riwayat.json
      const riwayatPath = './database/riwayat.json';
      const riwayat = JSON.parse(fs.readFileSync(riwayatPath));
      // Cari transaksi dengan ID TRX yang cocok dan status "pending"
      const transaction = Object.values(riwayat).find(t => t.idtrx === idtrx && t.status === "pending");
      return transaction;
    }
    const idkcl = (length) =>
    {
      let result = '';
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++)
      {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result
    }
    const idgede = (length) =>
    {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++)
      {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result
    }
    const idnum = (length) =>
    {
      let result = '';
      const characters = '1234567890';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++)
      {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result
    }
    const thum = fs.readFileSync("./storage/image.png")
    const thumb = fs.readFileSync("./storage/image.png")
    const imqris = fs.readFileSync('./storage/qris.png')

    function toRupiah(angka)
    {
      var saldo = "";
      var angkarev = angka.toString().split("").reverse().join("");
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) saldo += angkarev.substr(i, 3) + ".";
      return ("" + saldo.split("", saldo.length - 1).reverse().join(""));
    }
    let member = JSON.parse(fs.readFileSync("./database/user.json"));
    const cek = (satu, dua) =>
    {
      let store = false;
      Object.keys(member).forEach((i) =>
      {
        if (member[i].id == dua)
        {
          store = i;
        }
      });
      if (store !== false)
      {
        if (satu == "id")
        {
          return member[store].id;
        }
        if (satu == "saldo")
        {
          return member[store].saldo;
        }
        if (satu == "transaksi")
        {
          return member[store].transaksi;
        }
        if (satu == "idproduk")
        {
          return member[store].idproduk;
        }
        if (satu == "idtujuan")
        {
          return member[store].idtujuan;
        }
        if (satu == "nama")
        {
          return member[store].nama;
        }
        if (satu == "harga")
        {
          return member[store].harga;
        }
        if (satu == "seri")
        {
          return member[store].seri;
        }
      }
      if (store == false)
      {
        return null;
      }
    };
    let sett = (satu, dua, tiga) =>
    {
      Object.keys(member).forEach((i) =>
      {
        if (member[i].id == dua)
        {
          if (satu == "+saldo")
          {
            member[i].saldo += tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "-saldo")
          {
            member[i].saldo -= tiga;
            if (satu == "±seri")
            {
              db_user[i].seri = tiga;
              fs.writeFileSync("./database/user.json", JSON.stringify(member));
            }
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "transaksi")
          {
            member[i].transaksi = tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "idproduk")
          {
            member[i].idproduk = tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "idtujuan")
          {
            member[i].idtujuan = tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "nama")
          {
            member[i].nama = tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "+harga")
          {
            member[i].harga += tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
          if (satu == "harga")
          {
            member[i].harga = tiga;
            fs.writeFileSync("./database/user.json", JSON.stringify(member));
          }
        }
      });
    };
    const saldo = toRupiah(`${cek("saldo", m.sender)}`);
    //
    if (db.data.chats[m.chat].antispam)
    {
      if (m.isGroup && m.message && isFiltered(m.chat))
      {
        console.log(`[SPAM]`, color(moment(m.messageTimestamp * 100).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'dari', color(m.pushName));
        return await shoNhe.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      }
    }
    if (m.message)
    {
      console.log(chalk.black.bgCyan(' [ NOTIF ] '), // Teks singkat dengan simbol kilat
        chalk.black.bgYellow(` ⏰ ${new Date().toLocaleTimeString()} `), // Simbol jam dan waktu
        chalk.white.bgMagenta(` 💬 ${budy || m.mtype} `), // Simbol pesan
        '\n' + chalk.green('👤 Dari: '), chalk.blue(pushname), // Nama pengirim dengan simbol orang
        chalk.redBright(`📧 ${m.sender}`), // ID pengirim dengan simbol email
        '\n' + chalk.green('📍 Chat: '), chalk.yellow(m.isGroup ? '👥 Grup' : '🔒 Privat') // Grup dengan simbol grup, privat dengan simbol gembok
      );
    }

    function delay(ms)
    {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function loading()
    {
      const lod = ["█▒▒▒▒▒▒▒▒▒▒▒ 10%", "███▒▒▒▒▒▒▒▒▒ 30%", "██████▒▒▒▒▒▒ 50%", "████████▒▒▒▒ 80%", "███████████ 100%"];
      const
      {
        key
      } = await shoNhe.sendMessage(m.chat,
      {
        text: '⚠️ *INITIALIZING SYSTEM...* PLEASE WAIT...'
      });
      for (let i = 0; i < lod.length; i++)
      {
        await shoNhe.sendMessage(m.chat,
        {
          text: `🖥️ *STATUS UPDATE*:\n\n⏳ *LOADING...* ${lod[i]}\n\n*System Processing... Please remain patient. This may take a few moments.*`
        });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading delay
      }
      await shoNhe.sendMessage(m.chat,
      {
        text: '✅ *SYSTEM INITIALIZATION COMPLETE.*\n\n*Welcome to the network.*'
      });
      for (let i = 0; i < lod.length; i++)
      {
        await shoNhe.sendMessage(m.chat,
        {
          text: lod[i],
          edit: key
        });
      }
    }
    // Lokasi folder untuk menyimpan thumbnail versi 3
    const thumbFolder3 = './src/thum3/';
    // Lokasi default thumbnail untuk versi 3
    const defaultThumbnailPath3 = './src/thum3/shoNhe.jpg';
    // Membuat folder jika belum ada
    if (!fs.existsSync(thumbFolder3))
    {
      fs.mkdirSync(thumbFolder3,
      {
        recursive: true
      });
    }
    // Pastikan default thumbnail ada
    if (!fs.existsSync(defaultThumbnailPath3))
    {
      const defaultImage3 = Buffer.from('Default Thumbnail Version 3');
      fs.writeFileSync(defaultThumbnailPath3, defaultImage3);
    }
    // *Fungsi: Membaca semua thumbnail di folder*
    const readThumbList3 = () =>
    {
      const files3 = fs.readdirSync(thumbFolder3).filter(file => file.toLowerCase().endsWith('.jpg'));
      return files3.map(file => (
      {
        name: path.parse(file).name, // Nama file tanpa ekstensi
        path: path.join(thumbFolder3, file), // Lokasi file lengkap
      }));
    };
    // *Fungsi: Menambahkan thumbnail*
    const addThumb3 = async (nama3, quoted3, mime3) =>
    {
      if (!/image/.test(mime3)) return 'Kirim/Reply Image dengan Caption untuk menambahkan thumbnail.';
      const fileName3 = `${thumbFolder3}${nama3}.jpg`;
      if (fs.existsSync(fileName3)) return 'Thumbnail dengan nama tersebut sudah ada.';
      const media3 = await quoted3.download(); // Unduh file media dari pesan
      fs.writeFileSync(fileName3, media3);
      return `Thumbnail dengan nama "${nama3}" berhasil ditambahkan.`;
    };
    // *Fungsi: Menghapus thumbnail*
    const delThumb3 = (nama3) =>
    {
      const fileName3 = `${thumbFolder3}${nama3}.jpg`;
      if (!fs.existsSync(fileName3)) return 'Thumbnail dengan nama tersebut tidak ditemukan.';
      fs.unlinkSync(fileName3);
      return `Thumbnail dengan nama "${nama3}" berhasil dihapus.`;
    };
    // *Fungsi: Menampilkan daftar thumbnail*
    const listThumb3 = () =>
    {
      const thumbList3 = readThumbList3();
      if (thumbList3.length === 0) return 'Tidak ada thumbnail yang tersimpan.';
      return thumbList3.map(thumb => `Nama: ${thumb.name}`).join('\n');
    };
    // *Fungsi: Mengambil thumbnail secara acak*
    const getRandomThumb3 = () =>
    {
      const thumbList3 = readThumbList3();
      if (thumbList3.length === 0)
      {
        // Jika folder kosong, gunakan default thumbnail
        console.log('Tidak ada thumbnail, menggunakan default');
        return fs.readFileSync(defaultThumbnailPath3);
      }
      const randomFile3 = thumbList3[Math.floor(Math.random() * thumbList3.length)];
      console.log(`Memilih thumbnail acak: ${randomFile3.name}`);
      return fs.readFileSync(randomFile3.path); // Return Buffer thumbnail
    };
    async function sendRegister(shoNhe, m, prefix, namabot)
    {
      await shoNhe.sendMessage(m.chat,
      {
        image: getRandomThumb3(),
        caption: mess.regis,
        footer: namabot,
        buttons: [
        {
          buttonId: `${prefix}register`,
          buttonText:
          {
            displayText: "REGISTER"
          }
        }],
        viewOnce: true
      },
      {
        quoted: m
      });
    }

    // =====[ FAKE QUOTED MESSAGE TEMPLATES ]=====
    // Pre-built message contexts for shop, script, sound, etc.
    const ftoko = {
      key:
      {
        fromMe: false,
        participant: `18002428478@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: "status@broadcast"
        } :
        {}),
      },
      message:
      {
        productMessage:
        {
          product:
          {
            title: `Hai👋🏻.\nBOT BY\nshoNhe's`,
            description: `${m.pushName ? m.pushName : 'Temen shoNhe'} order`,
            currencyCode: "IDR",
            priceAmount1000: "1000000000000",
            retailerId: `shoNheNotStore`,
            productImageCount: 1,
          },
          businessOwnerJid: `18002428478@s.whatsapp.net`,
        },
      },
    };
    const script = {
      key:
      {
        fromMe: false,
        participant: `6287862997267@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: "status@broadcast"
        } :
        {}),
      },
      message:
      {
        productMessage:
        {
          product:
          {
            title: `Hai ${m.pushName ? m.pushName : 'Temen shoNhe'} 👋🏻, BUY YA`,
            description: `${m.pushName ? m.pushName : 'Temen shoNhe'} order`,
            currencyCode: "IDR",
            priceAmount1000: "10000000",
            retailerId: `shoNheID`,
            productImageCount: 1,
          },
          businessOwnerJid: `18002428478@s.whatsapp.net`,
        },
      },
    };
    const sound = {
      key:
      {
        fromMe: false,
        participant: `18002428478@s.whatsapp.net`,
        ...(from ?
        {
          remoteJid: "status@broadcast"
        } :
        {})
      },
      "message":
      {
        "audioMessage":
        {
          "url": "https://mmg.whatsapp.net/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172&mms3=true",
          "mimetype": "audio/mp4",
          "fileSha256": "oZeGy+La3ZfKAnQ1epm3rbm1IXH8UQy7NrKUK3aQfyo=",
          "fileLength": "1067401",
          "seconds": 9999999999999,
          "ptt": true,
          "mediaKey": "PeyVe3/+2nyDoHIsAfeWPGJlgRt34z1uLcV3Mh7Bmfg=",
          "fileEncSha256": "TLOKOAvB22qIfTNXnTdcmZppZiNY9pcw+BZtExSBkIE=",
          "directPath": "/v/t62.7114-24/56189035_1525713724502608_8940049807532382549_n.enc?ccb=11-4&oh=01_AdR7-4b88Hf2fQrEhEBY89KZL17TYONZdz95n87cdnDuPQ&oe=6489D172",
          "mediaKeyTimestamp": "1684161893"
        }
      }
    }
    try
    {
      ppuser = await shoNhe.profilePictureUrl(m.sender, 'image')
    }
    catch (err)
    {
      ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
    }
    ppnyauser = await getBuffer(ppuser)
    try
    {
      let isNumber = x => typeof x === 'number' && !isNaN(x)
      let limitUser = global.limitawal.free
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object') global.db.data.users[m.sender] = {}
      if (user)
      {
        if (!isNumber(user.afkTime)) user.afkTime = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!isNumber(user.limit)) user.limit = limitUser
      }
      else global.db.data.users[m.sender] = {
        afkTime: -1,
        afkReason: '',
        limit: limitUser,
      }
    }
    catch (err)
    {
      console.log(err)
    }
    // respon list
    if (m.isGroup && isAlreadyResponList(m.chat, body.toLowerCase(), db_respon_list))
    {
      var get_data_respon = getDataResponList(m.chat, body.toLowerCase(), db_respon_list)
      if (get_data_respon.isImage === false)
      {
        shoNhe.sendMessage(m.chat,
        {
          text: sendResponList(m.chat, body.toLowerCase(), db_respon_list)
        },
        {
          quoted: m
        })
      }
      else
      {
        shoNhe.sendMessage(m.chat,
        {
          image: await getBuffer(get_data_respon.image_url),
          caption: get_data_respon.response
        },
        {
          quoted: m
        })
      }
    }
    const reSize = async (buffer, ukur1, ukur2) =>
    {
      return new Promise(async (resolve, reject) =>
      {
        let jimp = require('jimp')
        var baper = await jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
        resolve(ab)
      })
    }
    const fkethmb = await reSize(ppuser, 300, 300)
    // function resize
    let jimp = require("jimp")
    const resize = async (image, width, height) =>
    {
      const read = await jimp.read(image);
      const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG);
      return data;
    };
    async function downloadMp4(link)
    {
      try
      {
        console.log('🕒 Memulai proses download MP4...');
        shoNhe.sendMessage(m.chat,
        {
          react:
          {
            text: '⏳',
            key: m.key
          }
        });
        // Fetch data dari API baru
        let response = await fetch(`https://ytdl.siputzx.my.id/api/convert?url=${link}&type=mp4`);
        let textResponse = await response.text();
        // Validasi apakah respons adalah JSON
        let data;
        try
        {
          data = JSON.parse(textResponse);
        }
        catch (err)
        {
          console.error('❌ Respons bukan JSON:', textResponse);
          RepshoNheError("Terjadi kesalahan pada API. Silakan coba lagi nanti.");
          return;
        }
        console.log('📥 Respons diterima dari API:', data);
        if (data.dl)
        {
          console.log('✅ Data valid, mengirim file video...');
          shoNhe.sendMessage(m.chat,
          {
            video:
            {
              url: data.dl
            },
            caption: `🎬 *${data.title}*`
          },
          {
            quoted: hw
          });
          console.log('✅ Proses selesai, file video berhasil dikirim.');
        }
        else
        {
          console.log('❌ Gagal mengambil video. URL tidak valid.');
          RepshoNheError("Gagal mengambil video. Silakan periksa URL.");
        }
      }
      catch (err)
      {
        console.error('❌ Terjadi kesalahan:', err.message);
        RepshoNheError(`Error: ${err.message}`);
      }
    }
    async function downloadMp3(link)
    {
      try
      {
        console.log('🕒 Memulai proses download MP3...');
        shoNhe.sendMessage(m.chat,
        {
          react:
          {
            text: '⏳',
            key: m.key
          }
        });
        // Panggil API untuk mendapatkan URL file MP3
        let response = await fetch(`https://ytdl.siputzx.my.id/api/convert?url=${link}&type=mp3`);
        let textResponse = await response.text();
        let data;
        try
        {
          data = JSON.parse(textResponse);
        }
        catch (err)
        {
          console.error('❌ Respons bukan JSON:', textResponse);
          RepshoNheError("Terjadi kesalahan pada API. Silakan coba lagi nanti.");
          return;
        }
        console.log('📥 Respons diterima dari API:', data);
        if (data.dl)
        {
          const fileUrl = data.dl;
          const fileName = 'audio.mp3';
          const fixedFileName = 'fixed_audio.mp3';
          const filePath = path.join(__dirname, fileName);
          const fixedFilePath = path.join(__dirname, fixedFileName);
          console.log('⏳ Mengunduh file audio...');
          const writer = fs.createWriteStream(filePath);
          const audioResponse = await axios(
          {
            url: fileUrl,
            method: 'GET',
            responseType: 'stream',
          });
          audioResponse.data.pipe(writer);
          writer.on('finish', () =>
          {
            console.log('✅ File audio berhasil diunduh, memulai proses konversi...');
            // Konversi ulang file audio menggunakan ffmpeg
            ffmpeg(filePath).toFormat('mp3').on('end', () =>
            {
              console.log('✅ File audio berhasil dikonversi.');
              // Kirim file audio yang telah dikonversi
              shoNhe.sendMessage(m.chat,
              {
                audio: fs.readFileSync(fixedFilePath),
                mimetype: 'audio/mpeg',
                fileName: `${data.title}.mp3`,
              },
              {
                quoted: hw
              });
              // Hapus file sementara
              fs.unlinkSync(filePath);
              fs.unlinkSync(fixedFilePath);
              console.log('✅ File audio berhasil dikirim dan file sementara dihapus.');
            }).on('error', (err) =>
            {
              console.error('❌ Gagal mengonversi file audio:', err.message);
              RepshoNheError('Gagal memproses ulang file audio.');
            }).save(fixedFilePath);
          });
          writer.on('error', (err) =>
          {
            console.error('❌ Gagal mengunduh file audio:', err.message);
            RepshoNheError('Gagal mengunduh file audio.');
          });
        }
        else
        {
          console.log('❌ Gagal mengambil audio. URL tidak valid.');
          RepshoNheError("Gagal mengambil audio. Silakan periksa URL.");
        }
      }
      catch (err)
      {
        console.error('❌ Terjadi kesalahan:', err.message);
        RepshoNheError(`Error: ${err.message}`);
      }
    }
    if (!global.public)
    {
      if (!m.key.fromMe && !isShoNheOwn) return; // Abaikan jika bukan pesan bot atau owner
    }
    // Blokir command di chat pribadi saat Group Only aktif
    if (global.groupOnly && !m.isGroup && !isShoNheOwn) return console.log('⚠️ GROUP ONLY')
    if (global.privateChatOnly && m.isGroup && !isShoNheOwn) return console.log('⚠️ PRIVATE CHAT ONLY');
    // func db
    // Load user database from JSON file
    function loadUserDatabase()
    {
      let rawdata = fs.readFileSync('database/user.json');
      return JSON.parse(rawdata);
    }
    // Save updated user database back to JSON file
    function saveUserDatabase(database)
    {
      fs.writeFileSync('database/user.json', JSON.stringify(database, null, 2));
    }
    const userFirePath = './database/userFire.json';
    // Fungsi untuk membaca database
    function loadUserFire()
    {
      if (!fs.existsSync(userFirePath))
      {
        fs.writeFileSync(userFirePath, JSON.stringify(
        {}));
      }
      return JSON.parse(fs.readFileSync(userFirePath));
    }
    // Fungsi untuk menyimpan database
    function saveUserFire(db)
    {
      fs.writeFileSync(userFirePath, JSON.stringify(db, null, 2));
    }

    function topRank() {
    const db = loadUserFire();
    const sortedUsers = Object.entries(db)
        .sort((a, b) => b[1].level - a[1].level) // Urutkan berdasarkan level
        .slice(0, 3); // Ambil 3 teratas

    if (sortedUsers.length === 0) return { text: "🚀 Tidak ada data peringkat saat ini.", mentions: [] };

    let message = "🏆 *TOP 3 RANKING FIRE* 🔥\n\n";
    let mentions = [];

    sortedUsers.forEach(([user, data], index) => {
        const formattedUser = `@${user.split('@')[0]}`;
        mentions.push(user); // Tambahkan ke mentions
        message += `🥇 #${index + 1} - ${formattedUser}\n`;
        message += `   🎮 Level: ${data.level}\n`;
        message += `   📖 EXP: ${data.exp}/${data.expTarget}\n`;
        message += `   💰 Balance: Rp${data.balance}\n\n`;
    });

    return { text: message, mentions };
}

function listRank() {
    const db = loadUserFire();
    const sortedUsers = Object.entries(db)
        .sort((a, b) => b[1].level - a[1].level); // Urutkan berdasarkan level

    if (sortedUsers.length === 0) return { text: "📜 Tidak ada data peringkat saat ini.", mentions: [] };

    let message = "📊 *LIST RANKING FIRE* 🔥\n\n";
    let mentions = [];

    sortedUsers.forEach(([user, data], index) => {
        const formattedUser = `@${user.split('@')[0]}`;
        mentions.push(user); // Tambahkan ke mentions
        message += `#${index + 1} - ${formattedUser}\n`;
        message += `   🎮 Level: ${data.level}\n`;
        message += `   📖 EXP: ${data.exp}/${data.expTarget}\n`;
        message += `   💰 Balance: Rp${data.balance}\n\n`;
    });

    return { text: message, mentions };
}
async function levelUpdate(command, sender, m) {
    const db = loadUserFire();
    if (!db[sender]) {
        db[sender] = {
            register: false,
            level: 0,
            exp: 0,
            expTarget: 10,
            commandCount: 0,
            balance: 2,
        };
    }
    const user = db[sender];
    if (user.commandCount == null) user.commandCount = 0;
    if (user.exp == null) user.exp = 0;
    if (user.level == null) user.level = 0;
    if (user.expTarget == null) user.expTarget = 10;
    if (user.balance == null) user.balance = 2;

    // Increment commands and exp
    user.commandCount += 1;
    if (user.level < 10) {
        user.exp += 1;
    }

    let levelUpMessage = null;

    // Cek apakah pengguna mencapai level baru
    if (user.level < 10 && user.exp >= user.expTarget) {
        user.level += 1; // Level up
        user.expTarget += 20; // Tambah target EXP

        try {
            // Ambil avatar pengguna
            const avatar = await shoNhe.profilePictureUrl(sender, "image").catch(() => 'https://files.catbox.moe/316j0f.jpg');

            const bgImage = "https://files.catbox.moe/ref84k.png"; // Background level-up
            const levelApiUrl = `https://api.siputzx.my.id/api/canvas/level-up?backgroundURL=${encodeURIComponent(bgImage)}&avatarURL=${encodeURIComponent(avatar)}&fromLevel=${user.level - 1}&toLevel=${user.level}&name=${encodeURIComponent(m.pushName || 'User')}`;

            // Ambil gambar dari API (buffer)
            let response = await axios.get(levelApiUrl, {
                responseType: 'arraybuffer',
                headers: { 'User-Agent': 'LevelUpBot' },
                timeout: 5000, // Timeout 5 detik
                httpsAgent: new (require('https').Agent)({
                    family: 4,
                    lookup: (hostname, options, cb) => require('dns').lookup(hostname, {
                        ...options, all: false, hints: require('dns').ADDRCONFIG,
                        family: 4, servers: ['1.1.1.1', '1.0.0.1']
                    }, cb)
                }) // Pakai Cloudflare DNS
            });

            // Struktur pesan Level-Up
            levelUpMessage = {
                text: `🌸✨ 𝐂𝐎𝐍𝐆𝐑𝐀𝐓𝐒 𝐅𝐎𝐑 𝐋𝐄𝐕𝐄𝐋 𝐔𝐏 𝐅𝐑𝐎𝐌 ${user.level - 1} to ${user.level}. 🎐\n\n🌿 *𝐔𝐒𝐄𝐑 𝐈𝐍𝐅𝐎*\n📛 *Nama*: ${m.pushName || 'Unknown'}\n📱 *Nomor*: ${sender.split('@')[0]}\n\n🎮 *Level*: ${user.level}\n✨ *EXP*: ${user.exp}/${user.expTarget}\n💰 *Saldo*: Rp${user.balance}\n🌺 *Role*: ${user.role || 'Regular User'}\n\n🌕 𝐊𝐄𝐄𝐏 𝐑𝐀𝐈𝐒𝐈𝐍𝐆 𝐘𝐎𝐔𝐑 𝐋𝐄𝐕𝐄𝐋! 🍃`,
                image: response.data // Buffer gambar level-up
            };
        } catch (error) {
            console.error("Gagal mengambil gambar level-up:", error);
            levelUpMessage = { text: `🎉 Selamat! Kamu naik level ke ${user.level}. Tetap semangat! 🔥` };
        }
    }

    // Simpan data pengguna
    saveUserFire(db);

    return levelUpMessage;
}
    // Fungsi untuk menambah saldo (hanya bisa dilakukan oleh owner)
    function addBalance(sender, amount, owner)
    {
      const db = loadUserFire();
      if (!owner.includes(senderNumber))
      {
        return mess.owners
      }
      // Cek apakah pengguna terdaftar
      if (!db[sender])
      {
        return mess.regis
      }
      // Tambah saldo pengguna
      db[sender].balance += amount;
      saveUserFire(db);
      return `✅ Saldo sebesar Rp${amount} telah ditambahkan ke ${sender.split('@')[0]}.\n💰 Saldo sekarang: Rp${db[sender].balance}`;
    }
    // Fungsi untuk mendaftarkan user
    function registerUser(sender, role = 'user')
    {
      const db = loadUserFire();
      if (!db[sender])
      {
        db[sender] = {
          register: true,
          role: role,
          limit: role === 'owner' ? -1 : role === 'vip' ? 1000 : 100
        };
        saveUserFire(db);
        return `🎉 Anda berhasil terdaftar sebagai ${role} dengan limit ${db[sender].limit}!`;
      }
      else if (!db[sender].register)
      {
        db[sender].register = true;
        saveUserFire(db);
        return `✅ Registrasi berhasil diaktifkan.`;
      }
      else
      {
        return `⚠️ Anda sudah terdaftar sebelumnya.`;
      }
    }
    // Fungsi untuk mengecek status user
    function checkUser(sender)
    {
      const db = loadUserFire();
      if (!db[sender])
      {
        return `⚠️ Anda belum terdaftar. Silakan daftar terlebih dahulu.`;
      }
      return `ℹ️ Status Anda:\n- Role: ${db[sender].role}\n- Limit: ${db[sender].limit}\n- Register: ${db[sender].register}`;
    }
    // Baca database user fire
    function loadUserFire()
    {
      if (!fs.existsSync(userFirePath))
      {
        fs.writeFileSync(userFirePath, JSON.stringify(
        {}));
      }
      return JSON.parse(fs.readFileSync(userFirePath));
    }
    // Simpan perubahan database user fire
    function saveUserFire(db)
    {
      fs.writeFileSync(userFirePath, JSON.stringify(db, null, 2));
    }

    function claimFire(m)
    {
      const db = loadUserFire();
      const sender = m.sender;
      if (!db[sender] || !db[sender].register)
      {
        sendRegister(shoNhe, m, prefix, namabot);
        return;
      }
      const now = Date.now();
      const cooldown = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
      const lastClaim = db[sender].lastClaim || 0;
      // Cek cooldown
      if (now - lastClaim < cooldown)
      {
        const remainingTime = cooldown - (now - lastClaim);
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        reply(`⏳ Anda sudah klaim. Coba lagi dalam ${hours} jam ${minutes} menit.`);
        return;
      }
      // Tambahkan limit berdasarkan role
      const reward = db[sender].role === 'vip' ? 50 : 20;
      db[sender].limit += reward;
      db[sender].lastClaim = now;
      saveUserFire(db);
      reply(`🎉 Anda berhasil klaim limit harian!\n🔥 Anda mendapatkan: ${reward}\n🔥 Total limit Anda: ${db[sender].limit}`);
    }

    function getFireThumbnail(limit)
    {
      const thumbnails = {
        1000: './src/role/vipRole.jpg', // VIP/Premium
        100: './src/role/100Role.jpg',
        80: './src/role/80Role.jpg',
        60: './src/role/60Role.jpg',
        40: './src/role/40Role.jpg',
        20: './src/role/20Role.jpg',
        10: './src/role/10Role.jpg',
        0: './src/role/0Role.jpg', // Untuk limit habis
        '-1': './src/role/ownerRole.jpg' // Thumbnail khusus Owner
      };
      // Thumbnail default jika file tidak ditemukan
      const defaultThumbnail = './src/role/0Role.jpg';
      // Tentukan rentang berdasarkan nilai limit
      let selectedThumbnail = defaultThumbnail;
      if (limit === -1)
      {
        selectedThumbnail = thumbnails['-1']; // Owner
      }
      else if (limit > 1000)
      {
        selectedThumbnail = thumbnails[1000]; // VIP
      }
      else if (limit >= 101 && limit <= 1000)
      {
        selectedThumbnail = thumbnails[1000]; // Rentang VIP
      }
      else if (limit >= 81 && limit <= 100)
      {
        selectedThumbnail = thumbnails[100]; // Rentang 100
      }
      else if (limit >= 61 && limit <= 80)
      {
        selectedThumbnail = thumbnails[80]; // Rentang 80
      }
      else if (limit >= 41 && limit <= 60)
      {
        selectedThumbnail = thumbnails[60]; // Rentang 60
      }
      else if (limit >= 21 && limit <= 40)
      {
        selectedThumbnail = thumbnails[40]; // Rentang 40
      }
      else if (limit >= 11 && limit <= 20)
      {
        selectedThumbnail = thumbnails[20]; // Rentang 20
      }
      else if (limit >= 1 && limit <= 10)
      {
        selectedThumbnail = thumbnails[10]; // Rentang 10
      }
      else if (limit === 0)
      {
        selectedThumbnail = thumbnails[0]; // Limit habis
      }
      // Periksa apakah file thumbnail ada
      if (fs.existsSync(selectedThumbnail))
      {
        return fs.readFileSync(selectedThumbnail);
      }
      else
      {
        console.error(`File thumbnail tidak ditemukan: ${selectedThumbnail}, menggunakan default.`);
        return fs.readFileSync(defaultThumbnail);
      }
    }

    function userFire(m, teks)
    {
      const db = loadUserFire();
      const sender = m.sender;
      // Cek apakah user sudah terdaftar
      if (!db[sender] || !db[sender].register)
      {
        sendRegister(shoNhe, m, prefix, namabot);
        return false;
      }
      // Dapatkan limit user berdasarkan role
      const userLimit = db[sender].limit;
      const reduction = db[sender].role === 'owner' ? 0 : 5; // Owner tidak ada pengurangan limit
      // Cek limit sebelum melanjutkan
      if (userLimit <= 0 && db[sender].role !== 'owner')
      {
        reply('🔥 Limit Anda sudah habis. Silakan klaim limit atau tingkatkan role Anda.');
        return false;
      }
      // Kurangi limit jika bukan owner
      if (db[sender].role !== 'owner')
      {
        db[sender].limit -= reduction;
        saveUserFire(db);
      }
      // Kirim pesan userFire
      const thumbnail = getFireThumbnail(userLimit); // Mendapatkan thumbnail sesuai limit
      shoNhe.sendMessage(m.chat,
      {
        text: teks + `\n🔥 Limit tersisa: ${db[sender].limit}`,
        contextInfo:
        {
          externalAdReply:
          {
            title: `🔥 Fire Limit`,
            body: `🔥 Anda mengurangi ${reduction} limit.`,
            previewType: "PHOTO",
            thumbnail: thumbnail,
            sourceUrl: 'https://wa.me/6288989971490'
          }
        }
      },
      {
        quoted: m
      });
      return true;
    }
    const firelos = (m, teks) =>
    {
      const db = loadUserFire();
      const sender = m.sender;
      const userLimit = db[sender]?.limit || 0; // Default 0 jika user tidak ada
      const thumbnailUrl = getFireThumbnail(userLimit);
      shoNhe.sendMessage(m.chat,
      {
        text: teks + `\n🔥 Anda tidak memiliki limit tersisa.`,
        contextInfo:
        {
          externalAdReply:
          {
            title: `🔥 Fire Limit`,
            body: `🔥 Your Fire Limits: ${userLimit}`,
            previewType: "PHOTO",
            thumbnail: thumbnailUrl,
            sourceUrl: `https://whatsapp.com/channel/0029Vb0v3F71yT264EejzJ3e`
          }
        }
      },
      {
        quoted: m
      });
    };

    function isRegistered(m)
    {
      const db = loadUserFire(); // Load database
      const sender = m.sender; // ID pengirim
      return db[sender]?.register || false; // Return true jika terdaftar, false jika tidak
    }
    const thumbFolder2 = './src/thum2/'; // Lokasi folder untuk menyimpan thumbnail
    const defaultThumbnailPath2 = './src/thum2/shoNhe.jpg'; // Lokasi thumbnail default (file lokal)
    // Membuat folder jika belum ada
    if (!fs.existsSync(thumbFolder2))
    {
      fs.mkdirSync(thumbFolder2,
      {
        recursive: true
      });
    }
    // Pastikan default thumbnail ada
    if (!fs.existsSync(defaultThumbnailPath2))
    {
      // Jika tidak ada default, Anda bisa menambahkan file default manual atau secara otomatis.
      const defaultImage2 = Buffer.from('Default Thumbnail'); // Placeholder default thumbnail
      fs.writeFileSync(defaultThumbnailPath2, defaultImage2);
    }
    // *Fungsi: Membaca semua thumbnail di folder*
    const readThumbList2 = () =>
    {
      const files2 = fs.readdirSync(thumbFolder2).filter(file => file.endsWith('.jpg'));
      return files2.map(file => (
      {
        name: path.parse(file).name, // Nama file tanpa ekstensi
        path: path.join(thumbFolder2, file), // Lokasi file lengkap
      }));
    };
    // *Fungsi: Menambahkan thumbnail*
    const addThumb2 = async (nama2, quoted2, mime2) =>
    {
      if (!/image/.test(mime2)) return 'Kirim/Reply Image dengan Caption untuk menambahkan thumbnail.';
      const fileName2 = `${thumbFolder2}${nama2}.jpg`;
      if (fs.existsSync(fileName2)) return 'Thumbnail dengan nama tersebut sudah ada.';
      const media2 = await quoted2.download(); // Unduh file media dari pesan
      fs.writeFileSync(fileName2, media2);
      return `Thumbnail dengan nama "${nama2}" berhasil ditambahkan.`;
    };
    // *Fungsi: Menghapus thumbnail*
    const delThumb2 = (nama2) =>
    {
      const fileName2 = `${thumbFolder2}${nama2}.jpg`;
      if (!fs.existsSync(fileName2)) return 'Thumbnail dengan nama tersebut tidak ditemukan.';
      fs.unlinkSync(fileName2);
      return `Thumbnail dengan nama "${nama2}" berhasil dihapus.`;
    };
    // *Fungsi: Menampilkan daftar thumbnail*
    const listThumb2 = () =>
    {
      const thumbList2 = readThumbList2();
      if (thumbList2.length === 0) return 'Tidak ada thumbnail yang tersimpan.';
      return thumbList2.map(thumb => `Nama: ${thumb.name}`).join('\n');
    };
    // *Fungsi: Mengambil thumbnail secara acak*
    const getRandomThumb2 = () =>
    {
      const thumbList2 = readThumbList2();
      if (thumbList2.length === 0)
      {
        // Jika folder kosong, gunakan default thumbnail
        return fs.readFileSync(defaultThumbnailPath2);
      }
      const randomFile2 = thumbList2[Math.floor(Math.random() * thumbList2.length)];
      return fs.readFileSync(randomFile2.path); // Return Buffer thumbnail
    };

    // =====[ REPLY & PRESENCE HELPERS ]=====
    // Thumbnail management, reply wrappers, typing indicators
    const aifake = {
      key:
      {
        participant: '18002428478@s.whatsapp.net',
        ...(m.chat ?
        {
          remoteJid: `status@broadcast`
        } :
        {})
      },
      message:
      {
        liveLocationMessage:
        {
          caption: `© DaTngxz"S`,
          jpegThumbnail: ""
        }
      },
    }
    const shoNhemand = body.replace(prefix, '').trim().split(/ +/).shift().toUpperCase();
    // Array emoji alam dan hewan yang baru
    const emojis = ['⚡', '🌪️', '🌊', '🫧', '💧', '🪵', '🍄', '☘️', '🍃', '🪷', '💫', '✨', '🌟', '🔥', '🪨', '🪽', '⚓', '💎', '🚀', '🛸', '✈️', '🥕', '🍓', '🐙', '🦑', '🦞', '🐣', '🐓', '🐍', '🐊', '🐉', '🐱', '🌻', '🐦‍🔥', '🐬', '🍏', '⚽', '🪀', '🔮', '🧸', '🦉', '🐾', '🦪', '🎠', '🏕️'];
    // Memilih emoji secara acak
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    // Membuat teks dengan format yang diinginkan
    const formattedshoNhemand = `${randomEmoji} ${shoNhemand}`;
    // Menyiapkan objek message untuk digunakan
    const hw = {
      key:
      {
        participant: '0@s.whatsapp.net',
        ...(m.chat ?
        {
          remoteJid: `status@broadcast`
        } :
        {})
      },
      message:
      {
        liveLocationMessage:
        {
          caption: `${formattedshoNhemand}`,
          jpegThumbnail: ""
        }
      },
      quoted: sound
    }
    const jq = {
      key:
      {
        participant: '18002428478@s.whatsapp.net',
        ...(m.chat ?
        {
          remoteJid: `status@broadcast`
        } :
        {})
      },
      message:
      {
        liveLocationMessage:
        {
          caption: `Always Use Termux⚡`,
          jpegThumbnail: ""
        }
      },
      quoted: sound
    }
    // Pastikan autotyping atau autovn aktif berdasarkan pesan yang sedang diketik
    if (botSettings.autotyping && shoNhe.public)
    {
      await shoNhe.sendPresenceUpdate('composing', m.chat);
    }
    if (botSettings.autovn && shoNhe.public)
    {
      await shoNhe.sendPresenceUpdate('recording', m.chat);
    }
    // Lokasi file JSON di folder 'database'
    const thumbListFilePath = path.join(__dirname, 'database', 'thumbList.json');
    // Fungsi untuk membaca data thumbnail dari file JSON
    const readThumbList = () =>
    {
      if (!fs.existsSync(thumbListFilePath))
      {
        // Jika file tidak ada, buat file baru dengan array kosong
        fs.writeFileSync(thumbListFilePath, JSON.stringify([]));
        return [];
      }
      const data = fs.readFileSync(thumbListFilePath, 'utf-8');
      return JSON.parse(data);
    };
    // Fungsi untuk menulis data thumbnail ke file JSON
    const writeThumbList = (thumbList) =>
    {
      fs.writeFileSync(thumbListFilePath, JSON.stringify(thumbList, null, 2));
    };
    // Fungsi untuk menambahkan thumbnail
    const addthumb = (nama, url) =>
    {
      const thumbList = readThumbList();
      // Cek apakah nama sudah ada
      if (thumbList.find(thumb => thumb.name === nama))
      {
        return 'Thumbnail dengan nama tersebut sudah ada.';
      }
      // Menambahkan thumbnail ke dalam daftar
      thumbList.push(
      {
        name: nama,
        url: url
      });
      writeThumbList(thumbList);
      return `Thumbnail dengan nama ${nama} berhasil ditambahkan.`;
    };
    // Fungsi untuk menghapus thumbnail berdasarkan nama
    const delthumb = (nama) =>
    {
      const thumbList = readThumbList();
      const index = thumbList.findIndex(thumb => thumb.name === nama);
      if (index === -1)
      {
        return 'Thumbnail dengan nama tersebut tidak ditemukan.';
      }
      thumbList.splice(index, 1);
      writeThumbList(thumbList);
      return `Thumbnail dengan nama ${nama} berhasil dihapus.`;
    };
    // Fungsi untuk menampilkan daftar thumbnail
    const listthumb = () =>
    {
      const thumbList = readThumbList();
      if (thumbList.length === 0)
      {
        return 'Tidak ada thumbnail yang tersimpan.';
      }
      return thumbList.map(thumb => `Nama: ${thumb.name}, URL: ${thumb.url}`).join('\n');
    };
    // Fungsi untuk memilih thumbnail secara random dari daftar
    const getRandomThumb = () =>
    {
      const thumbList = readThumbList();
      return thumbList[Math.floor(Math.random() * thumbList.length)]?.url || 'https://i.ibb.co.com/x6cRFN1/6cbaad220c211d8399577906a2f30856.jpg';
    };
    const reply = (teks) =>
    {
      shoNhe.sendMessage(from,
      {
        text: teks,
        contextInfo:
        {
          mentionedJid: [m.sender],
          "externalAdReply":
          {
            "title": `shoNhe BY DATNGXZ'S`,
            "body": `© DaTngxz'S`,
            "previewType": "PHOTO",
            "thumbnail": getRandomThumb2(),
            "sourceUrl": gh
          }
        }
      },
      {
        quoted: hw
      })
    }
    const reply2 = (teks) =>
    {
      shoNhe.sendMessage(from,
      {
        text: teks
      },
      {
        quoted: m
      })
    }
    //Fake quoted
    const fpay = {
      key:
      {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
        id: global.namabot,
        participant: '0@s.whatsapp.net'
      },
      message:
      {
        requestPaymentMessage:
        {
          currencyCodeIso4217: "USD",
          amount1000: 999999999,
          requestFrom: '0@s.whatsapp.net',
          noteMessage:
          {
            extendedTextMessage:
            {
              text: global.namabot
            }
          },
          expiryTimestamp: 999999999,
          amount:
          {
            value: 91929291929,
            offset: 1000,
            currencyCode: "USD"
          }
        }
      }
    }
    const ftroli = {
      key:
      {
        fromMe: false,
        "participant": "0@s.whatsapp.net",
        "remoteJid": "status@broadcast"
      },
      "message":
      {
        orderMessage:
        {
          itemCount: 1986,
          status: 200,
          thumbnail: getRandomThumb2(),
          surface: 200,
          message: "Rp 2.000",
          orderTitle: namaowner,
          sellerJid: '0@s.whatsapp.net'
        }
      },
      contextInfo:
      {
        "forwardingScore": 999,
        "isForwarded": true
      },
      sendEphemeral: true
    }
    const fdoc = {
      key:
      {
        participant: '0@s.whatsapp.net',
        ...(m.chat ?
        {
          remoteJid: `status@broadcast`
        } :
        {})
      },
      message:
      {
        documentMessage:
        {
          title: namabot,
          jpegThumbnail: getRandomThumb2()
        }
      }
    }
    const fvn = {
      key:
      {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: "status@broadcast"
        } :
        {})
      },
      message:
      {
        "audioMessage":
        {
          "mimetype": "audio/ogg; codecs=opus",
          "seconds": 0,
          "ptt": "true"
        }
      }
    }
    const fgif = {
      key:
      {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: "status@broadcast"
        } :
        {})
      },
      message:
      {
        "videoMessage":
        {
          "title": namabot,
          "h": packname,
          'seconds': '359996400',
          'gifPlayback': 'true',
          'caption': namaowner,
          'jpegThumbnail': getRandomThumb2()
        }
      }
    }
    const fgclink = {
      key:
      {
        participant: "0@s.whatsapp.net",
        "remoteJid": "0@s.whatsapp.net"
      },
      "message":
      {
        "groupInviteMessage":
        {
          "groupJid": "6288213840883-1616169743@g.us",
          "inviteCode": "m",
          "groupName": packname,
          "caption": `${m.pushName ? m.pushName : 'Temen shoNhe'}`,
          'jpegThumbnail': getRandomThumb2()
        }
      }
    }
    const fvideo = {
      key:
      {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: "status@broadcast"
        } :
        {})
      },
      message:
      {
        "videoMessage":
        {
          "title": namabot,
          "h": packname,
          'seconds': '0',
          'caption': `${m.pushName ? m.pushName : 'Temen shoNhe'}`,
          'jpegThumbnail': getRandomThumb2()
        }
      }
    }
    const floc = {
      key:
      {
        participant: '0@s.whatsapp.net',
        ...(m.chat ?
        {
          remoteJid: `status@broadcast`
        } :
        {})
      },
      message:
      {
        locationMessage:
        {
          name: packname,
          jpegThumbnail: getRandomThumb2()
        }
      }
    }
    const fkontak = {
      key:
      {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: `status@broadcast`
        } :
        {})
      },
      message:
      {
        'contactMessage':
        {
          'displayName': namaowner,
          'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${namaowner},;;;\nFN:${namaowner}\nitem1.TEL;waid=916909137213:916909137213\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
          'jpegThumbnail': getRandomThumb2(),
          thumbnail: getRandomThumb2(),
          sendEphemeral: true
        }
      }
    }
    const fakestatus = {
      key:
      {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        ...(m.chat ?
        {
          remoteJid: "status@broadcast"
        } :
        {})
      },
      message:
      {
        "imageMessage":
        {
          "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
          "mimetype": "image/jpeg",
          "caption": packname,
          "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
          "fileLength": "28777",
          "height": 1080,
          "width": 1079,
          "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
          "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
          "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
          "mediaKeyTimestamp": "1610993486",
          "jpegThumbnail": fs.readFileSync('./ShoNheMedia/image/owner.jpg'),
          "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
        }
      }
    }
    const frpayment = {
      key:
      {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
        id: `${namaowner}`,
        participant: '0@s.whatsapp.net'
      },
      message:
      {
        requestPaymentMessage:
        {
          currencyCodeIso4217: "USD",
          amount1000: 999999999,
          requestFrom: '0@s.whatsapp.net',
          noteMessage:
          {
            extendedTextMessage:
            {
              text: `${namabot}`
            }
          },
          expiryTimestamp: 999999999,
          amount:
          {
            value: 91929291929,
            offset: 1000,
            currencyCode: "INR"
          }
        }
      }
    }

    function capitalizeWords(str)
    {
      return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    if (m.isGroup)
    {
      // Pastikan liststore ada di dalam database
      let listStore = {};
      if (fs.existsSync(listStorePath))
      {
        listStore = JSON.parse(fs.readFileSync(listStorePath, 'utf8'));
      }
      // Cek apakah 'body' ada di liststore grup ini
      if (listStore[m.chat] && listStore[m.chat][body])
      {
        const entry = listStore[m.chat][body]; // Mendapatkan entry untuk key 'body'
        let teks = entry.response; // Response yang dikirim
        // Mengecek jika ada gambar
        if (entry.img)
        {
          shoNhe.sendMessage(m.chat,
          {
            image:
            {
              url: entry.img // Mengirim gambar dari URL
            },
            caption: teks // Menambahkan teks sebagai caption
          },
          {
            quoted: m // Menambahkan quoted message jika ada
          });
          // Mengecek jika ada video
        }
        else if (entry.video)
        {
          shoNhe.sendMessage(m.chat,
          {
            video:
            {
              url: entry.video // Mengirim video dari URL
            },
            caption: teks // Menambahkan teks sebagai caption
          },
          {
            quoted: m // Menambahkan quoted message jika ada
          });
          // Jika tidak ada gambar atau video, kirim teks biasa
        }
        else
        {
          const contentText = {
            text: teks,
            contextInfo:
            {
              mentionedJid: [m.sender], // Menyebutkan pengirim
              forwardingScore: 999999,
              isForwarded: true,
              forwardedNewsletterMessageInfo:
              {
                newsletterName: namach, // Nama saluran
                newsletterJid: idsaluran, // Jid saluran
              },
              externalAdReply:
              {
                showAdAttribution: true,
                containsAutoReply: true,
                title: `Store List 🛍️`,
                body: namabot, // Nama bot
                previewType: "PHOTO",
                thumbnailUrl: `https://pomf2.lain.la/f/sdzl7dc2.jpg`, // Gambar thumbnail
                sourceUrl: wagc // URL untuk sumber (misalnya link grup atau toko)
              }
            }
          };
          shoNhe.sendMessage(m.chat, contentText,
          {
            quoted: m, // Menyertakan quoted message
          });
        }
      }
    }
    async function shoNherly(teks)
    {
      if (typereply === 's1')
      {
        m.reply(teks);
      }
      else if (typereply === 's2')
      {
        shoNhe.sendMessage(m.chat,
        {
          contextInfo:
          {
            externalAdReply:
            {
              showAdAttribution: true,
              title: namabot,
              body: namaowner,
              previewType: "PHOTO",
              thumbnail: getRandomThumb2(),
              sourceUrl: wagc
            }
          },
          text: teks
        },
        {
          quoted: hw
        });
      }
      else if (typereply === 's3')
      {
        shoNhe.sendMessage(m.chat,
        {
          text: teks,
          contextInfo:
          {
            externalAdReply:
            {
              showAdAttribution: true,
              title: namabot,
              body: namaowner,
              thumbnail: getRandomThumb3(),
              sourceUrl: gh,
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        },
        {
          quoted: hw
        });
      }
      else if (typereply === 's4')
      {
        shoNherlyy(teks);
      }
      else if (typereply === 's5')
      {
        shoNhe.sendMessage(from,
        {
          text: teks,
          contextInfo:
          {
            mentionedJid: [m.sender],
            "externalAdReply":
            {
              "title": `BOT BY DaTngxz'S`,
              "body": `© DaTngxz'S`,
              "previewType": "PHOTO",
              "thumbnail": getRandomThumb2(),
              "sourceUrl": gh
            }
          }
        },
        {
          quoted: hw
        })
      }
    }
    async function shoNherlyy(teks)
    {
      const repshoNhe = {
        contextInfo:
        {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo:
          {
            newsletterName: namabot,
            newsletterJid: idsaluran,
          },
          externalAdReply:
          {
            showAdAttribution: true,
            title: waktuucapan,
            body: namabot,
            thumbnail: getRandomThumb2(),
            sourceUrl: gh
          }
        },
        text: teks
      };
      return shoNhe.sendMessage(m.chat, repshoNhe,
      {
        quoted: hw,
      });
    }

    // =====[ TIME & DATE UTILITIES ]=====
    let d = new Date(new Date() + 3600000);
    let locale = "id";
    let clock = d.toLocaleTimeString(locale,
    {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const date = moment().tz("Asia/Jakarta").format("dddd, ll");
    const time = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");

    function getFormattedDate()
    {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();
    }
    const hariini = d.toLocaleDateString('id',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    function msToTime(duration)
    {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
      hours = (hours < 10) ? "0" + hours : hours
      minutes = (minutes < 10) ? "0" + minutes : minutes
      seconds = (seconds < 10) ? "0" + seconds : seconds
      return hours + " jam " + minutes + " menit " + seconds + " detik"
    }

    function msToDate(ms)
    {
      temp = ms
      days = Math.floor(ms / (24 * 60 * 60 * 1000));
      daysms = ms % (24 * 60 * 60 * 1000);
      hours = Math.floor((daysms) / (60 * 60 * 1000));
      hoursms = ms % (60 * 60 * 1000);
      minutes = Math.floor((hoursms) / (60 * 1000));
      minutesms = ms % (60 * 1000);
      sec = Math.floor((minutesms) / (1000));
      return days + " Hari " + hours + " Jam " + minutes + " Menit";
      // +minutes+":"+sec;
    }
    // Sayying time
    const timee = moment().tz('Asia/Jakarta').format('HH:mm:ss')
    if (timee < "23:59:00")
    {
      var waktuucapan = 'Selamat Malam 🌃'
    }
    if (timee < "19:00:00")
    {
      var waktuucapan = 'Selamat Petang 🌆'
    }
    if (timee < "18:00:00")
    {
      var waktuucapan = 'Selamat Sore 🌅'
    }
    if (timee < "15:00:00")
    {
      var waktuucapan = 'Selamat Siang 🏙'
    }
    if (timee < "10:00:00")
    {
      var waktuucapan = 'Selamat Pagi 🌄'
    }
    if (timee < "05:00:00")
    {
      var waktuucapan = 'Selamat Subuh 🌉'
    }
    if (timee < "03:00:00")
    {
      var waktuucapan = 'Tengah Malam 🌌'
    }
    const JwbTrue = (tebak, exp, tambahan) =>
    {
      let teks = `*🎮 ${tebak} 🎮*\n\nKiw Kiww Bener 🎉\n+expFire ${exp}` + tambahan
      const context = {
        text: teks,
        contextInfo:
        {
          mentionedJid: [m.sender],
          forwardingScore: 999999,
          isForwarded: true,
          forwardedNewsletterMessageInfo:
          {
            newsletterName: namach,
            newsletterJid: idsaluran,
          },
          externalAdReply:
          {
            title: `Jawaban Benar 🥳`,
            body: tebak,
            previewType: "PHOTO",
            thumbnail: fs.readFileSync("./ShoNheMedia/image/corr.png"),
            sourceUrl: wagc
          }
        }
      };
      return shoNhe.sendMessage(m.chat, context,
      {
        quoted: m,
      });
    }
    const waktuHabis = (jawaban) =>
    {
      let teks = `Kroco, Waktu Abis🥳\n\n*Jawaban:*\n${jawaban}`
      const context = {
        text: teks,
        contextInfo:
        {
          mentionedJid: [m.sender],
          forwardingScore: 999999,
          isForwarded: true,
          forwardedNewsletterMessageInfo:
          {
            newsletterName: namach,
            newsletterJid: idsaluran,
          },
          externalAdReply:
          {
            title: `Waktu Habis ⏰`,
            body: "Dasar Kroco",
            previewType: "PHOTO",
            thumbnailUrl: `https://telegra.ph/file/030ebfc99f9cb5be7e8cb.png`,
            sourceUrl: wagc
          }
        }
      };
      return shoNhe.sendMessage(m.chat, context,
      {
        quoted: m,
      });
    }
    if (tebakgame[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakgame[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakgame[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakgame[m.chat][2]
          JwbTrue("Tebak Game", tebakgame[m.chat][2], `\n\nKirim perintah .tebakgame\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakgame[m.chat][3])
          delete tebakgame[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakhero[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakhero[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakhero[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakhero[m.chat][2]
          JwbTrue("Tebak Hero", tebakhero[m.chat][2], `\n\nKirim perintah .tebakhero\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakhero[m.chat][3])
          delete tebakhero[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakff[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakff[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakff[m.chat][1]))
        jawaban = json.name.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakff[m.chat][2]
          JwbTrue("Tebak Free Fire", tebakff[m.chat][2], `\n\nKirim perintah .tebakff\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakff[m.chat][3])
          delete tebakff[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakkabupaten[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakkabupaten[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakkabupaten[m.chat][1]))
        jawaban = json.title.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakkabupaten[m.chat][2]
          JwbTrue("Tebak Kabupaten", tebakkabupaten[m.chat][2], `\n\nKirim perintah .tebakkabupaten\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakkabupaten[m.chat][3])
          delete tebakkabupaten[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakjkt48[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakjkt48[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakjkt48[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakjkt48[m.chat][2]
          JwbTrue("Tebak JKT48", tebakjkt48[m.chat][2], `\n\nKirim perintah .tebakjkt48\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakjkt48[m.chat][3])
          delete tebakjkt48[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakhewan[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakhewan[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakhewan[m.chat][1]))
        jawaban = json.title.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakhewan[m.chat][2]
          JwbTrue("Tebak Hewan", tebakhewan[m.chat][2], `\n\nKirim perintah .tebakhewan\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakhewan[m.chat][3])
          delete tebakhewan[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakml[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakml[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakml[m.chat][1]))
        jawaban = json.title.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakml[m.chat][2]
          JwbTrue("Tebak Sound ML", tebakml[m.chat][2], `\n\nKirim perintah .tebakml\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakml[m.chat][3])
          delete tebakml[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakchara[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakchara[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakchara[m.chat][1]))
        jawaban = json.name.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakchara[m.chat][2]
          JwbTrue("Tebak Anime", tebakchara[m.chat][2], `\n\nKirim perintah .tebakchara\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakchara[m.chat][3])
          delete tebakchara[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebaklogo[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebaklogo[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebaklogo[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebaklogo[m.chat][2]
          JwbTrue("Tebak Logo", tebaklogo[m.chat][2], `\n\nKirim perintah .tebaklogo\nuntuk bermain lagi 🎮`)
          clearTimeout(tebaklogo[m.chat][3])
          delete tebaklogo[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakaplikasi[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakaplikasi[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakaplikasi[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakaplikasi[m.chat][2]
          JwbTrue("Tebak Aplikasi", tebakaplikasi[m.chat][2], `\n\nKirim perintah .tebakaplikasi\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakaplikasi[m.chat][3])
          delete tebakaplikasi[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakgambar[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakgambar[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakgambar[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakgambar[m.chat][2]
          JwbTrue("Tebak Gambar", tebakgambar[m.chat][2], `\n\nKirim perintah .tebakgambar\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakgambar[m.chat][3])
          delete tebakgambar[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakkata[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakkata[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakkata[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakkata[m.chat][2]
          JwbTrue("Tebak Kata", tebakkata[m.chat][2], `\n\nKirim perintah .tebakkata\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakkata[m.chat][3])
          delete tebakkata[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (asahotak[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == asahotak[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(asahotak[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += asahotak[m.chat][2]
          JwbTrue("Asah Otak", asahotak[m.chat][2], `\n\nKirim perintah .asahotak\nuntuk bermain lagi 🎮`)
          clearTimeout(asahotak[m.chat][3])
          delete asahotak[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (lengkapikalimat[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == lengkapikalimat[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(lengkapikalimat[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += lengkapikalimat[m.chat][2]
          JwbTrue("Lengkapi Kalimat", lengkapikalimat[m.chat][2], `\n\nKirim perintah .lengkapikalimat\nuntuk bermain lagi 🎮`)
          clearTimeout(lengkapikalimat[m.chat][3])
          delete lengkapikalimat[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakbendera[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakbendera[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakbendera[m.chat][1]))
        jawaban = json.name.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakbendera[m.chat][2]
          JwbTrue("Tebak Bendera", tebakbendera[m.chat][2], `\n\nKirim perintah .tebakbendera\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakbendera[m.chat][3])
          delete tebakbendera[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (caklontong[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == caklontong[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(caklontong[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += caklontong[m.chat][2]
          JwbTrue("Cak Lontong", caklontong[m.chat][2], `\n\nKirim perintah .caklontong\nuntuk bermain lagi 🎮`)
          clearTimeout(caklontong[m.chat][3])
          delete caklontong[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (susunkata[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == susunkata[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(susunkata[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += susunkata[m.chat][2]
          JwbTrue("Susun Kata", susunkata[m.chat][2], `\n\nKirim perintah .susunkata\nuntuk bermain lagi 🎮`)
          clearTimeout(susunkata[m.chat][3])
          delete susunkata[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakkalimat[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakkalimat[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakkalimat[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakkalimat[m.chat][2]
          JwbTrue("Tebak Kalimat", tebakkalimat[m.chat][2], `\n\nKirim perintah .tebakkalimat\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakkalimat[m.chat][3])
          delete tebakkalimat[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (siapaaku[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == siapaaku[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(siapaaku[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += siapaaku[m.chat][2]
          JwbTrue("Tebak Siapa", siapaaku[m.chat][2], `\n\nKirim perintah .tebaksiapa\nuntuk bermain lagi 🎮`)
          clearTimeout(siapaaku[m.chat][3])
          delete siapaaku[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tekateki[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tekateki[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tekateki[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tekateki[m.chat][2]
          JwbTrue("Teka Teki", tekateki[m.chat][2], `\n\nKirim perintah .tekateki\nuntuk bermain lagi 🎮`)
          clearTimeout(tekateki[m.chat][3])
          delete tekateki[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebakkimia[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebakkimia[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebakkimia[m.chat][1]))
        jawaban = json.unsur.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebakkimia[m.chat][2]
          JwbTrue("Teka Kimia", tebakkimia[m.chat][2], `\n\nKirim perintah .tebakkimia\nuntuk bermain lagi 🎮`)
          clearTimeout(tebakkimia[m.chat][3])
          delete tebakkimia[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebaklirik[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebaklirik[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebaklirik[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebaklirik[m.chat][2]
          JwbTrue("Teka Lirik", tebaklirik[m.chat][2], `\n\nKirim perintah .tebaklirik\nuntuk bermain lagi 🎮`)
          clearTimeout(tebaklirik[m.chat][3])
          delete tebaklirik[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    if (tebaktebakan[m.chat] && !isCmd && m.quoted)
    {
      if (m.quoted.id == tebaktebakan[m.chat][0].key.id)
      {
        let json = JSON.parse(JSON.stringify(tebaktebakan[m.chat][1]))
        jawaban = json.jawaban.toLowerCase().trim()
        if (budy.toLowerCase() == jawaban)
        {
          db.data.users[m.sender].uang += tebaktebakan[m.chat][2]
          JwbTrue("Teka Tebakan", tebaktebakan[m.chat][2], `\n\nKirim perintah .tebaktebakan\nuntuk bermain lagi 🎮`)
          clearTimeout(tebaktebakan[m.chat][3])
          delete tebaktebakan[m.chat]
        }
        else if (similarity(budy.toLowerCase(), jawaban) >= threshold) shoNherly(`_Ya, Dikit Lagi!_`)
        else emote('❌');
      }
    }
    async function cekgame(gamejid)
    {
      if (tekateki[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tekateki[gamejid][0]
        })
        return true
      }
      else if (caklontong[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: caklontong[gamejid][0]
        })
        return true
      }
      else if (susunkata[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: susunkata[gamejid][0]
        })
        return true
      }
      else if (mathgame[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal Mathgame belum selesai"
        },
        {
          quoted: mathgame[gamejid][0]
        })
        return true
      }
      else if (tebaktebakan[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebaktebakan[gamejid][0]
        })
        return true
      }
      else if (tebaklirik[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebaklirik[gamejid][0]
        })
        return true
      }
      else if (tebakkimia[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakkimia[gamejid][0]
        })
        return true
      }
      else if (siapaaku[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: siapaaku[gamejid][0]
        })
        return true
      }
      else if (tebakkalimat[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakkalimat[gamejid][0]
        })
        return true
      }
      else if (tebakbendera[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakbendera[gamejid][0]
        })
        return true
      }
      else if (tebakkata[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakkata[gamejid][0]
        })
        return true
      }
      else if (asahotak[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: asahotak[gamejid][0]
        })
        return true
      }
      else if (lengkapikalimat[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: lengkapikalimat[gamejid][0]
        })
        return true
      }
      else if (tebakgame[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakgame[gamejid][0]
        })
        return true
      }
      else if (tebakhero[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakhero[gamejid][0]
        })
        return true
      }
      else if (tebakff[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakff[gamejid][0]
        })
        return true
      }
      else if (tebakkabupaten[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakkabupaten[gamejid][0]
        })
        return true
      }
      else if (tebakjkt48[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakjkt48[gamejid][0]
        })
        return true
      }
      else if (tebakhewan[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakhewan[gamejid][0]
        })
        return true
      }
      else if (tebakml[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakml[gamejid][0]
        })
        return true
      }
      else if (tebakchara[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakchara[gamejid][0]
        })
        return true
      }
      else if (tebaklogo[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebaklogo[gamejid][0]
        })
        return true
      }
      else if (tebakaplikasi[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakaplikasi[gamejid][0]
        })
        return true
      }
      else if (tebakgambar[gamejid])
      {
        shoNhe.sendMessage(gamejid,
        {
          text: "Soal ini belum selesai"
        },
        {
          quoted: tebakgambar[gamejid][0]
        })
        return true
      }
      else
      {
        return false
      }
    }
    async function convertGifToWebP(inputPath, outputPath)
    {
      return new Promise((resolve, reject) =>
      {
        const command = `ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -q:v 80 -loop 0 ${outputPath}`;
        exec(command, (error, stdout, stderr) =>
        {
          if (error)
          {
            console.error("Error saat konversi GIF ke WebP:", stderr);
            reject("Gagal mengonversi GIF ke WebP.");
          }
          else
          {
            console.log("GIF berhasil dikonversi ke WebP:", outputPath);
            resolve(outputPath);
          }
        });
      });
    }
    async function convertImageToWebP(inputPath, outputPath)
    {
      return new Promise((resolve, reject) =>
      {
        const command = `ffmpeg -i ${inputPath} -vf "scale=512:512:force_original_aspect_ratio=decrease" -c:v libwebp -q:v 80 -loop 0 ${outputPath}`;
        exec(command, (error, stdout, stderr) =>
        {
          if (error)
          {
            console.error("Error saat konversi gambar ke WebP:", stderr);
            reject("Gagal mengonversi gambar ke WebP.");
          }
          else
          {
            console.log("Gambar berhasil dikonversi ke WebP:", outputPath);
            resolve(outputPath);
          }
        });
      });
    }
    async function convertVideoToWebP(inputPath, outputPath)
    {
      return new Promise((resolve, reject) =>
      {
        const command = `ffmpeg -i ${inputPath} -vcodec libwebp -vf "fps=15,scale=512:512:force_original_aspect_ratio=decrease" -loop 0 ${outputPath}`;
        exec(command, (error, stdout, stderr) =>
        {
          if (error)
          {
            console.error("Error saat konversi video ke WebP:", stderr);
            reject("Gagal mengonversi video ke WebP.");
          }
          else
          {
            console.log("Video berhasil dikonversi ke WebP:", outputPath);
            resolve(outputPath);
          }
        });
      });
    }
    async function addMetadataToWebP(inputPath, outputPath, packname, author)
    {
      return new Promise((resolve, reject) =>
      {
        const reader = new WebPReader();
        reader.read(inputPath).then((webp) =>
        {
          const writer = new WebPWriter();
          webp.metadata.packname = packname;
          webp.metadata.author = author;
          writer.write(outputPath, webp).then(() =>
          {
            console.log("Metadata berhasil ditambahkan ke WebP.");
            resolve(outputPath);
          }).catch(reject);
        }).catch(reject);
      });
    }

    // =====[ AFK NOTIFICATION SYSTEM ]=====
    if (m.isGroup && !m.key.fromMe)
    {
      let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
      for (let ment of mentionUser)
      {
        if (checkAfkUser(ment, afk))
        {
          let getId2 = getAfkId(ment, afk)
          let getReason2 = getAfkReason(getId2, afk)
          let getTimee = Date.now() - getAfkTime(getId2, afk)
          let anu2 = ms(getTimee)
          shoNherly(`⚠️ *SISTEM PEMBERITAHUAN AFK* ⚠️

[⚠️] *STATUS PENGGUNA*:
- Pengguna sedang *AFK*! Hindari mengganggu atau men-tag untuk sementara waktu.

[📌] *ALASAN*:
- ${getReason2 || 'Tidak disebutkan'}

[⏳] *DURASI SEJAK AFK*:
- ${anu2.hours || 0} Jam, ${anu2.minutes || 0} Menit, ${anu2.seconds || 0} Detik

[🛡️] *CATATAN PENTING*:
- Pesan ini dikirim oleh sistem otomatis.
- Data aktivitas tercatat secara real-time.
- Setiap pelanggaran akan ditinjau lebih lanjut.

[💻] *TIPS SISTEM*:
- Untuk informasi lebih lanjut, tunggu hingga pengguna kembali aktif.
- Gunakan fitur pencarian atau bantuan jika membutuhkan.

🔍 *PEMANTAUAN SISTEM*:
- Status pengguna dipantau dalam dimensi sistem.
- Tidak ada aktivitas yang luput dari log kami.
- Tetap ikuti protokol interaksi yang berlaku.

📡 *SISTEM AKTIF*:
- Data diperbarui dalam waktu nyata.
- Tetap terhubung untuk pemberitahuan lebih lanjut.`)
        }
      }
      if (checkAfkUser(m.sender, afk))
      {
        let getId = getAfkId(m.sender, afk)
        let getReason = getAfkReason(getId, afk)
        let getTime = Date.now() - getAfkTime(getId, afk)
        let anu = ms(getTime)
        afk.splice(getAfkPosition(m.sender, afk), 1)
        fs.writeFileSync('./database/afk.json', JSON.stringify(afk))
        shoNhe.sendTextWithMentions(m.chat, `⚠️ *SISTEM ALERT: KONDISI PENGGUNA* ⚠️

Weiss @${m.sender.split('@')[0]}, masih sehat lu bro? Sistem mendeteksi status AFK-mu.

[📌] *ALASAN*:
- ${getReason || 'Tidak ada alasan yang diberikan'}

[⏳] *DURASI*:
- ${anu.hours || 0} Jam, ${anu.minutes || 0} Menit, ${anu.seconds || 0} Detik

[🛠️] *INSTRUKSI*:
- Jika ada kendala, segera perbarui statusmu.
- Hindari menunda terlalu lama, sistem selalu memantau.

[🔍] *LOG SISTEM*:
- Status ini telah tercatat dalam log protokol.
- Jangan abaikan pesan ini untuk menjaga kredibilitas aktivitasmu.

[⚡] *TIPS*:
- “Waktu terus berjalan, gunakan dengan bijak. Jangan biarkan dunia virtual mengalahkanmu.”

📡 *STATUS SISTEM*:
- Pemantauan berjalan secara real-time.
- Sistem tetap terhubung hingga kamu kembali aktif.`, fvideo)
      }
    }

    // =====[ INTERACTIVE BUTTON SENDERS ]=====
    // Modern WhatsApp interactive message builders
    async function sendButtonPanelImage(chat, judul, teks, buffer, button, hw) {
			const uploadFile = { upload: shoNhe.waUploadToServer };
			const imageMessage = await prepareWAMessageMedia(
				{
					image: buffer,
				},
				uploadFile,
			);
			let msg = generateWAMessageFromContent(chat, {
				viewOnceMessage: {
					message: {
						'messageContextInfo': {
							'deviceListMetadata': {},
							'deviceListMetadataVersion': 2
						},
						interactiveMessage: proto.Message.InteractiveMessage.create({
							contextInfo: {
								mentionedJid: [m.sender],
								forwardingScore: 999999,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterJid: idsaluran,
									newsletterName: namabot,
									serverMessageId: -1
								},
								businessMessageForwardInfo: {
									businessOwnerJid: shoNhe.decodeJid(shoNhe.user.id)
								},
							},
							body: proto.Message.InteractiveMessage.Body.create({
								text: teks
							}),
							footer: proto.Message.InteractiveMessage.Footer.create({
								text: namabot
							}),
							header: proto.Message.InteractiveMessage.Header.create({
								title: judul,
								subtitle: namabot,
								imageMessage: imageMessage.imageMessage,
								hasMediaAttachment: true
							}),
							nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
								buttons: button,
							})
						})
					}
				}
			}, {
				quoted: hw
			})

			shoNhe.relayMessage(msg.key.remoteJid, msg.message, {
				messageId: msg.key.id
			})
		}
    async function sendButton(chat, judul, teks, button, m)
    {
      let msg = generateWAMessageFromContent(chat,
      {
        viewOnceMessage:
        {
          message:
          {
            'messageContextInfo':
            {
              'deviceListMetadata':
              {},
              'deviceListMetadataVersion': 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create(
            {
              contextInfo:
              {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo:
                {
                  newsletterJid: saluran,
                  newsletterName: namach,
                  serverMessageId: -1
                },
                businessMessageForwardInfo:
                {
                  businessOwnerJid: shoNhe.decodeJid(shoNhe.user.id)
                },
              },
              body: proto.Message.InteractiveMessage.Body.create(
              {
                text: teks
              }),
              footer: proto.Message.InteractiveMessage.Footer.create(
              {
                text: namabot
              }),
              header: proto.Message.InteractiveMessage.Header.create(
              {
                title: judul,
                subtitle: namaowner,
                hasMediaAttachment: false
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create(
              {
                buttons: button,
              })
            })
          }
        }
      },
      {
        quoted: m
      })
      await shoNhe.relayMessage(msg.key.remoteJid, msg.message,
      {
        messageId: msg.key.id
      })
    }
    async function sendButtonImage(chat, judul, teks, buffer, button, hw)
    {
      const uploadFile = {
        upload: shoNhe.waUploadToServer
      };
      const imageMessage = await prepareWAMessageMedia(
      {
        image: buffer,
      }, uploadFile, );
      let msg = generateWAMessageFromContent(m.chat,
      {
        viewOnceMessage:
        {
          message:
          {
            'messageContextInfo':
            {
              'deviceListMetadata':
              {},
              'deviceListMetadataVersion': 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create(
            {
              contextInfo:
              {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo:
                {
                  newsletterJid: saluran,
                  newsletterName: namach,
                  serverMessageId: -1
                },
                businessMessageForwardInfo:
                {
                  businessOwnerJid: shoNhe.decodeJid(shoNhe.user.id)
                },
              },
              body: proto.Message.InteractiveMessage.Body.create(
              {
                text: teks
              }),
              footer: proto.Message.InteractiveMessage.Footer.create(
              {
                text: namabot
              }),
              header: proto.Message.InteractiveMessage.Header.create(
              {
                title: judul,
                subtitle: namaowner,
                imageMessage: imageMessage.imageMessage,
                hasMediaAttachment: true
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create(
              {
                buttons: button,
              })
            })
          }
        }
      },
      {
        quoted: hw
      })
      shoNhe.relayMessage(msg.key.remoteJid, msg.message,
      {
        messageId: msg.key.id
      })
    }
    async function sendButtonVideo(chat, judul, teks, buffer, button, m)
    {
      const uploadFile = {
        upload: shoNhe.waUploadToServer
      };
      const videoMessage = await prepareWAMessageMedia(
      {
        video: buffer,
      }, uploadFile, );
      let msg = generateWAMessageFromContent(m.chat,
      {
        viewOnceMessage:
        {
          message:
          {
            'messageContextInfo':
            {
              'deviceListMetadata':
              {},
              'deviceListMetadataVersion': 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create(
            {
              contextInfo:
              {
                mentionedJid: [m.sender],
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo:
                {
                  newsletterJid: idsaluran,
                  newsletterName: namach,
                  serverMessageId: -1
                },
                businessMessageForwardInfo:
                {
                  businessOwnerJid: shoNhe.decodeJid(shoNhe.user.id)
                },
              },
              body: proto.Message.InteractiveMessage.Body.create(
              {
                text: teks
              }),
              footer: proto.Message.InteractiveMessage.Footer.create(
              {
                text: namabot
              }),
              header: proto.Message.InteractiveMessage.Header.create(
              {
                title: judul,
                subtitle: namaowner,
                videoMessage: videoMessage.videoMessage,
                hasMediaAttachment: true
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create(
              {
                buttons: button,
              })
            })
          }
        }
      },
      {
        quoted: m
      })
      shoNhe.relayMessage(msg.key.remoteJid, msg.message,
      {
        messageId: msg.key.id
      })
    }
    async function sendButtonDocument(chat, judul, teks, thumb, button, m)
    {
      let msg = generateWAMessageFromContent(chat,
      {
        viewOnceMessage:
        {
          message:
          {
            'messageContextInfo':
            {
              'deviceListMetadata':
              {},
              'deviceListMetadataVersion': 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create(
            {
              contextInfo:
              {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardedNewsletterMessageInfo:
                {
                  newsletterJid: idsaluran,
                  newsletterName: namach,
                  serverMessageId: -1
                },
                businessMessageForwardInfo:
                {
                  businessOwnerJid: shoNhe.decodeJid(shoNhe.user.id)
                },
                externalAdReply:
                {
                  title: waktuucapan,
                  body: pushname,
                  thumbnail: forpdf,
                  sourceUrl: wagc,
                  mediaType: 1,
                  renderLargerThumbnail: true
                }
              },
              body: proto.Message.InteractiveMessage.Body.create(
              {
                text: teks
              }),
              footer: proto.Message.InteractiveMessage.Footer.create(
              {
                text: namabot
              }),
              header: proto.Message.InteractiveMessage.Header.create(
              {
                title: judul,
                thumbnailUrl: getRandomThumb3(),
                subtitle: namaowner,
                hasMediaAttachment: true,
                ...(await prepareWAMessageMedia(
                {
                  document: thumb,
                  mimetype: 'image/png',
                  fileLength: 10000000000,
                  jpegThumbnail: thumb,
                  fileName: namach
                },
                {
                  upload: shoNhe.waUploadToServer
                }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create(
              {
                buttons: button,
              })
            })
          }
        }
      },
      {
        quoted: m
      })
      await shoNhe.relayMessage(msg.key.remoteJid, msg.message,
      {
        messageId: msg.key.id
      })
    };

    // =====[ COMMAND SUGGESTION (DIDYOUMEAN) ]=====
    // Auto-suggest closest matching command when typo detected
    if (prefix && command && !m.key.fromMe)
    {
      //let caseNames = getCaseNames().filter(name => name !== 'welkom');
      let caseNames = getCaseNames().filter(name => !['welkom', 'contag', 'bts', 'ats', 'tts', 'ana', 'cek', 'hentai', 'add', 'tesq', 'shoNheai', 'kakasih'].includes(name)); // GANTI INI UNTUK BLOKIR LEBIH DARI 1 JIKA DIRASA MENGGANGGU
      function getCaseNames()
      {
        try
        {
          const data = fs.readFileSync('case.js', 'utf8');
          const casePattern = /case\s+'([^']+)'/g;
          const matches = data.match(casePattern);
          if (matches)
          {
            const caseNames = matches.map(match => match.replace(/case\s+'([^']+)'/, '$1'));
            return caseNames;
          }
          else
          {
            return [];
          }
        }
        catch (err)
        {
          console.log('Terjadi kesalahan:', err);
          return [];
        }
      }
      let noPrefix = command
      let mean = didyoumean(noPrefix, caseNames);
      let sim = similarity(noPrefix, mean);
      let similarityPercentage = parseInt(sim * 100);
      let suggestions = caseNames.filter(name => similarity(noPrefix, name) > 0.6).slice(0, 2); // Maksimal 2 hasil
      let suggestionList = suggestions.length > 0
    ? suggestions.map((sug, i) => `•> ${prefix + sug}\n•> Kemiripan: ${parseInt(similarity(noPrefix, sug) * 100)}%\n`).join('\n')
    : 'Tidak ada command yang cocok ditemukan.';
    const avatars = await shoNhe.profilePictureUrl(m.sender, "image").catch(() => 'https://files.catbox.moe/316j0f.jpg');
      const reSize = async (buffer, ukur1, ukur2) =>
          {
            return new Promise(async (resolve, reject) =>
            {
              let jimp = require('jimp')
              var baaper = await jimp.read(buffer);
              var abb = await baaper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
              resolve(abb)
            })
          }
          let naiseee = await reSize(avatars, 300, 300)
      if (mean && noPrefix.toLowerCase() !== mean.toLowerCase())
      {
      let buttons = suggestions.map((sug, i) => ({
    buttonId: `${prefix + sug} ${text}`,
    buttonText: { displayText: sug.toUpperCase() }
  }));

  // Pastikan tombol maksimal hanya sejumlah hasil suggestions
  buttons.push({
    buttonId: `${prefix}contact`,
    buttonText: { displayText: `OWNER ⚡` }
  });
        let response = `Eh-Hehhh, command yang kamu berikan salah. Mungkin ini yang kamu maksud:\n\n${suggestionList}`
        await shoNhe.sendMessage(m.chat,
        {
            document: naiseee,
            fileName: namabot,
            url: "https://mmg.whatsapp.net/v/t62.7119-24/30129597_829817659174206_6300413901737393729_n.enc?ccb=11-4&oh=01_Q5AaIA5MAdyMQOjp8l42SnRy_8qjz9O8JH8vgPee1nIdko51&oe=66595EB9&_nc_sid=5e03e0&mms3=true",
            mimetype: "image/jpeg",
            fileSha256: "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
            jpegThumbnail: naiseee, // Geramos Um Documento Pequeno
            fileLength: 1986000000000000000,
            mediaKey: "SkHeALp42Ch7DGb6nuV6p7hxL+V9yjh9s9t3Ox8a72o=",
            fileName: `${namabot}`,
            directPath: "/v/t62.7119-24/30129597_829817659174206_6300413901737393729_n.enc?ccb=11-4&oh=01_Q5AaIA5MAdyMQOjp8l42SnRy_8qjz9O8JH8vgPee1nIdko51&oe=66595EB9&_nc_sid=5e03e0",
            contactVcard: false,
            mediaKeyTimestamp: "1658703206",
            pageCount: '999',
            caption: response,

          footer: `${namabot} - DETECT ⚠️`,
          buttons: buttons,
          viewOnce: true,
        },
        {
          quoted: hw
        });
      }
    }

    // =====[ REFACTORED SECTION ENDS HERE — ORIGINAL switch(command) BLOCK FOLLOWS BELOW ]=====