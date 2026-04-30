const fs = require('fs');
const { RankCardBuilder } = require("canvacord");

// Path database
const userFirePath = './database/userFire.json';

// Fungsi untuk membaca database dengan error handling
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

// Fungsi untuk memperbarui level pengguna
async function levelUpdate(command, sender, pushName) {
    const db = loadUserFire();
    if (!db[sender]) {
        db[sender] = {
            register: false,
            level: 0,
            exp: 0,
            expTarget: 10,
            commandCount: 0,
            balance: 0
        };
    }

    const user = db[sender];

    // Pastikan semua properti ada
    user.commandCount = user.commandCount ?? 0;
    user.exp = user.exp ?? 0;
    user.level = user.level ?? 0;
    user.expTarget = user.expTarget ?? 10;
    user.balance = user.balance ?? 0;

    // Tambah XP dan hitung level-up
    user.commandCount += 1;
    user.exp += 2; // Bisa diatur berdasarkan jenis command

    let levelUpCard = null;
    if (user.exp >= user.expTarget) {
        user.level += 1; // Naik level
        user.exp = 0; // Reset XP
        user.expTarget += 20; // Tingkatkan target XP
        user.balance += 500; // Beri hadiah saldo

        // Buat kartu level-up menggunakan Canvacord
        levelUpCard = await new RankCardBuilder()
            .setAvatar(`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(pushName)}`)
            .setUsername(pushName || "Unknown")
            .setLevel(user.level)
            .setRank(user.level) // Bisa disesuaikan
            .setCurrentXP(user.exp)
            .setRequiredXP(user.expTarget)
            .setStatus("online")
            .setBackground("color", "#1e1e1e")
            .build();

        console.log(`🎉 ${pushName} (${sender}) naik ke level ${user.level}!`);
    }

    saveUserFire(db);
    return levelUpCard;
}

module.exports = { levelUpdate };