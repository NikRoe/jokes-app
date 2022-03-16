import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [jokes, setJokes] = useState();

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch("/api/jokes");
        const dataJokes = await response.json();
        setJokes(dataJokes.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchJokes();
  }, []);

  return (
    <StyledDiv>
      <h1>Jokes-App</h1>
      <ul>
        {jokes ? (
          jokes.map((joke) => <li key={joke._id}>{joke.text}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
      <Link href="/create">
        <a>
          <button>Create</button>
        </a>
      </Link>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
