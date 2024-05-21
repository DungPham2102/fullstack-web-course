import express from "express";
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

app.use(express.urlencoded({ extended: true }));
//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "thisismyaccount";
const yourPassword = "thisismypassword";
const yourAPIKey = "e1b9a9bf-64f4-4f30-8ba5-f00a5be45956";
const yourBearerToken = "ee060b26-4fc6-48f1-b87e-b4281dcef0b9";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const data = response.data;
    //console.log(data);
    const result = JSON.stringify(data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908

  try {
    //đoạn này là để tạo user trên trang kia để có thể đăng nhập vào
    const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
    auth: {
        username: yourUsername,
        password: yourPassword
    },
  });
    const data = response.data;
    //console.log(data);
    const result = JSON.stringify(data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const data = response.data;
    //console.log(data);
    const result = JSON.stringify(data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402

  try {
    //có thể hiểu đoạn này là mình đang dùng lệnh get truyền kèm với đó là token ở trong phần header
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    const data = response.data;
    //console.log(data);
    const result = JSON.stringify(data);
    res.render("index.ejs", { content: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

  
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});