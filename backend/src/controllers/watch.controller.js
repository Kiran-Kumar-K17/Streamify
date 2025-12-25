import { WatchHistory } from "../models/watchHistory.model.js";
const saveProgress = async (req, res) => {
  try {
    const { movieId, currentTime, completed } = req.body;

    await WatchHistory.findOneAndUpdate(
      { userId: req.user.id, movieId },
      {
        lastTime: currentTime,
        completed: !!completed,
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Progress saved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save progress" });
  }
};

const getProgress = async (req, res) => {
  try {
    const history = await WatchHistory.findOne({
      userId: req.user.id,
      movieId: req.params.movieId,
    });

    res.json({
      lastTime: history?.lastTime || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get progress" });
  }
};

const continueWatching = async (req, res) => {
  const list = await WatchHistory.find({
    userId: req.user.id,
    completed: false,
  }).populate("movieId", "title thumbnailUrl");

  res.json(list);
};

export { saveProgress, getProgress, continueWatching };
