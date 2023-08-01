/**
 * This function checks if there is any overflow horizonitally to ensure that long words
 * do not affect the pages display.
 */
function checkHorizontalOverflow() {
  $(".todo-text-html").each(function () {
    const textElement = $(this);
    const hasHorizontalOverflow =
      textElement[0].scrollWidth > textElement[0].clientWidth;

    if (hasHorizontalOverflow) {
      textElement.css("word-break", "break-all");
    } else {
      textElement.css("word-break", "normal"); // Reset to default if no overflow
    }
  });
}
