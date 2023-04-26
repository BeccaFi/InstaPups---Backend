const { MongoClient } = require("mongodb");
require("dotenv").config();

class MongoDatabase {
  url = process.env.URL;

  client;

  database = "instapups";

  collections = ["Users", "Posts"];

  async connect() {
    try {
      console.log("Attempting to connect to database.");
      this.client = await MongoClient.connect(this.url);
      console.log("Successfully connected to the database.");
    } catch (err) {
      console.log(err);
    }

    this.setupCollections();
  }

  async disconnect() {
    console.log("closing DB connection");
    await this.client.close();
  }

  setupCollections() {
    for (const collection of this.collections) {
      this[collection] = this.client.db(this.database).collection(collection);
    }
  }
}

exports.db = new MongoDatabase();
