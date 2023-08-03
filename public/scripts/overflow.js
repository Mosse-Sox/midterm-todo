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
      textElement.css({
        "word-break": "break-all",
        "overflow-x": "auto",
      });
    } else {
      textElement.css({
        "word-break": "normal",
        "overflow-x": "visible",
      });
    }
  });
}
