import React from "react";

function App() {
  const [name, setName] = React.useState("");
  const [tempName, setTempName] = React.useState("");

  function handleChange(event) {
    setTempName(event.target.value);
  }

  function handleClick() {
    setName(tempName);
  }

  return (
    <div className="container">
      <h1>Hello {name}</h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={tempName}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}

export default App;
