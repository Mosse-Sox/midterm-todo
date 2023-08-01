/* eslint-disable indent */
const openAIChatCompletion = require('./openai');

/**
 * This function returns a promise that when resolved will make a request to an api using a todos name
 * @param {String} todoName name of the todo to be categorized
 * @returns a promise
 */
const categorize = function (todoName) {
  const prompt = `In one word, all lowercase, no periods, is ${todoName} a book, film, food or product? If you arent sure just say book or film only please.`
  let category = null;
  return openAIChatCompletion(prompt)
  .then((response) => {
    category = 1;
    if (response.content === 'book') {
      category = 1;
    } if (response.content === 'film') {
      category = 2;
    } if (response.content === 'food') {
      category = 3;
    } if (response.content === 'product') {
      category = 4;
    }
    return category;
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

};


module.exports = categorize;
