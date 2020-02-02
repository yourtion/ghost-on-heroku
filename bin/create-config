#!/usr/bin/env node
// Ghost Configuration for Heroku

const fs = require("fs");
const path = require("path");
const url = require("url");

const appRoot = path.join(__dirname, "..");
const config = {
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
  fileStorage: true,
  storage: {
    active: "qiniu",
    qiniu: {
      accessKey: process.env.QN_KEY,
      secretKey: process.env.QN_SEC,
      bucket: process.env.QN_BUCKET,
      domain: process.env.QN_DOMAIN,
      format: "${year}/${month}/${random}${ext}"
    }
  },
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
  },
  imageOptimization: {
    resize: false
  }
};

function getMysqlConfig(connectionUrl) {
  if (!connectionUrl) return {};

  const dbConfig = url.parse(connectionUrl);
  if (!dbConfig) return {};

  const dbAuth = dbConfig.auth ? dbConfig.auth.split(":") : [];
  const dbUser = dbAuth[0];
  const dbPassword = dbAuth[1];

  const dbName = dbConfig.pathname ? dbConfig.pathname.split("/")[1] : "ghost";

  const dbConnection = {
    host: dbConfig.hostname,
    port: dbConfig.port || "3306",
    user: dbUser,
    password: dbPassword,
    database: dbName
  };
  return dbConnection;
}

const configContents = JSON.stringify(config, null, 2);
fs.writeFileSync(path.join(appRoot, "config.production.json"), configContents);
