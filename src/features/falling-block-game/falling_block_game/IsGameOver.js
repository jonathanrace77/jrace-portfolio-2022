// This function takes in the board as well as block type.
// If the top of the board is filled then it returns 1 otherwise 0.

function isGameOver(board, blockType) {
  let blockHeight = 1;
  if (
    blockType === "zee" ||
    blockType === "ess" ||
    blockType === "tee" ||
    blockType === "square"
  )
    blockHeight = 2;
  if (blockType === "jay" || blockType === "ell") blockHeight = 3;

  if (board[blockHeight][3] === 1 || board[blockHeight][4] === 1) return 1;

  return 0;
}

export default isGameOver;
