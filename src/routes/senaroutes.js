const express = require("express");
const { listSenas, createSena } = require("../database/senas");

const router = express.Router();

router.get("/", async function(req, res) {
    try {
        const response = await listSenas();
        res.json(response.rows);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar jogos." });
    }
});

router.post("/", async function(req, res) {
    const { nros } = req.body;

    if (!nros || nros.length !== 6) {
        return res.status(400).json({ message: "Envie exatamente 6 números." });
    }

    try {
        const nrosFormatted = nros
            .map(Number)
            .sort((a, b) => a - b)
            .map(n => String(n).padStart(2, "0"))
            .join(",");
        const response = await createSena(nrosFormatted);
        res.status(201).json(response.rows[0]);
    } catch (err) {
        console.error("Erro ao cadastrar:", err.message);
        res.status(500).json({ message: "Erro ao cadastrar jogo." });
    }
});

module.exports = router;
