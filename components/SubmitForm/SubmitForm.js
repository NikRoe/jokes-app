import { useState } from "react";
import styled from "styled-components";

export default function SubmitForm({ onSubmit }) {
  const [formValue, setFormValue] = useState("");
  function handleChange(inputValue) {
    console.log(inputValue);
    setFormValue(inputValue);
    onSubmit(formValue);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="joke"></label>
      <StyledInputField
        id="joke"
        required
        type="text"
        name="joke"
        value={formValue}
        onChange={(e) => handleChange(e.target.value)}
      ></StyledInputField>
      <StyledInput type="submit" value="Submit"></StyledInput>
    </form>
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

const StyledInputField = styled.input`
  border-radius: 14px;
  width: 300px;
  height: 50px;
`;
