/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-12-2021
 * @modify date 24-12-2021
 * @desc [Router]
 */

const router = require("express").Router();
const mailerController = require("../controllers/mailerController");

router.get("/send/:email/:template/:apikey", mailerController.senderRouter);
router.get("/generateKey", mailerController.getApiKey);

module.exports = router;
