import { simpleResponse } from "./utils.mjs";

const dilemeter = "-";

export const routes = (req, res) => {
  const { url } = req;
  const urlParts = url.split("/");
  const urlLastPart = urlParts[urlParts.length - 1];
  const numbers = urlLastPart.split(dilemeter).map(Number);

  if (urlParts.includes("sum")) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    simpleResponse(res, 200, `The Sum is ${sum}`);

    return;
  }

  if (urlParts.includes("subtract")) {
    const subtract = numbers.reduce((acc, num) => acc - num, 0);
    simpleResponse(res, 200, `The subtract is ${subtract}`);

    return;
  }

  if (urlParts.includes("mult")) {
    const mult = numbers.reduce((acc, num) => acc * num, 1);
    simpleResponse(res, 200, `The mult is ${mult}`);

    return;
  }

  simpleResponse(res, 200, "Hello World!");
};
