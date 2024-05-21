import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { log } from "console";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));//cần đoạn này để tạo ra .body cho req

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post("/submit", (req, res) => {
    const temp = new Date(req.body["day"]);
    const day = temp.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    res.render("./index.ejs", 
    { day: dayNames[day] } //cái tham số này có thể hiểu nó chỉ là một object mình tự thêm vào để đưa vào file ejs với tên của nó là "day"
    );
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });