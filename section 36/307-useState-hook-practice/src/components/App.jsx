import React from "react";

function App() {
  const [time, getTime] = React.useState(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  );

  function temp() {
    getTime(
      new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    );
  }

  setInterval(temp, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={temp}>Get Time</button>
    </div>
  );
}

export default App;
