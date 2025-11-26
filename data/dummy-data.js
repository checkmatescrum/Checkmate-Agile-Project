const Announcement = require("../models/announcement");
const Club = require("../models/Club");
const slugField = require("../helpers/slugfield");
const User = require("../models/user");
const bcrypt = require("bcrypt");

async function populate() {
    const count = await Announcement.count();

    if (count == 0) {

        const Clubs = await Club.bulkCreate([
            {name: "Sinema Kulübü",url:slugField("Sinema Kulübü")},
            {name: "Satranç Kulübü",url:slugField("Satranç Kulübü")},
            {name: "Dağcılık Kulübü",url:slugField("Dağcılık Kulübü")}
        ]);

        const Announcements = await Announcement.bulkCreate([
            {
                baslik:"Sinema duyuru başlığı",
                url:slugField("Deneme Sinema başlığı"),
                altbaslik: "Sinema alt başlık",
                aciklama: "Duyuru açıklaması",
                resim: "1.jpeg"
            },
            {
                baslik:"2. Sinema duyuru başlığı",
                url:slugField("2. Deneme Sinema başlığı"),
                altbaslik: "2. Sinema alt başlık",
                aciklama: "2. duyuru açıklaması",
                resim: "2.jpeg"
            },
            {
                baslik:"3. Satranç duyuru başlığı",
                url:slugField("3. Deneme Satranç başlığı"),
                altbaslik: "3. Satranç alt başlık",
                aciklama: "3. duyuru açıklaması",
                resim: "3.jpeg"
            },
            {
                baslik:"4. Dağcılık duyuru başlığı",
                url:slugField("4. Deneme Dağcılık başlığı"),
                altbaslik: "4. Dağcılık alt başlık",
                aciklama: "4. duyuru açıklaması",
                resim: "4.jpeg"
            }
        ]);

        const users = await User.bulkCreate([
                    {fullname: "Volkan Tayranoğlu", email: "tayranoglu@hotmail.com", password: await bcrypt.hash("Volkan123", 10)},
                    {fullname: "Abdullah Memiş Belikırık", email: "belikirik@hotmail.com", password: await bcrypt.hash("Abdullah123", 10)},
                    {fullname: "Şafak Çekilmez", email: "cekilmez@hotmail.com", password: await bcrypt.hash("Safak123", 10)}
        ]);

        await Clubs[0].addAnnouncements(Announcements[0]);
        await Clubs[0].addAnnouncements(Announcements[1]);
        await Clubs[1].addAnnouncements(Announcements[2]);
        await Clubs[2].addAnnouncements(Announcements[3]);
    }
}

module.exports = populate;
