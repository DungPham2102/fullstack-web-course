import React from "react";

function App() {
  const [inputText, setInputText] = React.useState("");
  const [arr, setArr] = React.useState([]);

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function handleClick() {
    setArr((prevValue) => {
      return [...prevValue, inputText];
    });
    setInputText("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>

      <div>
        <ul>
          {arr.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
