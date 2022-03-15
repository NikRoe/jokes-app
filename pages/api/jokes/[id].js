import { jokes } from "../../../utils/joke-data";

export default function handler(request, response) {
  const { id } = request.query;

  if (request.method === "GET") {
    const joke = jokes.find((joke) => {
      return joke.id === id;
    });
    response.status(200).json({ joke });
  } else if (request.method === "PATCH") {
    console.log(request.body);
    response.status(200).json({ success: true, updatedID: id });
  } else if (request.method === "DELETE") {
    console.log(request.body);
    response.status(200).json({ success: true, deletedID: id });
  }
}
