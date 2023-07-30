/* eslint-disable no-undef */
const renderTodos = (container, todos) => {
  container.empty();
  const $container = $('.todo-list-container');

  for (const todo of todos) {
    const $todo = createTodoElement(todo);
    $container.prepend($todo);
  }
};

const createTodoElement = (todos) => {

  const safeText = DOMPurify.sanitize(todos.content.text);
  const $todo = `
    <li>${safeText}</li>
  `;
  return $todo;
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

module.exports = { renderTodos, createTodoElement, loadTodos };