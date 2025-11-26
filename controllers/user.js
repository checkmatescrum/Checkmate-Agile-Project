const Announcement = require("../models/announcement");
const Club = require("../models/Club");

exports.index = async function(req, res) {
    
    try{
        const announcements = await Announcement.findAll({
            raw:true
        });
        const clubs = await Club.findAll({raw: true});
        res.render("users/index", {
                    title: "Duyurular",
                    announcements: announcements,
                    clubs: clubs,
                    selectedClub: null
        });
    }
    catch(err){
        console.log(err);
    }    
}