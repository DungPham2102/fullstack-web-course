import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">
      My Favourite Foods
    </h1>
    <ul>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf64Qs-lgL489Gg9_EDhWXvlNQpbNhEBUx3OaQkA4g3Q&s" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDqXD1qOmhIZBRer8Zaqq8-KEupV5g3DZFv8wAJzgKQ&s" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYrVoHcs2mvesxzecsdNtaM4SQv3IyK5tgzAwat7GX0Q&s" />
      </div>
    </ul>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
