// This function takes the board as an input, as well as the key being pushed (left or right)
// It searches through to find where the active block is (2).
// If this block is at the left or right of the board or another block is to the side, then it returns 0 otherwise 1.

function canBlockMoveLeftRight(board, LeftRight, proximity) {
  let isThereATwo = 0;

  // Find where the active block is
  for (var j = 0; j <= 9; j++) {
    for (var k = 19; k > 0; k--) {
      if (board[k][j] === 2) {
        isThereATwo = 1;
        // If left is pressed
        if (LeftRight === "left") {
          // If the left of the block is at the furthest left then return false || If a collision is detected then return false
          
            if (j === 0 || board[k][j - 1] === 1) {
              return 0;
            }
          
        }

        // If right is pressed
        if (LeftRight === "right") {
          // If the right of the block is at the furthest right then return false || If a collision is detected then return false
          for (let i = 1; i <= proximity; i++) {
            if (j + i >= 10 || board[k][j + i] === 1) {
              return 0;
            }
          }
        }
      }
    }
  }
  if (isThereATwo === 1) return 1;
}

export default canBlockMoveLeftRight;
