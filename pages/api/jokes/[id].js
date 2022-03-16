import Joke from "../../../Schema/Joke";
import { connectDb } from "../../../utils/db";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    connectDb();

    switch (request.method) {
      case "GET":
        const requestedJoke = await Joke.findById(id);

        if (requestedJoke) {
          response.status(200).json(requestedJoke);
        } else {
          response.status(404).json({ error: "File not found" });
        }

        break;
      case "PATCH":
        const updatedJoke = await Joke.findByIdAndUpdate(
          id,
          { $set: request.body },
          { returnDocument: "after", runValidators: true }
        );

        if (updatedJoke) {
          response.status(200).json({ success: true, data: updatedJoke });
        } else {
          response.status(404).json({ error: "File not found" });
        }

        break;
      case "DELETE":
        const deletedJoke = await Joke.findByIdAndDelete(id);

        if (deletedJoke) {
          response.status(200).json({ success: true, data: deletedJoke });
        } else {
          response.status(404).json({ error: "File not found" });
        }
        break;
      default:
        response.status(405).json({ error: "Method not supported" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
}
