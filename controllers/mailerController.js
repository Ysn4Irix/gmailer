const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const ejs = require("ejs");
const { validateData } = require("../helpers/validate");
const gen = require("../helpers/genApikeys");
const Client = require("../models/Client.model");

const OAuth2 = google.auth.OAuth2;

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN,
  AUTH_EMAIL,
  PWD,
} = process.env;

const mailer = {
  getApiKey: async (req, res, next) => {
    try {
      const apikey = gen();
      const client = new Client({
        apikey,
        ip_address: /* req.ip */ "200.68.17.250",
        user_agent: req.get("User-Agent"),
      });
      await client.save();

      return res.status(200).json({
        status: 200,
        success: true,
        message: "API KEY successfully Generated 🎉",
        response: apikey,
      });
    } catch (err) {
      next(err);
    }
  },
  senderRouter: async (req, res, next) => {
    const { error } = validateData(req.params);
    if (error) return next(error);

    const { email, template, apikey } = req.params;

    const result = await Client.findOne({ apikey });
    if (!result) return next(new Error("Invalid API KEY"));

    const data = { email, template };

    const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();

    /* const API_RESPONSE_URL = "http://" + req.headers.host; */

    const TEMPLATES = {
      confirmation: {
        fileName: "confirmation.ejs",
        subject: "[Ysn4Irix Inc.] Welcome to Ysn4Irix Inc.",
      },
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: AUTH_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const filePath = `${PWD}/templates/${TEMPLATES[data.template].fileName}`;

    ejs.renderFile(filePath, data, {}, (e, content) => {
      if (e) return next(e);

      const mailOptions = {
        from: AUTH_EMAIL,
        to: data.email,
        subject: TEMPLATES[data.template].subject,
        html: content,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err)
          return next(
            new Error(
              err.message.includes("invalid_grant")
                ? "Invalid Grant : Refresh Token Expired"
                : err.message
            )
          );

        res.status(200).json({
          status: 200,
          success: true,
          message: "Email sent successfully 🎉",
          response: info.response,
        });
      });
    });
  },
};

module.exports = mailer;
