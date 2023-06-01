import express from "express";
import { db, connectToDb } from "./db.js";
import fs from "fs";
import admin from "firebase-admin";

const credentials = JSON.parse(fs.readFileSync("backend/credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

// express middlware to autoload user info
app.use(async (req, res, next) => {
  //get auth token
  const authToken = req.headers;

  if (authToken) {
    try {
      //use token w/ firebase auth to load user info
      req.user = await admin.auth().verifyIdToken(authToken);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  next();
});

//api routes
//GET article by name
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.include(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

//upvote api endpoint
app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(`That article does not exist`);
  }
});

//post/add comment
app.post("/api/articles/:name/comments", async (req, res) => {
  const { postedBy, text } = req.body;
  const { name } = req.params;

  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy, text } },
    }
  );
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send(`That article doesn't exist!`);
  }
});

connectToDb(() => {
  console.log("Successfully connected to db and server initiated");
  app.listen(8080, () => {
    console.log("listening on port 8080");
  });
});
