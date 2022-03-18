import styled from "styled-components";
import useSWR from "swr";
import EditForm from "../components/EditButton/EditForm";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const swrJokes = useSWR("/api/jokes", fetcher);

  // const [jokes, setJokes] = useState();
  // console.log(jokes);

  // useEffect(() => {
  //   async function fetchJokes() {
  //     try {
  //       const response = await fetch("/api/jokes");
  //       const dataJokes = await response.json();
  //       setJokes(dataJokes.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  //   fetchJokes();
  // }, [jokes]);

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this joke")) {
      const response = await fetch(`/api/jokes/${id}`, { method: "DELETE" });
      const deletedJoke = await response.json();
      if (response.ok) {
        alert(`Data with ID ${deletedJoke.data._id} has been deleted`);
        swrJokes.mutate();
      } else {
        alert(`oops - ${deletedJoke.error}`);
      }
    }
  }

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
      swrJokes.mutate();
      event.target.reset();
    } else {
      alert(`oops - ${createdJoke.error}`);
    }
  }

  return (
    <StyledDiv>
      <h1>Jokes-App</h1>
      <StyledDiv>
        <h2>Create your own jokes</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="joke"></label>
          <StyledInputField
            id="joke"
            required
            type="text"
            name="joke"
          ></StyledInputField>
          <StyledInput type="submit" value="Submit"></StyledInput>
        </form>
      </StyledDiv>
      <StyledUl>
        {swrJokes.data ? (
          swrJokes.data.data.map((joke) => (
            <StyledArticle key={joke._id}>
              <span>{joke.text}</span>
              <StyledContainer>
                <EditForm
                  joke={joke}
                  swrJokes={swrJokes}
                  onDelete={handleDelete}
                ></EditForm>

                {/* <StyledButton onClick={(item) => handleDelete(joke._id)}>
                  Delete
                </StyledButton> */}
              </StyledContainer>
            </StyledArticle>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </StyledUl>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 250px;
  background-color: #3b848c;
  border-radius: 14px;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.3);
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

const StyledInput = styled.input`
  background-color: #a67458;
  border-radius: 14px;
  &:hover {
    cursor: pointer;
  }
  height: 50px;
  width: 80px;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInputField = styled.input`
  border-radius: 14px;
  width: 300px;
  height: 50px;
`;
