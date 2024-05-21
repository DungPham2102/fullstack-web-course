import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;


//đoạn này là để kết nối với pg server, user và pasword phải được nhập đúng hoàn toàn 
const db = new pg.Client({
  user: "postgres", // đây là superuser của postgres
  host: "localhost",// do sử dụng host local nên trường dữ liệu này sẽ để localhost
  database: "world",//đây là cơ sở dữ liệu mình tạo
  password: "uncl3l4k3",//password do mình tự tạo lúc cài localhost
  port: 5432,
});

//câu lệnh này kết nối với database mà ta đã tạo
db.connect();

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

//đoạn này là để truy vấn dữ liệu từ database sử dụng .query()
db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;//nạp dữ liệu từ hàng vào quiz, cơ bản là mỗi hàng (Mỗi bản ghi của mảng) sẽ là một phẩn tử trong array quiz
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();//đoạn này dùng await có thể hiểu là bắt trang phải đợi cho tới khi lây được dữ liệu từ database
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
