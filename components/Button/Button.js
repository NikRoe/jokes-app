import styled from "styled-components";

export default function Button({ name }) {
  return <normalButton>{name}</normalButton>;
}

const normalButton = styled.button`
  border-radius: 14px;
`;
