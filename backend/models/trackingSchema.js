const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trackingSchema = new Schema(
  {
    mal_id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    episodesWatched: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true },
);

trackingSchema.index({ mal_id: 1, mediaType: 1 }, { unique: true });

module.exports = mongoose.model("TrackingSchema", trackingSchema);
