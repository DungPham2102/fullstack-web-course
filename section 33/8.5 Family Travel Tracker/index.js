import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world1",
  password: "uncl3l4k3",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

let users = [];

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries AS vc JOIN users ON vc.user_id = users.user_id WHERE vc.user_id = $1",
    [currentUserId]);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function checkUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  //console.log(users);
  return users.find((user) => user.user_id === currentUserId);
  
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await checkUser();
  //console.log(currentUser);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  //console.log(req.body);

  if(req.body.add === "new"){
    res.render("new.ejs");
  }else{
    currentUserId = parseInt(req.body.user);//đoạn này là chuyển sang người dùng được click vào, lưu ý là đoạn này mình phải parseInt là bởi req.body.user có dạng string và hàm checkVisited ở trên sẽ so sánh === nên mặc dù cùng giá trị nên khác kiểu thì cũng sẽ không thỏa mãn nếu phải chuyển nó sang dạng số bằng parseInt (có cách khác là chuyển kiểu so sánh === sang == ở hàm checkVisted cũng OK)
    res.redirect("/");
  }

});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  
  //RETURNING có tác dụng trả về dữ liệu mình tự chọn của bảng mà mình insert thêm dữ liệu vào, có thể hiểu nó như là SELECT sau khi INSERT 
  const result = await db.query("INSERT INTO users (name, color) VALUES ($1, $2) RETURNING *;",
  [req.body.name, req.body.color]);

  //console.log(result.rows[0]);
  currentUserId = result.rows[0].user_id;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
