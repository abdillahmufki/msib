const routes = require("./routes");

const Hapi = require("@hapi/hapi");
require("dotenv").config();
const port = process.env.PORT || 9000;

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 9000, // Accessing PORT environment variable or defaulting to 9000
    host: process.env.HOST || "localhost", // Accessing HOST environment variable or defaulting to localhost
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on port ${server.info.uri}`);
};

init();
