import { MongoClient } from "mongodb";
require('dotenv').config();

const db_user = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;

const url =
  `mongodb+srv://${db_user}:${db_password}@cluster0.affxc.mongodb.net/tours?retryWrites=true&w=majority`;

const dbConnection = async (operations, res) => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db();
    await operations(db);
  } catch (err) {
    return res.status(500).json({ message: "Error connecting to database" });
  }
  client.close();
};
module.exports = dbConnection;
