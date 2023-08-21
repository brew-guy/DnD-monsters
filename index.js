import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.dnd5eapi.co";

// Idea:
// D&D5e free API usage to look up monster stats and images
// https://www.dnd5eapi.co/docs/#get-/api

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let monster_count, monsters, stats;

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "/api/monsters");
        monster_count = response.data.count;
        monsters = response.data.results;
        res.render("index.ejs", {count: monster_count, monsters: monsters, stats: stats});
    } catch (error) {
        console.error(error.response.data);
        res.status(500);
    }
});

app.post("/monster", async (req, res) => {
    try {
        const response = await axios.get(API_URL + req.body.url);
        stats = response.data;
        res.redirect("/");
    } catch (error) {
        console.error(error.response.data);
        res.status(500);
    }
});

app.listen(port, () => {
    console.log("Server running and listening on port " + port);
});
