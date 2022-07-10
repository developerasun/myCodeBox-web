import CryptoJS from "crypto-js";
import { v4 } from "uuid";

const privateKeys = new Map(); // key: username, value: private key
const users = new Map(); // key: username, value: user id

function enrollUser(name) {
  return {
    username: name,
    userId: v4(),
    balance: 100,
  };
}

function generatePrivateKey() {
  const seed = "cool cat";
  // dynamic key generation
  return CryptoJS.SHA256(seed.concat(v4())).toString();
}

function initSignUp(data, key, callback) {
  data.set(key, callback(key));
}

initSignUp(users, "Jake", enrollUser);
initSignUp(users, "Sally", enrollUser);
initSignUp(privateKeys, "Jake", generatePrivateKey);
initSignUp(privateKeys, "Sally", generatePrivateKey);

// console.log("%cprivateKey.js line:31 users", "color: #007acc;", users);
// console.log(
//   "%cprivateKey.js line:32 privateKeys",
//   "color: #007acc;",
//   privateKeys
// );

export { privateKeys, users };
