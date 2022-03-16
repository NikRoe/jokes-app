import Joke from "../../../Schema/Joke";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const jokes = await Joke.find().limit(5);

        response.status(200).json({ data: jokes });
        break;
      case "POST":
        const createdJoke = await Joke.create(request.body);
        response.status(200).json({ success: true, data: createdJoke });
        break;
      case "PATCH":
        console.log(request.body);
        response.status(200).json({ success: true, updatedID: id });
        break;
      case "DELETE":
        console.log(request.body);
        response.status(200).json({ success: true, deletedID: id });
        break;
      default:
        console.log("request method was neither GET, DELETE, POST or PATCH");
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
