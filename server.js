import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const BALLDONTLIE_API_KEY = "Bearer 21b84a94-bd02-40ba-a86e-868644ad1749";
const BASE_URL = "https://api.balldontlie.io/v1";

// Proxy universal
app.get("/api/bdl/*", async (req, res) => {
  try {
    const endpoint = req.params[0];
    const fullUrl = `${BASE_URL}/${endpoint}?${new URLSearchParams(req.query)}`;

    const response = await fetch(fullUrl, {
      headers: {
        Authorization: BALLDONTLIE_API_KEY
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Proxy error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("BallDontLie Proxy running on port " + PORT);
});
