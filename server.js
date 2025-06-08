// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post('/ask', async (req, res) => {
  const userPrompt = req.body.prompt;
  const SYSTEM_INSTRUCTION = `...same as in your frontend...`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: { text: SYSTEM_INSTRUCTION } },
        contents: [{ parts: [{ text: userPrompt }] }]
      }),
    });

    const data = await response.json();
    const text = data.candidates[0]?.content?.parts[0]?.text || 'No answer received';
    res.json({ text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong on the server' });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
