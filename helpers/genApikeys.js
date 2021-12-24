/**
 * @author Ysn4Irix
 * @email ysn4irix@gmail.com
 * @create date 24-12-2021
 * @modify date 24-12-2021
 * @desc [APIKEY Generator]
 */

const { randomBytes } = require("crypto");

function gen() {
  const rand = randomBytes(35);

  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".repeat(5);

  let str = "";

  for (let i = 0; i < rand.length; i++) {
    let decimal = rand[i];
    str += chars[decimal];
  }

  return str;
}

module.exports = gen;
