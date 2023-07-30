/* eslint-disable no-undef */
const createTodoElement = (todo) => {
  const safeText = DOMPurify.sanitize(todo.name);
  const $todo = `
    <li>${safeText}</li>
  `;
  return $todo;
};

const renderTodos = (todos) => {

  const products = $('#todo-products');
  const films = $('#todo-films');
  const books = $('#todo-books');
  const food = $('#todo-food');

  products.empty();
  films.empty();
  books.empty();
  food.empty();

  for (const todo of todos) {
    const $todo = createTodoElement(todo);
    products.prepend($todo);
  }
};

const loadTodos = function () {
  $.ajax({
    method: 'GET',
    url: '/todos',
    datatype: 'json'
  }).then((response) => {
    renderTodos(response);
  }).catch((error) => {
    console.error('Error:', error.status, error.responseText);
  });
};

