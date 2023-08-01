/* eslint-disable no-undef */
// Client facing scripts here
$(document).ready(function () {
  // adds a listener that listens for the submit event
  $("#create-todo-id").on("submit", function (event) {
    event.preventDefault();
    const todoName = $(this).serialize();

    addTodo(todoName);

    const $form = $("#todo-input");
    $form.val("");
  });

  // adds event listeners for the checkboxs when checked
  $(".todo-list-container").on("change", ".todo-checkbox", function (event) {
    event.preventDefault();
    let checkboxValue = $(this).prop("checked");
    const $listItem = $(this).closest("li");
    const todoId = $listItem.attr("id");

    updateCompletedAt(todoId, checkboxValue);
  });

  $("#list").on("change", ".todo-checkbox", function (event) {
    event.preventDefault();
    let checkboxValue = $(this).prop("checked");
    const $listItem = $(this).closest("li");
    const todoId = $listItem.attr("id");

    updateCompletedAt(todoId, checkboxValue);
  });

  // adds event listeners for the delete buttons
  $(".todo-list-container").on("click", ".deleteb", function (event) {
    event.preventDefault();

    const $listItem = $(this).closest("li");
    const todoId = $listItem.attr("id");

    deleteTodo(todoId);
  });

  $("#list").on("click", ".deleteb", function (event) {
    event.preventDefault();

    const $listItem = $(this).closest("li");
    const todoId = $listItem.attr("id");

    deleteTodo(todoId);
  });

  // first load
  loadTodos();
});
