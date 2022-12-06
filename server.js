'use strict';

const express = require('express');
const { get } = require('superagent');
const app = express();
const superagent = require('superagent');
require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).send('home route');
});

app.get('/alldigimon/', (req, res) => {
    const url = "https://digimon-api.vercel.app/api/digimon"
    superagent
    .get(url)
    .then ((digiData) => {
    const digimon = digiData.body.map((digimon) => digimon);
        res.status(200).send(digimon);
    })
    .catch((error) => {
        res.status(500).send(`something went wrong ${error}`);
    });
});



app.get("*", (req, res) => {
    res.status(404).send("not found");
});

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});