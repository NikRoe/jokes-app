import { useState } from "react";

export default function EditButton({ joke }) {
  const [isActive, setIsActive] = useState(false);

  function editHandler() {
    setIsActive(!isActive);
  }

  async function handleUpdate(event) {
    event.preventDefault();
    const jokeText = event.target.elements.editfield.value;

    const response = await fetch(`/api/jokes/${joke._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: jokeText }),
    });

    const updatedJoke = await response.json();
    if (response.ok) {
      alert(`Data has been updated with text ${updatedJoke.data.text}`);
    } else {
      alert(`oops - ${updatedJoke.error}`);
    }
    editHandler();
  }

  return (
    <>
      {isActive ? (
        <form onSubmit={handleUpdate}>
          <label htmlFor="editfield"></label>
          <input id="editfield" type="text" required name="editfield"></input>
          <input type="submit" value="Update"></input>
        </form>
      ) : (
        <button onClick={editHandler}>Edit</button>
      )}
    </>
  );
}
