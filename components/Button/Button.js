import styled from "styled-components";

export default function Button({ name }) {
  return <NormalButton>{name}</NormalButton>;
}

const NormalButton = styled.button`
  border-radius: 14px;
`;
