import fs from "fs";
import admin from "firebase-admin";
import express from "express";
import { db, connectToDb } from "./db.js";
import morgan from "morgan";

const credentials = JSON.parse(fs.readFileSync("backend/credentials.json"));

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

app.use(morgan("dev"));

// express middlware to autoload user info
app.use(async (req, res, next) => {
  //get auth token
  const { authToken } = req.headers;
  //console.log("authToken: " + authToken);
  if (authToken) {
    try {
      //use token w/ firebase auth to load user info
      req.user = await admin.auth().verifyIdToken(authToken);
    } catch (e) {
      return res.sendStatus(400);
    }
  }

  req.user = req.user || {};

  next();
});

//api routes
//GET article by name
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;

  const article = await db.collection("articles").findOne({ name });
  console.log(article);

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);

    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

//middleware to prevent user from making requests to upvote & comments endpoints if they're not logged in
app.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

//upvote api endpoint
app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const { uid } = req.user;
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.include(uid);

    if (canUpvote) {
      await db.collection("articles").updateOne(
        { name },
        {
          $inc: { upvotes: 1 },
          $push: { upvoteIds: uid },
        }
      );
    }

    const updatedArticle = await db.collection("articles").findOne({ name });

    res.json(updatedArticle);
  } else {
    res.sendStatus(`That article does not exist`);
  }
});

//post/add comment
app.post("/api/articles/:name/comments", async (req, res) => {
  const { text } = req.body;
  const { name } = req.params;
  const { email } = req.user;

  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy: email, text } },
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
