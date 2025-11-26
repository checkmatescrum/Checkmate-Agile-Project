const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
const { toDefaultValue } = require("sequelize/lib/utils");

const Club = sequelize.define("Club",{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
    }  
});

module.exports = Club;