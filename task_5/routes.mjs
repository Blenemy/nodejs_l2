import { appendToJSONFile, readJSONFile, simpleResponse } from "./utils.mjs";

export const routes = async (req, res) => {
  const { url } = req;

  const { historyFilePath, historyRoute } = await readJSONFile(
    "./settings.json"
  );

  if (url === historyRoute) {
    const historyData = await readJSONFile(historyFilePath);

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>History Data</title>
        </head>
        <body>
          <h1>History Data</h1>
          <ul>
            ${Object.entries(historyData)
              .map(
                ([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`
              )
              .join("")}
          </ul>
        </body>
        </html>
      `;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
    return;
  }

  await appendToJSONFile(historyFilePath, url);

  simpleResponse(res, 200, "Hello world!");
};
