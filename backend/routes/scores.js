const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {

    const { name, score, correctAnswers } = req.body;

    try {

        const playerResult = await db.query(
            "INSERT INTO players (name) VALUES (?)",
            [name]
        );

        const playerId = playerResult[0].insertId;

        await db.query(
            "INSERT INTO scores (player_id, score, correct_answers) VALUES (?, ?, ?)",
            [playerId, score, correctAnswers]
        );

        res.json({
            message: "Pontszám elmentve"
        });

    } catch (error) {

        res.status(500).json({
            message: "Mentési hiba"
        });

    }

});

module.exports = router;