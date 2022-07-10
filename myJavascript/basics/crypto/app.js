import CryptoJS from "crypto-js";
import { v4 } from "uuid";
import chalk from "chalk";

// setup
// the only way to find a message that produces a given hash is to attempt a brute-force search
const message = "this is jake";
const secret = v4();

// plain text encryption/decryption
const cipherText = CryptoJS.AES.encrypt(message, secret).toString();
console.log(chalk.red("CIPHER"), cipherText);

const byte = CryptoJS.AES.decrypt(cipherText, secret);
console.log(chalk.green("BYTE"), byte);

const plainText = byte.toString(CryptoJS.enc.Utf8);
console.log(chalk.blue("PLAIN"), plainText);

// object encryption
const objectCipher = CryptoJS.AES.encrypt(
  JSON.stringify({ name: "Jake", id: v4() }),
  secret
).toString();

console.log(chalk.red("OBJECT CIPHER"), objectCipher);

// object decryption
console.log(
  chalk.blue("OBJECT PLAIN"),
  JSON.parse(
    CryptoJS.AES.decrypt(objectCipher, secret).toString(CryptoJS.enc.Utf8)
  )
);
