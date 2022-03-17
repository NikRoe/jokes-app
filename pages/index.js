import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import EditButton from "../components/EditButton/EditButton";

export default function Home() {
  const [jokes, setJokes] = useState();
  //

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
  }, [jokes]);

  async function handleDelete(id) {
    console.log(id);
    const response = await fetch(`/api/jokes/${id}`, { method: "DELETE" });
    const deletedJoke = await response.json();
    if (response.ok) {
      alert(`Data with ID ${deletedJoke.data._id} has been deleted`);
    } else {
      alert(`oops - ${deletedJoke.error}`);
    }
  }

  return (
    <StyledDiv>
      <h1>Jokes-App</h1>
      <ul>
        {jokes ? (
          jokes.map((joke) => (
            <StyledLi key={joke._id}>
              <span>{joke.text}</span>
              <div>
                <EditButton joke={joke}></EditButton>

                <button onClick={(item) => handleDelete(joke._id)}>
                  Delete
                </button>
              </div>
            </StyledLi>
          ))
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

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
