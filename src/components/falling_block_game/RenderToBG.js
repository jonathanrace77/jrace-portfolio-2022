function RenderToBG(board, shouldIRender) {
  let renderBoard = board;
  // Convert the Current Block to BG (2 -> 1)
  if (shouldIRender) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 20; k++) {
        if (renderBoard[k][j] === 2) {
          renderBoard[k][j] = 1;
        }
      }
    }
  }

  return [renderBoard, 1];
}

export default RenderToBG;
