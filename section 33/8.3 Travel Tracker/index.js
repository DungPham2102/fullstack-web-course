import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "uncl3l4k3",
  port: 5432,
});

db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//function này có tác dụng lấy các quốc gia đã visit để truyền vào mảng visited
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_country");
  let visited = [];
  //đoạn này phải nói là cực khó hiểu, mình chỉ trích xuất mỗi mã country từ database
  for(var i=0; i<result.rows.length; i++){
    visited.push(result.rows[i].country_code);
  }
  return visited;
}

app.get("/", async (req, res) => {
  //Write your code here.

  const visited = await checkVisisted();
  // console.log(visited);
  res.render("index.ejs", {
    countries:  visited,
    total: visited.length
  })
});

app.post("/add", async (req, res) => {
  const addCountry = req.body["country"];

  //đoạn try-catch này mình đang thử xem có tìm được country mà mình muốn không, nếu không thì country đó không tồn tại
  try {
    //sau câu lệnh này thì nó sẽ trả về array với một phần tử duy nhất chứa dữ liệu cần tìm
    //đoạn này không có await thì code sẽ không chạy được bởi có thể hiểu là mình sẽ ép browser phải đợi để lấy được data từ database, nếu thấy lỗi thì chuyển sang catch luôn, còn nếu không có await thì nó sẽ chạy câu lệnh đó và xảy ra lỗi
    const countries = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", [addCountry.toLowerCase()]);
    
    const countryCode = countries.rows[0].country_code;
    console.log(countryCode);

    //đoạn try-catch này là mình đang thử xem cái country mình thêm vào có unique không, nếu có thì nó thêm vào còn nếu không thì sẽ báo lỗi
    try{

      //đoạn này không có await thì code sẽ không chạy được bởi có thể hiểu là mình sẽ ép browser phải đợi để lấy được data từ database, nếu thấy lỗi thì chuyển sang catch luôn, còn nếu không có await thì nó sẽ chạy câu lệnh đó và xảy ra lỗi
      await db.query("INSERT INTO visited_country (country_code) VALUES ($1)", [countryCode]);
      res.redirect("/");
    }catch(err){
      console.log(err);
      const visited = await checkVisisted();
      res.render("index.ejs", {
      error: "You had already add this country!",
      countries:  visited,
      total: visited.length
    });
    };


  }catch(err){
    console.log(err);
    const visited = await checkVisisted();
    res.render("index.ejs", {
      error: "Your country does not exist!",
      countries:  visited,
      total: visited.length
    });
  };
  
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
