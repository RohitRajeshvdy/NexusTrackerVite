const express = require("express");
const cors = require("cors");
const animeRoutes = require("./routes/animeRoute");
const mangaRoutes = require("./routes/mangaRoute");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/api/anime", animeRoutes);
app.use("/api/manga", mangaRoutes);

app.listen(PORT, () =>
  console.log(`backend opened at http://localhost:${PORT}`)
);