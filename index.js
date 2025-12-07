const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const csurf = require("csurf");

//node modules
const path = require("path");
//routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
//custom
const dummyData = require("./data/dummy-data");
const sequelize = require("./data/db");
const locals = require("./middlewares/locals");
//models
const SystemMessage = require("./models/systemMessage");
const Club = require("./models/Club");
const Announcement = require("./models/announcement");
const User = require("./models/user");


app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "temp secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    },
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.use(csurf());
app.use(locals);

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/account", authRoutes);
app.use(userRoutes);
app.use("/admin", adminRoutes);


//ilişkiler
Announcement.belongsToMany(Club, {through: "clubAnnouncements"});
Club.belongsToMany(Announcement, {through: "clubAnnouncements"});

(async () => {
  try {
    await sequelize.sync({ force:true }); // veri tabanı bir kez oluşturulduktan sonra "force:true" sil
    await dummyData();
    app.listen(3000, () => console.log("Server 3000 portunda çalışıyor"));
  } catch (err) {
    console.error("Başlatma hatası:", err);
  }
})();


