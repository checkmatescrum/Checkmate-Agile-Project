const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const { toDefaultValue } = require("sequelize/lib/utils");

const Announcement = sequelize.define("Announcement",{
    baslik:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    altbaslik:{
        type: DataTypes.STRING,
        allowNull: false
    },
    aciklama: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resim:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: true
});

module.exports = Announcement;