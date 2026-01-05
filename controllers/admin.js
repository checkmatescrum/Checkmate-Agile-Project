const Announcement = require("../models/announcement");
const Club = require("../models/Club");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

const fs = require("fs");

exports.get_announcement_delete = async function(req, res) {
    const announcementid = req.params.announcementid;

    try{
        const announcement = await Announcement.findOne({
           where: {id: announcementid}
        });

        if(announcement){
            res.render("admin/announcement-delete", {
            title:"announcement-delete",
            announcement: announcement
        });
        }
        res.redirect("/admin/announcements");

        
    }
    catch(err){
        console.log(err);
    }
}

exports.post_announcement_delete = async function(req, res){
    const announcementid = req.body.announcementid;
    try{
        const announcement = await Announcement.findByPk(announcementid);
        if(announcement){
            await announcement.destroy();
            res.redirect("/admin/announcements?action=delete");
        }
        res.redirect("/admin/announcements");
        
    }
    catch(err){
        console.log(err);
    }
}

exports.get_club_delete = async function(req, res) {
    const clubid = req.params.clubid;

    try{
        const club = await Club.findByPk(clubid);
        if(club){
            res.render("admin/club-delete", {
            title:"delete club",
            club: club
        });
        }
    }
    catch(err){
        console.log(err);
    }
}

exports.post_club_delete = async function(req, res){
    const clubid = req.body.clubid;
    try{
        await Club.destroy({
            where: {
                id: clubid
            }
        });
        res.redirect("/admin/clubs?action=delete");
    }
    catch(err){
        console.log(err);
    }
}

exports.get_announcement_create = async function(req, res) {
    try {
        const clubs = await Club.findAll();

        res.render("admin/announcement-create", {
            title: "add announcement",
            clubs: clubs
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_announcement_create = async function(req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file ? req.file.filename : "default.jpeg";

    try {
        await Announcement.create({
            baslik: baslik,
            url: slugField(baslik),
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim
        });
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_club_create = async function(req, res) {
    try {
        res.render("admin/club-create", {
            title: "add club"
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_club_create = async function(req, res) {
    const name = req.body.name;
    try {
        await Club.create({ 
            name: name,
            url: slugField(name) 
        });
        res.redirect("/");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_announcement_edit = async function(req, res) {
    const announcementid = req.params.announcementid;
    try{
        const announcement = await Announcement.findOne({
            where:{ id:announcementid},
            include:{
                model: Club,
                attributes: ["id"]
            }
        });
        const clubs = await Club.findAll();

        if(announcement){
            return res.render("admin/announcement-edit",{
                title:announcement.dataValues.baslik,
                announcement:announcement,
                clubs: clubs
            });
        }

        res.redirect("/admin/announcements");
    }
    catch(err){
        console.log(err);
    }

    
}

exports.post_announcement_edit = async function(req, res){
    const announcementid = req.body.announcementid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const kulupIds = req.body.clubs;
    const url = req.body.url;
    let resim = req.body.resim;
    if(req.file){
        resim = req.file.filename;
        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        });
    };
    
    try{
        const announcement = await Announcement.findOne({
            where: {
                id:announcementid
            },
            include:{
                model: Club,
                attributes: ["id"]
            }
        });
        if(announcement){
            announcement.baslik = baslik;
            announcement.altbaslik = altbaslik;
            announcement.aciklama = aciklama;
            announcement.resim = resim;
            announcement.url = url;
            if(kulupIds == undefined){
                await announcement.removeClubs(announcement.clubs);
            } else {
                await announcement.removeClubs(announcement.clubs);
                const selectedClubs = await Club.findAll({
                    where: {
                        id: {
                            [Op.in]: kulupIds
                        }
                    }
                });
                await announcement.addClubs(selectedClubs);
            }

            await announcement.save();
            return res.redirect("/admin/announcements?action=edit&announcementid=" + announcementid);
        }
        res.redirect("/admin/announcements");        
    }
    catch(err){
        console.log(err);
    }

}

exports.get_club_edit = async function(req, res) {
    const clubid = req.params.clubid;

    try{
        const club = await Club.findByPk(clubid);
        const announcements = await club.getAnnouncements();
        const countAnnouncement = await club.countAnnouncements();

        if(club){
            return res.render("admin/club-edit",{
                title:club.dataValues.name,
                club:club.dataValues,
                announcements: announcements,
                countAnnouncement: countAnnouncement
            });
        }
    }
    catch(err){
        console.log(err);
    }

    
}

exports.post_club_edit = async function(req, res){
    const clubid = req.body.clubid;
    const name = req.body.name;

    try{
        const club = await Club.findByPk(clubid);
        if(club){
            club.name = name;
            await club.save();
            return res.redirect("/admin/clubs?action=edit&clubid=" + clubid);
        }
        res.redirect("/admin/clubs");
        
    }
    catch(err){
        console.log(err);
    }

}

exports.get_announcements = async function(req, res) {
    try{
        const announcements = await Announcement.findAll({
            attributes: ["id","baslik","altbaslik","resim"],
            include:{
                model: Club,
                attributes: ["name"]
            }
         });
        res.render("admin/announcement-list", {
            title:"announcement list",
            announcements:announcements,
            action: req.query.action,
            announcementid: req.query.announcementid
        });
    }
    catch(err){
        console.log(err);
    }

}

exports.get_clubs = async function(req, res) {
    try{
        const clubs = await Club.findAll();
        res.render("admin/club-list", {
            title:"club list",
            clubs:clubs,
            action: req.query.action,
            clubid: req.query.clubid
        });
    }
    catch(err){
        console.log(err);
    }

}