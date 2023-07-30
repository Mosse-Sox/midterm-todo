/* eslint-disable no-undef */
// Client facing scripts here

$(document).ready(function () {
  // add an event listener that listens for the submit event
  $('#create-todo-id').on('submit', function (event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/todos',
      data: $(this).serialize()
    }).then(function(response) {
      loadTodos();
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });

    const $form = $('#todo-input');
    $form.val('');
  });

  loadTodos();
});
