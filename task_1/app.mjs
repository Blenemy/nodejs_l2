import readline from "readline";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const argsString = process.argv.slice(2).join("&");
const argsURLParams = new URLSearchParams(argsString);
const pensionAge = argsURLParams.get("--pension");

rl.question("How old are you \n", (answer) => {
  const output =
    answer >= pensionAge ? "You are retired" : "You are not old enough";
  console.log(output);

  rl.close();
});
