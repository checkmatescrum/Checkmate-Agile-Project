const SystemMessage = require("../models/systemMessage");

exports.index = async function(req, res) {
    
    try{
        const systemMessage = await SystemMessage.findAll({
            raw:true
        });
        res.render("users/index", {
                    title: "Duyurular",
                    systemMessage: systemMessage
        });
    }
    catch(err){
        console.log(err);
    }    
}