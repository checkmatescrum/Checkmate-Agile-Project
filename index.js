const express = require("express");
const app = express();
const dummyData = require("./data/dummy-data");

const sequelize = require("./data/db");
const SystemMessage = require("./models/systemMessage");

app.get("/", async (req, res) => {
  try {
    const sys = await SystemMessage.findOne({ where: { code: 110 } });
    if (!sys) return res.send("Sistem mesajı bulunamadı.");
    return res.send(sys.message || "");
  } catch (err) {
    console.error("DB hata:", err);
    return res.status(500).send("Sunucu hatası.");
  }
});

(async () => {
  try {
    await sequelize.sync({ force:true }); // veri tabanı bir kez oluşturulduktan sonra "force:true" sil
    await dummyData();
    app.listen(3000, () => console.log("Server 3000 portunda çalışıyor"));
  } catch (err) {
    console.error("Başlatma hatası:", err);
  }
})();


