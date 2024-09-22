// This function takes in the board, the combo count and the number of lines to delete.
// It returns the combo count (so score can be calculated) as well as the lines which should be deleted.

function isLineFull(board, combo, linesToDelete) {
  let count;
  let comboCount = combo;

  for (let k = 19; k > 0; k--) {
    count = 0;
    for (let j = 0; j <= 9; j++) {
      if (board[k][j] === 1) {
        count++;
      }
    }
    // If line is full
    if (count === 10) {
      linesToDelete[k] = 1;
      comboCount++;
    }
  }

  return [comboCount, linesToDelete];
}

export default isLineFull;
