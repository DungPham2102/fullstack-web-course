import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.get("/test", (req, res) => {
  res.send("<h1>I'm just testing</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact Me</h1><p>My phone number:</p>");
});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
