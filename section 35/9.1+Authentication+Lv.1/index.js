import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "9.1",
  password: "uncl3l4k3"
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try{
    const checkUser = await db.query("SELECT * FROM users_login_info WHERE email = $1;", [email]);

    if(checkUser.rows.length > 0){
    res.send("Email already exist!");
  }else{
      await db.query("INSERT INTO users_login_info (email, password) VALUES ($1, $2);", [email, password]);
      res.render("secrets.ejs");
  }
  }catch(err){
    console.log(err);
  }
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try{
    const checkUser = await db.query("SELECT * FROM users_login_info WHERE email = $1;", [email]);
    if(checkUser.rows.length === 1){
      if(checkUser.rows[0].password === password){
        res.render("secrets.ejs");
      }else{
        res.send("Your password is incorrect!");
      }
    }else{
      res.send("Your account does not exist!");
    }
  }catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
