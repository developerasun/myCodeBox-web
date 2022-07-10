import { v4 } from "uuid";
import { privateKeys, users } from "./privateKey.js";
import chalk from "chalk";
import CryptoJS from "crypto-js";

const orderBook = {
  sender: "Jake",
  recipient: "Sally",
};

const txObject = {
  id: v4(),
  price: 100,
  from: orderBook.sender,
  to: orderBook.recipient,
  signature: privateKeys.get(orderBook.sender),
};

function createTransation(txObject) {
  const { price, from, to, signature } = txObject;
  return {
    id: v4(),
    price,
    from,
    to,
    signature,
  };
}

function sendTransation(txObject) {
  const { from, signature } = createTransation(txObject);
  const gasFee = 10;

  if (signature === privateKeys.get(from)) {
    users.get(from).balance -= gasFee;
    console.log(
      chalk.green.bold("CONFIRMED"),
      chalk.yellow("TX hash: "),
      CryptoJS.SHA256(from, signature).toString()
    );
    console.log(chalk.red("Balance: "), users.get(from).balance);
  } else {
    throw new Error("Invalid private key");
  }
}

sendTransation(txObject);

// console.log(chalk.green.bold("PK"), privateKeys.get("Jake"));
