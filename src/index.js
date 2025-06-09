// "use strict";
// require("fix-esm").register();
import inert from "@hapi/inert";
import server from "./util/server.js";
import setupRoute from "./util/setup.js";
import hapiswagger from "hapi-swagger";
import vision from "@hapi/vision";
import Joi from "joi";

const init = async () => {

  await server.register([inert, vision]);

  server.validator(Joi)

  // Define Swagger options
  const swaggerOptions = {
    info: {
      title: "Hapi API Documentation",
      version: "1.0.0",
      
    },
    grouping : "tags"
  };

  // Register Swagger with the server
  await server.register({
    plugin: hapiswagger,
    options: swaggerOptions,
  });


  setupRoute(server);

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init()

