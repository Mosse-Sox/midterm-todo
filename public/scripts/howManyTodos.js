const howManyTodos = function (todoCount, upperContainer) {
  const $countText = `<div class="todo-count"><p>${todoCount}</p></div>`;

  upperContainer.prepend($countText);
}
