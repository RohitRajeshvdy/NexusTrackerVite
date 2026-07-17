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

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/api/anime", animeRoutes);
app.use("/api/manga", mangaRoutes);
app.use("/db", trackingRoutes);
