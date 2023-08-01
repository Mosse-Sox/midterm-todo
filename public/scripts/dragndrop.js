$(document).ready(function () {
  $(".todo-list-container ul").on("dragstart", "li", function (event) {
    const dragItem = this;
    event.originalEvent.dataTransfer.effectAllowed = "move";
    event.originalEvent.dataTransfer.setData("text/plain", ""); // Required for Firefox to work
    setTimeout(function () {
      $(dragItem).addClass("dragging");
    }, 0);
  });

  $(".todo-list-container ul").on("dragover", function (event) {
    event.preventDefault();
  });

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

  $(".todo-list-container ul").on("dragend", "li", function (event) {
    $(this).removeClass("dragging");
    $(this).removeClass("no-scrollbar");
  });
});

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
