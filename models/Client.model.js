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
