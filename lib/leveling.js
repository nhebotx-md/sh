const fs = require('fs');
const axios = require('axios');

// Path database
const userFirePath = './database/userFire.json';

// Fungsi untuk membaca database
function loadUserFire() {
    try {
        if (!fs.existsSync(userFirePath)) {
            fs.writeFileSync(userFirePath, JSON.stringify({}));
        }
        return JSON.parse(fs.readFileSync(userFirePath, 'utf8'));
    } catch (error) {
        console.error("❌ Error loading userFire database:", error);
        return {};
    }
}

// Fungsi untuk menyimpan database
function saveUserFire(db) {
    try {
        fs.writeFileSync(userFirePath, JSON.stringify(db, null, 2));
    } catch (error) {
        console.error("❌ Error saving userFire database:", error);
    }
}

// Fungsi untuk memperbarui level pengguna & menggunakan API Popcat
async function levelUpdate(sender, pushName) {
    const db = loadUserFire();

    if (!db[sender]) {
        db[sender] = {
            level: 0,
            exp: 0,
            expTarget: 10,
            commandCount: 0,
            balance: 0
        };
    }

    const user = db[sender];

    // Tambah XP dan hitung level-up
    user.commandCount += 1;
    user.exp += 2;

    let levelUpCard = null;
    if (user.exp >= user.expTarget) {
        user.level += 1;
        user.exp = 0;
        user.expTarget += 20;
        user.balance += 500;

        // 🔹 Gunakan API Popcat untuk membuat kartu level
        const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(pushName)}`;
        const backgroundUrl = "https://files.catbox.moe/umiwpu.jpg"; // Ganti dengan gambar latar belakang pilihan
        const popcatUrl = `https://api.popcat.xyz/card?username=${encodeURIComponent(pushName)}&avatar=${encodeURIComponent(avatarUrl)}&level=${user.level}&xp=${user.exp}&maxxp=${user.expTarget}&background=${encodeURIComponent(backgroundUrl)}`;

        levelUpCard = popcatUrl; // Menggunakan URL gambar API Popcat
    }

    saveUserFire(db);
    return levelUpCard;
}

module.exports = { levelUpdate };