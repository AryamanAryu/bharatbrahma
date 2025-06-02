import Itinerary from '../models/Itinerary.js';
import axios from 'axios';

export const createItinerary = async (req, res) => {
  const { name, interests, budget, duration } = req.body;

  const prompt = `Create a personalized itinerary for ${name} for ${duration} days in India under a budget of ₹${budget}. Their interests are: ${interests.join(", ")}.`;

  try {
    const apiRes = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const responseText = apiRes.data.choices[0].message.content;

    const newItinerary = await Itinerary.create({
      name,
      interests,
      budget,
      duration,
      response: responseText,
    });

    res.status(201).json(newItinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate itinerary' });
  }
};
