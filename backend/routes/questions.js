const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const response = await axios.get(
            "https://opentdb.com/api.php?amount=50&category=21&difficulty=medium&type=multiple"
        );

        res.json(response.data.results);

    } catch (error) {

        res.status(500).json({
            message: "Hiba a kérdések lekérésekor"
        });

    }

});

module.exports = router;