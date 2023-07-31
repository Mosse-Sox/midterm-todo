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

  // add an event listener for the checkbox when check
  $('.todo-list-container').on("change", ".todo-checkbox", function (event) {
    event.preventDefault();
    let checkboxValue = $(this).prop("checked");
    const $listItem = $(this).closest('li');
    const todoId = $listItem.attr('id');

    // if (!checkboxValue) {
    //   checkboxValue = false;
    // }
    $.ajax({
      method: 'POST',
      url: `/todos/${todoId}`,
      data: { checked: checkboxValue },
    }).then(function (response) {
      loadTodos();
    }).catch((error) => {
      console.error('Error', error.status, error.responseText);
    });

  });

  // add an event listener for the delete button
  $('.todo-list-container').on('click', '.deleteb', function(event) {
    event.preventDefault();

    const $listItem = $(this).closest('li');
    const todoId = $listItem.attr('id');

    deleteTodo(todoId);
  });

  loadTodos();
});
