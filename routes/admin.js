const express = require("express");
const router = express.Router();

const imageUpload = require("../helpers/image-upload");
const isAuth = require("../middlewares/auth");
const csrf = require("../middlewares/csrf");

const adminController = require("../controllers/admin");


router.get("/announcement/create",isAuth,csrf, adminController.get_announcement_create);

router.post("/announcement/create",isAuth, imageUpload.upload.single("resim"), adminController.post_announcement_create);

router.get("/club/create",isAuth,csrf, adminController.get_club_create);

router.post("/club/create",isAuth, adminController.post_club_create);

router.get("/announcements", adminController.get_announcements);

router.get("/clubs", adminController.get_clubs);

module.exports = router;