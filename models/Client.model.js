/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-12-2021
 * @modify date 24-12-2021
 * @desc [Clients Model]
 */

const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
  {
    apikey: {
      type: String,
      required: true,
    },
    ip_address: {
      type: String,
      default: "",
    },
    user_agent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("clients", clientSchema);
