import { Movie } from "../models/movie.model.js";

const createMovies = async (req, res) => {
  try {
    const { title, description, genre, releaseYear, duration, language } =
      req.body;

    if (!title || !description || !genre || !releaseYear || !duration) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    if (!req.files?.video || !req.files?.thumbnail) {
      return res.status(400).json({
        message: "Video and thumbnail are required",
      });
    }

    const videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
    const thumbnailUrl = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;

    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear,
      duration,
      language,
      videoUrl,
      thumbnailUrl,
      createdBy: req.user.id, // admin id from auth middleware
    });

    res.status(201).json({
      message: "Movie created successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { createMovies };
