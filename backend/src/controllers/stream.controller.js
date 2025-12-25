import fs from "fs";
import path from "path";
import { Movie } from "../models/movie.model.js";

export const streamVideo = async (req, res) => {
  try {
    const { movieId } = req.params;

    // 1️⃣ Get movie
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send("Movie not found");

    // 2️⃣ Resolve file path
    const videoPath = path.resolve(`.${movie.videoUrl}`);
    const videoSize = fs.statSync(videoPath).size;

    // 3️⃣ Read Range header
    const range = req.headers.range;
    if (!range) {
      return res.status(400).send("Requires Range header");
    }

    // 4️⃣ Parse range
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // 5️⃣ Headers
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    };

    // 6️⃣ Send chunk
    res.writeHead(206, headers);
    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Streaming error");
  }
};
