const TrackingSchema = require("../models/trackingSchema");

const postData = async (req, res) => {
  const { mal_id, title, mediaType, status, episodesWatched, rating } =
    req.body;

  try {
    const updatedEntry = await TrackingSchema.findOneAndUpdate(
      { mal_id: Number(mal_id), mediaType },
      {
        title,
        status,
        episodesWatched: Number(episodesWatched),
        rating: Number(rating),
      },
      { returnDocument: "after", upsert: true },
    );

    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getData = async (req, res) => {
  try {
    const data = await TrackingSchema.find({});
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSingleData = async (req, res) => {
  const { mediaType, mal_id } = req.params;

  try {
    const item = await TrackingSchema.findOne({
      mal_id: Number(mal_id),
      mediaType,
    });

    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getData, postData, getSingleData };
