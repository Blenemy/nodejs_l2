import { createServer } from "node:http";
import { routes } from "./routes.mjs";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer(routes);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
