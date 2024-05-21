import React from "react";

function InputArea(props) {
  return (
    <div className="form">
      <input onChange={props.handleChange} type="text" value={props.input} />
      <button onClick={props.addItem}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
