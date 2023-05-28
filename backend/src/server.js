import express from "express";
import { MongoClient } from "mongodb";

//stand-in db
// let articlesInfo = [
//   {
//     name: "moon-in-aquarius",
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: "sun-in-aquarius-7th-house",
//     upvotes: 0,
//     comments: [],
//   },
//   {
//     name: "leo-rising-sun-opposite",
//     upvotes: 0,
//     comments: [],
//   },
// ];

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
// app.put("/api/articles/:name/upvote", (req, res) => {
//   const { name } = req.params;
//   const article = articlesInfo.find((a) => a.name === name);
//   if (article) {
//     article.upvotes += 1;
//     res.send(`The article has ${article.upvotes} ${article.upvotes > 1 || article.upvotes === 0 ? "upvotes" : "upvote"}`);
//   } else {
//     res.send(`That article doesn't exist`);
//   }
// });

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
