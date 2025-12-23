const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/announcements/club/:slug", userController.announcement_list);

router.get("/announcements/:slug", userController.announcements_details);

router.get("/announcements", userController.announcement_list);

router.get("/", userController.index);

module.exports = router;