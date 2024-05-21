import React from "react";

function App() {
  const [fullName, setFullName] = React.useState({ fName: "", lName: "" });

  function updateFullName(event) {
    const { name, value } = event.target;
    setFullName((prevValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
        };
      }
    });
  }

  function handleClick(event) {
    event.preventDefault();
    console.log("Submitted");
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form>
        <input
          name="fName"
          onChange={updateFullName}
          placeholder="First Name"
        />
        <input name="lName" onChange={updateFullName} placeholder="Last Name" />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;
