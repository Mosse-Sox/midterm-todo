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

  $('.todo-list-container ul').on('dragstart', 'li', function(event) {
    const dragItem = this;
    event.originalEvent.dataTransfer.effectAllowed = 'move';
    event.originalEvent.dataTransfer.setData('text/plain', ''); // Required for Firefox to work
    setTimeout(function() {
      $(dragItem).addClass('dragging');
    }, 0);
  });
  
  $('.todo-list-container ul').on('dragover', function(event) {
    event.preventDefault();
  });
  
  $('.todo-list-container ul').on('drop', function(event) {
    event.preventDefault();
    const dropList = $(this); // The column itself is the drop target
    const dragItem = $('.dragging');
  
    if (dropList.children('li').length === 0) {
      // If the column is empty, simply append the dragged item to it
      dropList.append(dragItem);
    } else {
      // Otherwise, handle the drop as before (move the item within the same column or to a different column)
      const dropItemElement = event.originalEvent.target.closest('li');
      const dragItemElement = dragItem[0];
  
      if (dropItemElement && dragItemElement) {
        const dropIndex = [...dropList.children()].indexOf(dropItemElement);
        const dragIndex = [...dragItem.parent().children()].indexOf(dragItemElement);
        if (dragIndex < dropIndex) {
          dropItemElement.parentNode.insertBefore(dragItemElement, dropItemElement.nextSibling);
        } else {
          dropItemElement.parentNode.insertBefore(dragItemElement, dropItemElement);
        }
      }
    }
  
    dragItem.removeClass('dragging');
  });
  
  $('.todo-list-container ul').on('dragend', 'li', function(event) {
    $(this).removeClass('dragging');
    $(this).removeClass('no-scrollbar');
  });
  

  loadTodos();
});
