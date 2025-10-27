const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const { toDefaultValue } = require("sequelize/lib/utils");

const systemMessage = sequelize.define("systemMessage",{
    code:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = systemMessage;