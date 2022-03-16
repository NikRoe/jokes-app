import Link from "next/link";
import styled from "styled-components";

export default function Create() {
  //we create a submit handler to use fetch once the form is being submitted
  async function handleSubmit(event) {
    event.preventDefault();
    const jokeText = event.target.elements.joke.value;
    //the above constant equals to value of the element that is within the form element and has the name joke

    const response = await fetch("api/jokes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: jokeText }),
    });
    // we need to define in an object which method, header etc are being fetched
    const createdJoke = await response.json();
    if (response.ok) {
      alert(`Data has been added with ID ${createdJoke.data._id}`);
    } else {
      alert(`oops - ${createdJoke.error}`);
    }
  }

  return (
    <StyledDiv>
      <h2>Create your own jokes</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="joke"></label>
        <input id="joke" required type="text" name="joke"></input>
        <input type="submit" value="Submit"></input>
      </form>
      <Link href="/">
        <a>
          <button>Back home</button>
        </a>
      </Link>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;
