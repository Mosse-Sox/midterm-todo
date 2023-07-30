// /* eslint-disable no-undef */
// Client facing scripts here

$(document).ready(function () {
  // add an event listener that listens for the submit event
  $('#create-todo-id').on('submit', function (event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/todos',
      data: form.serialize()
    }).then(function(response) {
      form[0].reset();
      // console.log(response);
      loadTodos();
    }).catch((error) => {
      console.error('Error:', error.status, error.responseText);
    });
  });

  loadTodos();
});
