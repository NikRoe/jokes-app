import { jokes } from "../../utils/joke-data";

export default function handler(req, res) {
  res.status(200).json({ jokes });
}
