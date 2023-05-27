import express from "express";

const app = express();

app.use(express.json());

app.post("/hello", (req, res) => {
  console.log(req.params);
  res.send(`heyya, ${req.body.name}`);
});

app.get("/hello/:name", (req, res) => {
  const { name } = req.params;
  res.send(`hello ${name}!!!`);
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
