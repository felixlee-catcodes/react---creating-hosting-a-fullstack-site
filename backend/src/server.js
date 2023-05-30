import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    console.log(article);
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
    res.send(article.comments);
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
