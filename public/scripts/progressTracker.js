const progressHtmlMaker = function (completedTodos, progress) {
  const $progressText = `<p class="progress-text">Good Work!<p>
  <h2>✧<i class="fa-solid fa-star"></i>✧</h2>
  <p class="progress-text">You have completed ${completedTodos} todos!<p>`;

  const $progressCount = `<div class="star"><i class="fa-solid fa-star"><p>${completedTodos}</p></i></div>`

  progress.append($progressText);
  progress.append($progressCount);
}
