import { Movie } from "../models/movie.model.js";
import { deleteFile } from "../utils/file.js";
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

const getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, genre, year, language } = req.query;

    const query = {};

    // 🔍 Search (title)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 🎭 Filters
    if (genre) query.genre = genre;
    if (year) query.releaseYear = Number(year);
    if (language) query.language = language;

    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
      .select("title thumbnailUrl genre releaseYear")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Movie.countDocuments(query);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
      movies,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movie" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update metadata
    Object.assign(movie, req.body);

    // Replace video if uploaded
    if (req.files?.video) {
      deleteFile(movie.videoUrl);
      movie.videoUrl = `/uploads/videos/${req.files.video[0].filename}`;
    }

    // Replace thumbnail if uploaded
    if (req.files?.thumbnail) {
      deleteFile(movie.thumbnailUrl);
      movie.thumbnailUrl = `/uploads/thumbnails/${req.files.thumbnail[0].filename}`;
    }

    await movie.save();

    res.json({ message: "Movie updated", movie });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    deleteFile(movie.videoUrl);
    deleteFile(movie.thumbnailUrl);

    await movie.deleteOne();

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("DELETE MOVIE ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};

export { createMovies, getMovies, getMovieById, updateMovie, deleteMovie };
