import express from "express";
import { MongoClient } from "mongodb";

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db(`react---creating-hosting-a-fullstack-site`);

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

//upvote api endpoint
app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  const client = new MongoClient("mongodb://127.0.0.1:27017");
  await client.connect();

  const db = client.db(`react---creating-hosting-a-fullstack-site`);
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

// app.post("/api/articles/:name/comments", (req, res) => {
//   const { postedBy, text } = req.body;
//   const { name } = req.params;
//   const article = articlesInfo.find((a) => a.name === name);
//   if (article) {
//     article.comments.push({ postedBy, text });
//     res.send(article.comments);
//   } else {
//     res.send(`That article doesn't exist!`);
//   }
// });

app.listen(8080, () => {
  console.log("listening on port 8080");
});
