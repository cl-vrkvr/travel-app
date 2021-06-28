import express from "express";
import bodyParser from "body-parser";
import path from "path";
const dbConnection = require("./dbConnection");

const port = 8000;
const app = express();

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json());

app.post("/api/tours/subscriptions/subscribe", async (req, res, next) => {
  dbConnection(async (db) => {
    const { email } = req.body;
    const newSubscription = {
      email,
    };

    const result = await db
      .collection("subscriptions")
      .insertOne(newSubscription);

    res.status(200).json(result);
  }, res);
});

app.post("/api/tours/trips/add-trip", async (req, res, next) => {
  dbConnection(async (db) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      destination,
      traveller,
    } = req.body;
    const newTrip = {
      firstName,
      lastName,
      email,
      phone,
      destination,
      traveller,
    };
    const result = await db.collection("trips").insertOne(newTrip);
    res.status(200).json(result);
  }, res);
});

app.post("/api/tours/users/add-user", async (req, res, next) => {
  dbConnection(async (db) => {
    const { firstName, lastName, email, password, birthday } = req.body;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      birthday,
    };
    const result = await db.collection("users").insertOne(newUser);

    res.status(200).json(result);
  }, res);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
