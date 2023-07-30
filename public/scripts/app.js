/* eslint-disable no-undef */
// Client facing scripts here
const loadTodos = require('./todos-helper');

$(document).ready(function () {
  // add an event listener that listens for the submit event
  $('#create-todo-id').on('submit', function (event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/',
      data: $(this).serialize(),
      datatype: 'json',
    }).then((response) => {
      $(this)[0].reset();
      console.log(response);
      loadTodos();
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });
  });

  loadTodos();
});