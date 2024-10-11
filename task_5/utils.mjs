import { readFile, writeFile } from "fs/promises";
import fs, { existsSync } from "fs";

class ServerResponse {
  constructor(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export function simpleResponse(response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain" });
  response.end(`${message}`);
}

export async function readJSONFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const json = JSON.parse(
        await readFile(new URL(filePath, import.meta.url), "utf8")
      );
      return json;
    }
  } catch (error) {
    throw new Error(`Failed to read or parse JSON file: ${error.message}`);
  }
}

export async function appendToJSONFile(filePath, url) {
  try {
    if (url === "/favicon.ico") {
      return;
    }

    let json = {};

    if (existsSync(filePath)) {
      try {
        json = await readJSONFile(filePath);
      } catch (err) {
        return new ServerResponse(
          500,
          `Error reading or parsing JSON file: ${err.message}`
        );
      }
    }

    if (json[url]) {
      json[url] += 1;
    } else {
      json[url] = 1;
    }

    await writeFile(filePath, JSON.stringify(json, null, 2), "utf8");

    return new ServerResponse(200, `URL ${url} was successfully updated.`);
  } catch (error) {
    return new ServerResponse(
      500,
      `Failed to update JSON file: ${error.message}`
    );
  }
}
