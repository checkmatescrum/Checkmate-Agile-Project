const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");
const csrf = require("../middlewares/csrf");

const adminController = require("../controllers/admin");

router.get("/announcement/delete/:announcementid", csrf, adminController.get_announcement_delete);

router.post("/announcement/delete/:announcementid", adminController.post_announcement_delete);

router.get("/club/delete/:clubid", csrf, adminController.get_club_delete);

router.post("/club/delete/:clubid", adminController.post_club_delete);

router.get("/announcement/create",isAuth,csrf, adminController.get_announcement_create);

router.post("/announcement/create",isAuth, imageUpload.upload.single("resim"), adminController.post_announcement_create);

router.get("/club/create",isAuth,csrf, adminController.get_club_create);

router.post("/club/create",isAuth, adminController.post_club_create);

router.get("/announcements/:announcementid", csrf, adminController.get_announcement_edit);

router.post("/announcements/:announcementid", imageUpload.upload.single("resim"), adminController.post_announcement_edit);

router.get("/clubs/:clubid", csrf, adminController.get_club_edit);

router.post("/clubs/:clubid", adminController.post_club_edit);

router.get("/announcements", adminController.get_announcements);

router.get("/clubs", adminController.get_clubs);

module.exports = router;