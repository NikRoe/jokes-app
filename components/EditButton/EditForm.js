import { useState } from "react";
import styled from "styled-components";

export default function EditForm({ joke, swrJokes }) {
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
      swrJokes.mutate();
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
          <StyledInputField
            id="editfield"
            type="text"
            required
            name="editfield"
            defaultValue={joke.text}
          ></StyledInputField>
          <StyledInput type="submit" value="Update"></StyledInput>
        </form>
      ) : (
        <StyledButton onClick={editHandler}>Edit</StyledButton>
      )}
    </>
  );
}

const StyledInput = styled.input`
  background-color: #a67458;
  border-radius: 14px;
  &:hover {
    cursor: pointer;
  }
  height: 50px;
  width: 80px;
`;

const StyledButton = styled.button`
  background-color: #a67458;
  border-radius: 14px;
  &:hover {
    cursor: pointer;
  }
  height: 50px;
  width: 80px;
`;

const StyledInputField = styled.input`
  border-radius: 14px;
  width: 80px;
  height: 50px;
`;
