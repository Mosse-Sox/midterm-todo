$(document).ready(function () {

  // adds event listener for when a li is starts being dragged
  $(".todo-list-container ul").on("dragstart", "li", function (event) {
    const dragItem = this;
    event.originalEvent.dataTransfer.effectAllowed = "move";
    event.originalEvent.dataTransfer.setData("text/plain", ""); // Required for Firefox to work
    setTimeout(function () {
      $(dragItem).addClass("dragging");
    }, 0);
  });

  // ensures that no default events trigger during dragging
  $(".todo-list-container ul").on("dragover", function (event) {
    event.preventDefault();
  });

  // adds event listeners on uls in .todo-list-container listening for the drop event
  $(".todo-list-container ul").on("drop", function (event) {
    event.preventDefault();
    const dropList = $(this); // The column itself is the drop target
    const dragItem = $(".dragging");

    dropDecider(event, dropList, dragItem);

    const todoId = dragItem.attr("id");
    const newCategoryString = dropList.attr("id").replace("todo-", ""); // Extract the new category from the drop list ID
    // Make an AJAX call to update the category in the database
    // newCategory updates the category
    newCategory(todoId, newCategoryString);

    dragItem.removeClass("dragging");
  });

  // once the li is no longer being dragged classes put on it on dragstart are removed
  $(".todo-list-container ul").on("dragend", "li", function (event) {
    $(this).removeClass("dragging");
    $(this).removeClass("no-scrollbar");
  });
});


/**
 * this function updates the new category of the todo based on the id passed to it
 * @param {String} todoId a string representing the id of the todo
 * @param {String} newCategoryString a string representing the new category
 */
const newCategory = function (todoId, newCategoryString) {
  let newCategory = 1;
  if (newCategoryString === "food") {
    newCategory = 3;
  } else if (newCategoryString === "books") {
    newCategory = 1;
  } else if (newCategoryString === "films") {
    newCategory = 2;
  } else if (newCategoryString === "products") {
    newCategory = 4;
  }
  updateTodoCategory(todoId, newCategory);
};

/**
 * This function uses the event to find the ul that the list should be dropped into and decides where it should be dropped
 * @param {*} event the 'drop' event
 * @param {*} dropList the ul the li was dropped on
 * @param {*} dragItem the li being dragged
 */
const dropDecider = function (event, dropList, dragItem) {
  if (dropList.children("li").length === 0) {
    // If the column is empty, simply append the dragged item to it
    dropList.append(dragItem);
  } else {
    // Otherwise, handle the drop as before (move the item within the same column or to a different column)
    const dropItemElement = event.originalEvent.target.closest("li");
    const dragItemElement = dragItem[0];

    if (dropItemElement && dragItemElement) {
      const dropIndex = [...dropList.children()].indexOf(dropItemElement);
      const dragIndex = [...dragItem.parent().children()].indexOf(
        dragItemElement
      );

      if (dragIndex < dropIndex) {
        dropItemElement.parentNode.insertBefore(
          dragItemElement,
          dropItemElement.nextSibling
        );

      } else {
        dropItemElement.parentNode.insertBefore(
          dragItemElement,
          dropItemElement
        );
      }
    }
  }
};
