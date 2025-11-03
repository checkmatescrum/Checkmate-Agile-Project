const express = require("express");
const app = express();

//node modules
const path = require("path");
//custom
const dummyData = require("./data/dummy-data");
const sequelize = require("./data/db");
//models
const SystemMessage = require("./models/systemMessage");
//routes
const userRoutes = require("./routes/user");

app.set("view engine", "ejs");

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(userRoutes);

(async () => {
  try {
    await sequelize.sync({ force:true }); // veri tabanı bir kez oluşturulduktan sonra "force:true" sil
    await dummyData();
    app.listen(3000, () => console.log("Server 3000 portunda çalışıyor"));
  } catch (err) {
    console.error("Başlatma hatası:", err);
  }
})();


