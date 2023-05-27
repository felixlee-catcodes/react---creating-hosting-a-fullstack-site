import express from "express";

//stand-in db
let articlesInfo = [
  {
    name: "moon-in-aquarius",
    upvotes: 0,
    comments: [],
  },
  {
    name: "sun-in-aquarius-7th-house",
    upvotes: 0,
    comments: [],
  },
  {
    name: "leo-rising-sun-opposite",
    upvotes: 0,
    comments: [],
  },
];

const app = express();

app.use(express.json());

//upvote api endpoint
app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;
  const article = articlesInfo.find((a) => a.name === name);
  if (article) {
    article.upvotes += 1;
    res.send(`The article has ${article.upvotes} ${article.upvotes > 1 || article.upvotes === 0 ? "upvotes" : "upvote"}`);
  } else {
    res.send(`That article doesn't exist`);
  }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { postedBy, text } = req.body;
  const { name } = req.params;
  const article = articlesInfo.find((a) => a.name === name);
  if (article) {
    article.comments.push({ postedBy, text });
    res.send(article.comments);
  } else {
    res.send(`That article doesn't exist!`);
  }
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
