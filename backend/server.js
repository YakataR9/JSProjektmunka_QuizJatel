const express = require("express");
const cors = require("cors");

const questionRoutes = require("./routes/questions");
const scoreRoutes = require("./routes/scores");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Szerver fut a ${PORT} porton`);
});