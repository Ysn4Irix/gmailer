const router = require("express").Router();
const mailerController = require("../controllers/mailerController");

router.get("/send/:email/:template/:apikey", mailerController.senderRouter);
router.get("/generateKey", mailerController.getApiKey);

module.exports = router;
