//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));//đoạn này để tạo ra đường dẫn tới folder project này bất kể khi folder này tồn tại ở máy tính nào

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true}));//cần đoạn này để tạo ra .body cho req

//tạo ra biến check và function middleWare để tạm coi như là một middleware có tác dụng kiểm tra req có đúng yêu cầu không
var check = false;

function middleWare (req, res, next){
    if(req.body["password"] === "ILoveProgramming"){
        check = true;
    }
    next();
}

//chạy middleWare
app.use(middleWare);

//hiển thị trang web 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});



app.post("/check", (req, res) => {
    if(check){
        //hiển thị file secret.html nếu kết quả đúng
        res.sendFile(__dirname + "/public/secret.html");
    }else{
        //nếu sai thì hiển thị lại trang ban đầu
        res.sendFile(__dirname + "/public/index.html");
    }
    console.log(req.body["password"]);
  })

//server sẽ nghe ở cồng 3000
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});  
