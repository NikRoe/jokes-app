import { Schema, model } from "mongoose";

const jokeSchema = new Schema(
  {
    text: { type: String, required: true },
    _id: String,
  },
  { timestamps: true }
);

export default model("Joke", jokeSchema, "jokes", { overwriteModels: true });
