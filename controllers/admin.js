const Announcement = require("../models/announcement");
const Club = require("../models/Club");
const { Op } = require("sequelize");
const sequelize = require("../data/db");
const slugField = require("../helpers/slugfield");

const fs = require("fs");

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