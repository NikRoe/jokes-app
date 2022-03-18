import styled from "styled-components";

export default function DeleteButton({ joke, onDelete }) {
  return (
    <StyledButton onClick={(item) => onDelete(joke._id)}>Delete</StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: #a67458;
  border-radius: 14px;
  &:hover {
    cursor: pointer;
  }
  height: 50px;
  width: 80px;
`;
