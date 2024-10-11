import {
  appendTextToFile,
  deleteFile,
  readTextFile,
  simpleResponse,
} from "./utils.mjs";

const filePath = "./numbers.txt";

export const routes = async (req, res) => {
  const { url } = req;
  const urlParts = url.split("/");
  const urlLastPart = urlParts[urlParts.length - 1];

  if (urlParts.includes("save_num")) {
    const { statusCode, message } = await appendTextToFile(
      filePath,
      `${urlLastPart} \n`
    );

    simpleResponse(res, statusCode, message);

    return;
  }

  if (urlParts.includes("sum")) {
    const { statusCode, message } = await readTextFile(filePath);

    if (statusCode === 200) {
      const sum = message.reduce((acc, sum) => acc + sum, 0);
      return simpleResponse(res, 500, `The sum is ${sum}`);
    } else {
      return simpleResponse(res, statusCode, message);
    }
  }

  if (urlParts.includes("mult")) {
    const { statusCode, message } = await readTextFile(filePath);

    if (statusCode === 200) {
      const mult = message.reduce((acc, sum) => acc * sum, 1);

      return simpleResponse(res, 500, `The mult is ${mult}`);
    } else {
      return simpleResponse(res, statusCode, message);
    }
  }

  if (urlParts.includes("remove")) {
    const { statusCode, message } = await deleteFile(filePath);

    simpleResponse(res, statusCode, message);

    return;
  }

  simpleResponse(res, 200, "Hello World!");
  return;
};
