import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const location = req.body.location || '';
  if (location.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid city or country name",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: generatePrompt(location),
      temperature: 1,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(generateItinerary) {
  const givenLocation = {
  return:
`Create an itinerary in ${locationInput.value}

City: New York City
Things to do: Visit the Statue of Liberty, from there, go to the nearby italian restaurant called. Then from there, you can spend a couple hours in the park."
City: ${location}
Things to do:'
  }
};