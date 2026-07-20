const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Routes
const animeRoutes = require("./routes/animeRoute");
const mangaRoutes = require("./routes/mangaRoute");
const trackingRoutes = require("./routes/trackingRoute");

//Consts
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

//middlewares
const app = express();

app.use(express.json());

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `connected to mongoose and backend opened at http://localhost:${PORT}`,
      ),
    );
  })
  .catch((error) => {
    console.log(error);
  });

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((url) => url.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/anime", animeRoutes);
app.use("/api/manga", mangaRoutes);
app.use("/db", trackingRoutes);
