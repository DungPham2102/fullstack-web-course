import React from "react";

function App() {
  const [headingText, setHeadingText] = React.useState("Hello");
  const [mouseOverStyle, setMouseOverStyle] = React.useState({});

  function handleClick() {
    setHeadingText("Submitted");
  }

  function handleMouseOver() {
    setHeadingText("Mouse Over");
    setMouseOverStyle({ backgroundColor: "black" });
  }

  function handleMouseOut() {
    setHeadingText("Mouse Out");
    setMouseOverStyle({ backgroundColor: "white" });
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={mouseOverStyle}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
