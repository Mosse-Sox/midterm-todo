const request = require('request');

require('dotenv').config({ path: '../.env' });

function openAIChatCompletion(prompt) {
  const apiKey = process.env.CHATGPT_API_KEY; // Replace this with your actual OpenAI API key

  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const options = {
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // You can use other models if needed
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  };

  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        if (response.statusCode === 200) {
          resolve(JSON.parse(body).choices[0].message);
        } else {
          reject(new Error(`Request failed with status ${response.statusCode}`));
        }
      }
    });
  });
}

module.exports = openAIChatCompletion;


