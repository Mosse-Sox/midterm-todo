/* eslint-disable func-style */
const request = require('request');
// require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: '.env' });

/**
 * This function returns a promise that will resolve based on the apis response
 * @param {String} prompt this is a string in plain english that holds the question being asked of the api
 * @returns a promise
 */
function openAIChatCompletion(prompt) {
  const apiKey = process.env.CHATGPT_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  // options for openai
  const options = {
    url: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
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

  // Return a Promise that will be resolved or rejected based on the API response
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


