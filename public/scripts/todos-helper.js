/* eslint-disable no-undef */

/**
 * This function makes a post request to delete a todo by taking its id and finding it in the database
 * @param {String} todo_id this is a string representing the todos id
 */
const deleteTodo = function (todo_id) {
  $.ajax({
    method: "POST",
    url: `/todos/${todo_id}/delete`,
  })
    .then((result) => {
      console.log(result);
      loadTodos();
    })
    .catch((error) => {
      console.error("Error:", error.status, error.responseText);
    });
};

/**
 * This function makes a post request to update a todos category_id column
 * @param {String} todo_id a string representing a todos id
 * @param {Integer} newCategory an int (1, 2, 3, 4) representing the new category
 */
const updateTodoCategory = function (todo_id, newCategory) {
  $.ajax({
    method: "POST",
    url: `/todos/${todo_id}/update_category`,
    data: { category: newCategory },
  })
    .then((result) => {
      loadTodos();
    })
    .catch((error) => {
      console.error("Error:", error.status, error.responseText);
    });
};

/**
 * this function takes in the name of a todo and makes a post request to add it to the db
 * @param {*} todoName this is the name of the todo the user passed in
 */
const addTodo = function (todoName) {
  $.ajax({
    method: "POST",
    url: "/todos",
    data: todoName,
  })
    .then(function (response) {
      loadTodos();
    })
    .catch((error) => {
      console.error("Error:", error.status, error.responseText);
    });
};

/**
 * This function makes a post request to update a todos completed_at column
 * @param {String} todoId this is the string representing the todos id
 * @param {String} checkboxValue this is a string representing if a checkbox is checked or not ('true', 'false')
 */
const updateCompletedAt = function (todoId, checkboxValue) {
  $.ajax({
    method: 'POST',
    url: `/todos/${todoId}`,
    data: { checked: checkboxValue },
  }).then(function(response) {
    loadTodos();
  }).catch((error) => {
    console.error('Error', error.status, error.responseText);
  });
}
