const ghost = require("ghost");

let server;

ghost()
  .then(ghostServer => {
    ghostServer.start();
    server = ghostServer;
  })
  .catch(error => {
    console.error(`Ghost server error: ${error.message} ${error.stack}`);
    process.exit(1);
  });

process.on("SIGTERM", () => {
  console.log("On SIGTERM");
  if (!server) return process.exit(0);
  server
    .stop()
    .then(() => {
      console.log("Bye !");
      process.exit(0);
    })
    .catch(err => {
      console.error("Ghost exit error: ", err);
      process.exit(1);
    });
});
