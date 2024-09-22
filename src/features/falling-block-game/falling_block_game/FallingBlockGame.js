import React from "react";
import DrawBlock from "./DrawBlock.js";
import CalculateBlockWidth from "./CalculateBlockWidth.js";
import canBlockMoveDown from "./CanBlockMoveDown.js";
import canBlockMoveLeftRight from "./CanBlockMoveLeftRight.js";
import isGameOver from "./IsGameOver.js";
import RenderToBG from "./RenderToBG.js";
import shapeGen from "./ShapeGen.js";
import isLineFull from "./IsLineFull.js";

class FallingBlockGame extends React.Component {
  constructor() {
    super();

    let createGrid = (rows, columns) => {
      return Array(rows)
        .fill()
        .map(() =>
          Array(columns)
            .fill(0)
        )
    }

    this.boardWidth = 10;
    this.boardHeight = 20;

    this.state = {
      board: createGrid(this.boardHeight, this.boardWidth),
      dropSpeed: 450,
      blockX: 3,
      blockY: 0,
      blockType: shapeGen(),
      blockRot: 0,
      blockMaxWidth: 0,
      canMoveDown: 1,
      isDownPressed: 0,
      isRenderComplete: 1,
      linesToDelete: createGrid(this.boardHeight, 1),
      comboCount: 0,
      score: 0,
    };

    this.boardCreator = this.boardCreator.bind(this);
    this.fallLogic = this.fallLogic.bind(this);
    this.handleArrowKey = this.handleArrowKey.bind(this);
    this.fallTimer = this.fallTimer.bind(this);
    this.arrowBlockDown = this.arrowBlockDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);    
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  // Builds initial board, includes CSS rules
  boardCreator() {
    // Create a board
    let boardArray = [];

    for (let i = 0; i < this.boardHeight; i++) {
      boardArray[i] = this.state.board[i].map((value, index) => {
        return (
          <div
            className={
              value === 1
                ? "block-filled"
                : value === 2
                  ? "block-active"
                  : "block-empty"
            }
            key={index}
          ></div>
        );
      });
    }
    return boardArray;
  }

  // Handles Arrow Key Press Down
  handleArrowKey(e) {
    e.preventDefault();
    this.setState({ iskeyFuncTriggered: 0 });

    let arrowButton;

    if (e.target.closest('.overlay-button') !== null)
      arrowButton = e.target.closest('.overlay-button').getAttribute("data-overlay-button");

    if (e.key === "ArrowRight" || arrowButton === "ArrowRight") {
      this.setState((prevState) => {
        let blockX = prevState.blockX;
        if (canBlockMoveLeftRight(this.state.board, "right", 1)) {
          blockX++;
          return { blockX: blockX };
        }
      });
    }

    if (e.key === "ArrowLeft" || arrowButton === "ArrowLeft") {
      this.setState((prevState) => {
        let blockX = prevState.blockX;
        if (canBlockMoveLeftRight(this.state.board, "left", 1)) {
          blockX--;
          return { blockX: blockX };
        }
      });
    }

    if (e.key === "ArrowUp" || arrowButton === "ArrowUp") {
      let newRot = this.state.blockRot;
      if (newRot < 3) {
        newRot++;
      } else {
        newRot = 0;
      }
      let futureBlockWidth = CalculateBlockWidth(this.state.blockType, newRot);

      // Check that the block can rotate without clipping things
      if (
        canBlockMoveLeftRight(this.state.board, "left", 1) &&
        canBlockMoveLeftRight(
          this.state.board,
          "right",
          CalculateBlockWidth(this.state.blockType, newRot) - 1
        ) &&
        canBlockMoveDown(this.state.board, futureBlockWidth)
      ) {
        this.setState((prevState) => {
          let newBlockWidth = CalculateBlockWidth(prevState.blockType, newRot);
          return { blockRot: newRot, cBlockWidth: newBlockWidth };
        });
      }
    }

    if (e.key === "ArrowDown" || arrowButton === "ArrowDown") {
      this.setState({
        isDownPressed: 1,
      });
    }
  }

  // Handles Arrow Key Press Up
  handleArrowKeyUp(e) {
    let arrowButton;

    if (e.target.closest('.overlay-button') !== null)
      arrowButton = e.target.closest('.overlay-button').getAttribute("data-overlay-button");

    this.setState({ iskeyFuncTriggered: 0 });
    if (e.key === "ArrowDown" || arrowButton === "ArrowDown") {
      this.setState({
        isDownPressed: 0,
      });
    }
  }

  // Handles the fall sequence - refreshes every 1ms
  fallLogic() {
    // Loop for blocks to drop
    this.fallLogicInterval = setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var blockType = prevState.blockType;
          var blockRot = prevState.blockRot;
          var blockY = prevState.blockY;
          var blockX = prevState.blockX;
          var isRenderComplete = prevState.isRenderComplete;
          var canMoveDown = canBlockMoveDown(board);
          // Clear the board of current block if can move, then calls drawBlock()
          if (canMoveDown) {
            for (let j = 0; j < 10; j++) {
              for (let k = 0; k < 20; k++) {
                if (board[k][j] === 2) {
                  board[k][j] = 0;
                }
              }
            }
            // Blocks to drop down function
            DrawBlock(
              board,
              blockX,
              blockY,
              blockType,
              blockRot,
            );
          }

          // Writes canMoveDown to state
          this.setState({
            canMoveDown: canMoveDown,
          });

          return {
            board: board,
            //blockX: blockX,
            isRenderComplete: isRenderComplete,
          };
        });
      }.bind(this),
      1
    );
  }

  // Handles down arrow movement - refreshes every 50ms
  arrowBlockDown() {
    this.arrowBlockDownInterval = setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var blockY = prevState.blockY;
          var isDownPressed = prevState.isDownPressed;
          let canMoveDown = canBlockMoveDown(board);

          if (canMoveDown) {
            var additionalCount = 0;
            if (isDownPressed) {
              additionalCount++;
            }
          }

          return {
            board: board,
            blockY: blockY + additionalCount,
            cBlockWidth: CalculateBlockWidth(
              this.state.blockType,
              this.state.blockRot
            ),
          };
        });
      }.bind(this),
      50
    );
  }

  // Handles timer of block dropping - refreshes according to blockY
  fallTimer() {
    this.fallTimerInterval = setInterval(
      function () {
        this.setState((prevState) => {
          var board = prevState.board;
          var canMoveDown = prevState.canMoveDown;
          var newTimerCount = prevState.blockY;
          var blockType = prevState.blockType;
          var cBlockWidth = prevState.cBlockWidth;
          var blockRot = prevState.blockRot;
          var comboCount = prevState.comboCount;
          var linesToDelete = prevState.linesToDelete;
          var score = prevState.score;
          var blockX = prevState.blockX;

          // Renders to BG and updates state as to whether the rendering is complete
          if (!canMoveDown) {
            let returnFromRender = RenderToBG(board, 1);
            board = returnFromRender[0];
          }

          // Update the timer if able to move down
          if (canMoveDown && newTimerCount < 20) {
            if (!prevState.isDownPressed) {
              newTimerCount++;
            }
          } else {
            newTimerCount = 0;
            blockType = shapeGen();
            cBlockWidth = CalculateBlockWidth(blockType, 0);
            blockRot = 0;
            blockX = 3;

            // Check for a complete line
            let checkLineComplete = isLineFull(
              board,
              comboCount,
              linesToDelete
            );

            comboCount = checkLineComplete[0];
            linesToDelete = checkLineComplete[1];

            if (comboCount === 1) {
              comboCount = 40;
            }
            if (comboCount === 2) {
              comboCount = 100;
            }
            if (comboCount === 3) {
              comboCount = 300;
            }
            if (comboCount === 4) {
              comboCount = 1200;
            }
            score += comboCount;

            comboCount = 0;
          }

          return {
            blockY: newTimerCount,
            canMoveDown: canMoveDown,
            board: board,
            comboCount: comboCount,
            blockType: blockType,
            cBlockWidth: cBlockWidth,
            blockRot: blockRot,
            blockX: blockX,
            linesToDelete: linesToDelete,
            score: score,
          };
        });
        // Handles clearing of lines
        this.setState((prevState) => {
          var board = prevState.board;
          var blockType = prevState.blockType;
          var linesToDelete = prevState.linesToDelete;
          var linesToDrop = 0;

          // Clear Full Lines
          for (let m = 19; m > 0; m--) {
            if (linesToDelete[m] === 1) {
              for (let n = 0; n <= 9; n++) {
                board[m][n] = 0;
              }
              linesToDelete[m] = 0;
              linesToDrop++;
              m = 19;
            }
          }

          // Drop the blocks if there are any clear lines
          while (linesToDrop > 0) {
            for (let k = 19; k > 0; k--) {
              let rowCount = 0;
              for (let j = 0; j <= 9; j++) {
                if (board[k][j] === 0) {
                  rowCount++;
                }
              }
              // If line is empty move everything above it down 1
              if (rowCount === 10) {
                for (let l = k; l > 0; l--) {
                  for (let n = 0; n <= 9; n++) {
                    board[l][n] = board[l - 1][n];
                  }
                }
                linesToDrop--;
                k = 20;
              }
              if (linesToDrop < 1) break;
            }
          }

          // Game Over Sequence
          if (isGameOver(board, blockType)) {
            this.setState({ score: 0, blockType: shapeGen() });
            for (let j = 0; j < 10; j++) {
              for (let k = 0; k < 20; k++) {
                board[k][j] = 0;
              }
            }
          }

          return {
            board: board,
            blockType: blockType,
            linesToDelete: linesToDelete,
          };
        });
      }.bind(this),
      this.state.dropSpeed
    );
  }

  componentDidMount() {
    this.fallTimer();
    this.fallLogic();
    this.arrowBlockDown();
    // Event listeners
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchend", this.handleTouchEnd);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  handleKeyDown(e) {
    if (!this.state.iskeyFuncTriggered) {
      this.handleArrowKey(e);
    }
  }

  handleKeyUp(e) {
    if (!this.state.iskeyFuncTriggered) {
      this.handleArrowKeyUp(e);
    }
  }

  handleTouchStart(e) {
    if (e.target.closest('.overlay-button') === null) return;
    e.preventDefault();

    if (!this.state.iskeyFuncTriggered) {
      this.handleArrowKey(e);
    }
  }

  handleTouchEnd(e) {
    if (e.target.closest('.overlay-button') === null) return;
    e.preventDefault();

    if (!this.state.iskeyFuncTriggered) {
      this.handleArrowKeyUp(e);
    }
  }

  handleMouseDown(e) {
    if (e.target.closest('.overlay-button') === null) return;
    e.preventDefault();

    if (!this.state.iskeyFuncTriggered) {
      this.handleArrowKey(e);
    }
  }

  handleMouseUp(e) {
    if (e.target.closest('.overlay-button') === null) return;
    e.preventDefault();

    if (!this.state.iskeyFuncTriggered) {
      this.handleArrowKeyUp(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.fallTimerInterval);
    clearInterval(this.fallLogicInterval);
    clearInterval(this.arrowBlockDownInterval);

    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    return (
      <div className="BoardContainer">
        <div className="Board">{this.boardCreator()}</div>
        <div className="ScoreBoardContainer">
          <div className="ScoreBoardTitle"><h4>SCORE</h4></div>
          <div className="ScoreBoard">{this.state.score}</div>
        </div>
      </div>
    );
  }
}

export default FallingBlockGame;
