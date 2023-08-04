/**
 * this function appends the red circle showing pending todos in the logo
 * @param {Integer} todoCount the count of all todos
 * @param {Jquery Object} upperContainer the uppermost container with the logo
 */
const howManyTodos = function (todoCount, upperContainer) {
  const $countText = `<div class="todo-count"><p>${todoCount}</p></div>`;

  upperContainer.prepend($countText);
}
