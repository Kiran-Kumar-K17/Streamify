import mongoose from "mongoose";
import { Schema } from "mongoose";

const movieSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    releaseYear: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number, // in minutes
      required: true,
    },

    language: {
      type: String,
      default: "English",
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin user
      required: true,
    },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
