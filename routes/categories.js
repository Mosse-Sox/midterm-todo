const openAIChatCompletion = require('./openai');


const categorize = function (todoName) {
  const prompt = `In one word, all lowercase, no periods, is ${todoName} a book, film, food or product?`
  let category = null;
  return openAIChatCompletion(prompt)
  .then((response) => {
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
