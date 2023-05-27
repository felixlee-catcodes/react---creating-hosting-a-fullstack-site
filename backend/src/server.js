import express from "express";

//stand-in db
let articlesInfo = [
  {
    name: "moon-in-aquarius",
    upvotes: 0,
  },
  {
    name: "sun-in-aquarius-7th-house",
    upvotes: 0,
  },
  {
    name: "leo-rising-sun-opposite",
    upvotes: 0,
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
    res.send(`the article has ${article.upvotes} ${article.upvotes > 1 || article.upvotes === 0 ? "upvotes" : "upvote"}`);
  } else {
    res.send(`That article doesn't exist`);
  }
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
