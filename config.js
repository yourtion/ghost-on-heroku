var path = require("path");
var appRoot = path.join(__dirname, "..");
function getMysqlConfig(connectionUrl) {
  if (connectionUrl == null) {
    return {};
  }

  var dbConfig = url.parse(connectionUrl);
  if (dbConfig == null) {
    return {};
  }

  var dbAuth = dbConfig.auth ? dbConfig.auth.split(":") : [];
  var dbUser = dbAuth[0];
  var dbPassword = dbAuth[1];

  if (dbConfig.pathname == null) {
    var dbName = "ghost";
  } else {
    var dbName = dbConfig.pathname.split("/")[1];
  }

  var dbConnection = {
    host: dbConfig.hostname,
    port: dbConfig.port || "3306",
    user: dbUser,
    password: dbPassword,
    database: dbName
  };
  return dbConnection;
}

var config = {
  // ### Development **(default)**
  development: {
    // The url to use when providing links to the site, E.g. in RSS and email.
    url: "http://127.0.0.1:2368",
    database: {
      client: "sqlite3",
      connection: {
        filename: path.join(__dirname, "/content/data/ghost-dev.db")
      },
      debug: false
    },
    mail: {
      transport: "Direct"
    },
    process: "local",
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: "127.0.0.1",
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: "2368"
    },
    paths: {
      contentPath: path.join(__dirname, "/content/")
    }
  },

  // ### Production
  // When running Ghost in the wild, use the production environment
  // Configure your URL and mail settings here
  production: {
    url: process.env.APP_PUBLIC_URL,

    logging: {
      level: "info",
      transports: ["stdout"]
    },
    mail: {
      transport: "SMTP",
      options: {
        service: "Mailgun",
        auth: {
          user: process.env.MAILGUN_SMTP_LOGIN,
          pass: process.env.MAILGUN_SMTP_PASSWORD
        }
      }
    },
    fileStorage: false,
    storage: {},
    database: {
      client: "mysql",
      connection: getMysqlConfig(
        process.env.MYSQL_DATABASE_URL ||
          process.env.JAWSDB_URL ||
          process.env.CLEARDB_DATABASE_URL
      ),
      pool: { min: 0, max: 5 },
      debug: false
    },
    server: {
      host: "0.0.0.0",
      port: process.env.PORT
    },
    paths: {
      contentPath: path.join(appRoot, "/content/")
    }
  }
};

module.exports = config;
