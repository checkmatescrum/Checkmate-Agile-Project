const Announcement = require("../models/announcement");
const Club = require("../models/Club");

exports.announcements_details = async function(req, res) {
    const slug = req.params.slug;//hata?
    try{
        const announcement = await Announcement.findOne({
            where: {
                url:slug
            },
            raw:true
        });
        
        if(announcement){
            return res.render("users/announcement-details", {
            title: announcement.baslik,
            announcement:announcement
        });
        }
        res.redirect("/");

        
    }
    catch(err){
        console.log(err);
    }
    
}

exports.announcement_list = async function(req, res) {
    const size = 3;
    const { page=0 } = req.query;
    const slug = req.params.slug;

    try{
        const {rows, count} = await Announcement.findAndCountAll({
            raw: true,
            include: slug ? { model: Club, where: { url: slug }} : null,
            limit: size,
            offset: page * size
        });
        const clubs = await Club.findAll({raw:true});
        res.render("users/announcements", {
            title: "Tüm Duyurular",
            announcements: rows,
            totalItems: count,
            totalPages: Math.ceil(count/size),
            currentPage: page,
            clubs: clubs,
            selectedClub: slug
        });
    }
    catch(err){
        console.log(err);
    }
}

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