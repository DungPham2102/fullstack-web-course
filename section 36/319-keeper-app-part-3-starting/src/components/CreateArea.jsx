import React from "react";

function CreateArea(props) {
  const [note, setNote] = React.useState({ title: "", content: "" });

  function changeNote(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function addNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  }

  return (
    <div>
      <form>
        <input
          onChange={changeNote}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={changeNote}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button onClick={addNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
