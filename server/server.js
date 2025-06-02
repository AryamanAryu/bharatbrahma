import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(config);

app.post("/api/generate", async (req, res) => {
  const { name, interests, days } = req.body;

  try {
    const prompt = `Create a detailed ${days}-day travel itinerary in India for a person named ${name} who is interested in ${interests}. Mention specific cities, attractions, and cultural highlights.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const itinerary = response.data.choices[0].message.content;
    res.json({ itinerary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
