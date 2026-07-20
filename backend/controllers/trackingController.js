const TrackingSchema = require("../models/trackingSchema");

const postData = async (req, res) => {
  const {
    mal_id,
    title,
    mediaType,
    status,
    episodesWatched,
    rating,
    image,
    genres,
  } = req.body;

  try {
    const updatedEntry = await TrackingSchema.findOneAndUpdate(
      { mal_id: Number(mal_id), mediaType },
      {
        title,
        status,
        image,
        genres,
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

const deleteSingleData = async (req, res) => {
  const { mediaType, mal_id } = req.params;

  try {
    const deletedData = await TrackingSchema.findOneAndDelete({
      mal_id: Number(mal_id),
      mediaType,
    });

    if (!deletedData) {
      return res
        .status(404)
        .json({ error: "No matching record found to delete" });
    }

    res
      .status(200)
      .json({ message: "Record successfully deleted", deletedData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getData, postData, getSingleData, deleteSingleData };
