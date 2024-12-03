import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/recommend-gear', async (req, res) => {
  const { gameplayData } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Based on the following gameplay data, recommend gear: ${gameplayData}`,
      max_tokens: 150,
    });
    res.json({ recommendations: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving recommendations' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});