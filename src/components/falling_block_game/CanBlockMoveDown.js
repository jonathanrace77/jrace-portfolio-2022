// This function takes the board as an input.
// It searches through to find the bottom of the block (2).
// If this block is at the bottom of the board or another block is beneath, then it returns 0 otherwise 1.

function canBlockMoveDown(board, proximity) {

  if (proximity == null) {
    proximity = 1;
  }
  // Find where the active block is
  for (let j = 0; j <= 9; j++) {
    for (let k = 19; k > 0; k--) {
      if (board[k][j] === 2) {
        // If the bottom of the block is at the bottom then return false || If a collision is detected then return false
        if (k + proximity >= 20 || board[k + proximity][j] === 1) {
          return 0;
        }
        break;
      }
    }
  }

  return 1;
}

export default canBlockMoveDown;
