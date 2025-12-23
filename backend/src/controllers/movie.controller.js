import { Movie } from "../models/movie.model.js";

const createMovies = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      releaseYear,
      duration,
      language,
      thumbnailUrl,
    } = req.body;

    if (
      !title ||
      !description ||
      !genre ||
      !releaseYear ||
      !duration ||
      !thumbnailUrl
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear,
      duration,
      language,
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
