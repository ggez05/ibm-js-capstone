// db.js
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

// MongoDB connection URL with authentication options
const url = `${process.env.MONGO_URL}`;

const dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  const client = new MongoClient(url);

  await client.connect();

  var dbInstance = client.db(dbName);

  return dbInstance;
}

module.exports = connectToDatabase;
