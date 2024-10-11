import { htmlResponse, simpleResponse } from "./utils.mjs";

export const routes = (req, res) => {
  const { url } = req;

  if (url === "/") {
    return htmlResponse(res, "./pages/index.html");
  }

  if (url === "/coffee") {
    return htmlResponse(res, "./pages/coffee.html");
  }

  if (url === "/music") {
    return htmlResponse(res, "./pages/music.html");
  }

  simpleResponse(res, 200, "Hello World!");
};
