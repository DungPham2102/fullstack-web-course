import React from "react";

function ToDoItems(props) {
  return (
    <div
      onClick={() => {
        props.onCheck(props.id);
      }}
    >
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItems;
