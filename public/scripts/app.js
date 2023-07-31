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

  $('.todo-checkbox').click(function () {
    const checkboxValue = $(this).prop("checked");
    const todoId = $(this).data("todo-checkbox-id");

    $.ajax({
      method: 'PATCH',
      url: `/todos/${todoId}`,
      data: { checked: checkboxValue },
    }).then(function (response) {
      loadTodos();
    }).catch((error) => {
      console.error('Error', error.status, error.responseText);
    });
  });

  loadTodos();
});
