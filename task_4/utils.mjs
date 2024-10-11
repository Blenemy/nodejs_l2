import fs from "fs";

export function simpleResponse(response, statusCode, message) {
  response.writeHead(statusCode, { "Content-Type": "text/plain" });
  response.end(`${message}`);
}

export function htmlResponse(response, filePath) {
  return fs.readFile(filePath, (err, data) => {
    if (err) {
      simpleResponse(response, 500, "Something went wrong");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    return response.end();
  });
}
