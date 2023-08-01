/* eslint-disable no-undef */
const createTodoElement = (todo) => {
  const safeText = DOMPurify.sanitize(todo.name);
  const $todo = `
    <li draggable="true" id=${todo.id}>
    <input type="checkbox" class="todo-checkbox" ${todo.completed_at ? 'checked' : ''}>
    <p class="todo-text-html">${safeText}</p>
    <button class="deleteb" type="button">X</button>
    </li>`;

  return $todo;
};

const renderTodos = (todos) => {
  const products = $("#todo-products");
  const films = $("#todo-films");
  const books = $("#todo-books");
  const food = $("#todo-food");

  products.empty();
  films.empty();
  books.empty();
  food.empty();

  for (const todo of todos) {
    const $todo = createTodoElement(todo);

    if (todo.category_id === 1) {
      books.prepend($todo);
    } else if (todo.category_id === 2) {
      films.prepend($todo);
    } else if (todo.category_id === 3) {
      food.prepend($todo);
    } else if (todo.category_id === 4) {
      products.prepend($todo);
    }
  }
};

const loadTodos = function () {
  $.ajax({
    method: "GET",
    url: "/todos",
    datatype: "json",
  })
    .then((response) => {
      renderTodos(response);
    })
    .catch((error) => {
      console.error("Error:", error.status, error.responseText);
    });
};

const deleteTodo = function (todo_id) {
  $.ajax({
    method: "POST",
    url: `/todos/${todo_id}/delete`
  })
    .then((result) => {
      console.log(result);
      loadTodos();
    })
    .catch((error) => {
      console.error("Error:", error.status, error.responseText);
    });
};


