const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middleware = jsonServer.defaults({ static: "./build" });

server.use(middleware);

server.use(jsonServer.rewriter({ "/*": "/$1" }));

server.use(router);
server.listen(4000, () => {
  console.log("server is running on Port 4000");
});
