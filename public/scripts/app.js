/* eslint-disable no-undef */
// Client facing scripts here
$(document).ready(function() {
  // add an event listener that listens for the submit event
  $('#create-todo-id').on('submit', function(event) {
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
  $('.todo-list-container').on("change", ".todo-checkbox", function(event) {
    event.preventDefault();
    let checkboxValue = $(this).prop("checked");
    const $listItem = $(this).closest('li');
    const todoId = $listItem.attr('id');

    $.ajax({
      method: 'POST',
      url: `/todos/${todoId}`,
      data: { checked: checkboxValue },
    }).then(function(response) {
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

  $('.todo-list-container').on('dragstart', 'li', function(event) {
    const dragItem = this;
    event.originalEvent.dataTransfer.effectAllowed = 'move';
    event.originalEvent.dataTransfer.setData('text/plain', ''); // Required for Firefox to work
    setTimeout(function() {
      $(dragItem).addClass('dragging');
    }, 0);
  });

  $('.todo-list-container').on('dragover', 'li', function(event) {
    event.preventDefault();
  });
  $('.todo-list-container').on('drop', 'li', function(event) {
    const dropItem = this;
    const dragItem = $('.dragging');

    if (dropItem !== dragItem[0]) {
      const dropList = $(dropItem).parent();
      const dragList = $(dragItem).parent();

      // Move the dragged item to the new position if it is in the same category
      if (dropList[0] === dragList[0]) {
        const dropIndex = [...dropList.children()].indexOf(dropItem);
        const dragIndex = [...dragList.children()].indexOf(dragItem[0]);
        if (dragIndex < dropIndex) {
          dropItem.parentNode.insertBefore(dragItem[0], dropItem.nextSibling);
        } else {
          dropItem.parentNode.insertBefore(dragItem[0], dropItem);
        }
      } else {
        // Otherwise, move the dragged item to the new category
        dropList.append(dragItem);
      }

      // Perform additional logic if needed, e.g., update the category in the database
      const todoId = dragItem.attr('id');
      const newCategory = dropList.attr('id').replace('todo-', ''); // Extract the new category from the drop list ID
      // Make an AJAX call to update the category in the database
      updateTodoCategory(todoId, newCategory);
    }

    dragItem.removeClass('dragging');
  });

  $('.todo-list-container').on('dragend', 'li', function(event) {
    $(this).removeClass('dragging');
    $(this).removeClass('no-scrollbar');
  });

  loadTodos();
});
