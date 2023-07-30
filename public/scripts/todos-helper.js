/* eslint-disable no-undef */
const createTodoElement = (todo) => {
  const safeText = DOMPurify.sanitize(todo);
  const $todo = `
    <li>${safeText}</li>
  `;
  return $todo;
};

const renderTodos = (container, todos) => {
  container.empty();

  for (const todo of todos) {
    console.log(todo.name);
    const $todo = createTodoElement(todo.name);
    container.prepend($todo);
  }
};

const loadTodos = function () {
  $.ajax({
    method: 'GET',
    url: '/todos',
    datatype: 'json'
  }).then((response) => {
    const $container = $('#todo-products');
    renderTodos($container, response);
  }).catch((error) => {
    console.error('Error:', error.status, error.responseText);
  });
};

