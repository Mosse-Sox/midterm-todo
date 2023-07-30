/* eslint-disable no-undef */
// Client facing scripts here
const loadTodos = require('./todos-helper');

$(document).ready(function () {
  // add an event listener that listens for the submit event
  $('#create-todo-id').on('submit', function (event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/todos',
      data: $(this).serialize()
    }).then(function(response) {
      form[0].reset();
      // console.log(response);
      loadTodos();
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });

    const $form = $('#todo-input');
    $form.val('');
  });

  loadTodos();
});