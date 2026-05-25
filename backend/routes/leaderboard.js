const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT players.name, scores.score
            FROM scores
            JOIN players
            ON scores.player_id = players.id
            ORDER BY scores.score DESC
            LIMIT 10
        `);

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            message: "Toplista hiba"
        });

    }

});

module.exports = router;