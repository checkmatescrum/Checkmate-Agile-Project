const SystemMessage = require("../models/systemMessage");

async function populate() {
    const count = await SystemMessage.count();

    if (count == 0) {

        await SystemMessage.create({
            code: 110,
            message: "Yakında Hizmetinizdeyiz"
        });
    }
}

module.exports = populate;
