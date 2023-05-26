import express from "express";

const app = express();

app.use(express.json());

app.post("/hello", (req, res) => {
  console.log(req.body);
  res.send(`heyya, ${req.body.name}`);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
