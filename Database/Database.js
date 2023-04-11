const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://Darkshiira:Boodise87@cluster0.wcjvn29.mongodb.net/?retryWrites=true&w=majority";

const db = {
  client: undefined,
  Names: undefined,
  connect: async () =>
    MongoClient.connect(url)
      .then((client) => {
        db.client = client;
        db.Names = client.db("Test").collection("Names");
        console.log("connected to database");
      })
      .catch((error) => console.log(error)),
  disconnect: () => {
    db.client.close();
  },
};

exports.db = db;