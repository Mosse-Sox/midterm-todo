/* eslint-disable no-undef */

/**
 * This function takes in a todo from the database and turns it into an html element
 * @param {Object} todo the todo returned from the database
 * @returns an html representation of the todo passed to it
 */
const createTodoElement = (todo) => {
  const safeText = DOMPurify.sanitize(todo.name);
  const $todo = `
    <li draggable="true" id=${todo.id} class="overflow-container">
    <input type="checkbox" class="todo-checkbox" ${
      todo.completed_at ? "checked" : ""
    }>
    <p class="todo-text-html">${safeText}</p>
    <button class="deleteb" type="button">X</button>
    </li>`;

  return $todo;
};

/**
 * This function takes in an array of todos and decides where to render them
 * @param {*} todos an array of objects representing todos from the database
 */
const renderTodos = (todos) => {
  const products = $("#todo-products");
  const films = $("#todo-films");
  const books = $("#todo-books");
  const food = $("#todo-food");
  const completed = $("#completed-todos");
  const progress = $("#progress-tracker");
  const upperContainer = $("todo-upper-container");

  products.empty();
  films.empty();
  books.empty();
  food.empty();
  completed.empty();
  progress.empty();

  let completedTodos = 0;
  let todoCount = todos.length;

  for (const todo of todos) {

    const $todo = createTodoElement(todo);

    if (todo.completed_at) {
      todoCount--;
      completedTodos++;
      completed.prepend($todo);
    } else if (todo.category_id === 1) {
      books.prepend($todo);
    } else if (todo.category_id === 2) {
      films.prepend($todo);
    } else if (todo.category_id === 3) {
      food.prepend($todo);
    } else if (todo.category_id === 4) {
      products.prepend($todo);
    }
  }

  howManyTodos(todoCount, progress);
  progressHtmlMaker(completedTodos, progress);
  checkHorizontalOverflow();
};

/**
 * this function is called to load todos onto the page
 */
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
