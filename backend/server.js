const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
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

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // per IP
  message: { error: "Too many requests, please try again later." },
});

app.use("/api/anime", apiLimiter, animeRoutes);
app.use("/api/manga", apiLimiter, mangaRoutes);
app.use("/db", trackingRoutes);
