import { unlink, appendFile } from "fs/promises";
import fs from "node:fs/promises";

class ServerResponse {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export async function readTextFile(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });

    const numbersArray = data
      .split("\n")
      .filter((num) => num.trim() !== "")
      .map(Number);

    return new ServerResponse(200, numbersArray);
  } catch (error) {
    return new ServerResponse(
      500,
      `An error occured reading the file ${error.message}`
    );
  }
}

export async function appendTextToFile(filePath, text) {
  try {
    await appendFile(filePath, text);

    return new ServerResponse(200, `${text} was succesfully added`);
  } catch (error) {
    return new ServerResponse(500, error.message);
  }
}

export async function deleteFile(filePath) {
  try {
    await unlink(filePath);

    return new ServerResponse(200, "File was succesfully deleted");
  } catch (error) {
    return new ServerResponse(500, error);
  }
}

export function simpleResponse(response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain" });
  response.end(`${message}`);
}
