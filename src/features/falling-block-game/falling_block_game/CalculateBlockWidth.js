// This function takes in the block type and block rotation.
// It then returns the width of the block.

function CalculateBlockWidth(cBlockType, cBlockRot) {
  if (cBlockType === "line" && (cBlockRot === 0 || cBlockRot === 2)) {
    return 4;
  } else if (cBlockType === "line" && (cBlockRot === 1 || cBlockRot === 3)) {
    return 1;
  } else if (cBlockType === "tee" && (cBlockRot === 0 || cBlockRot === 2)) {
    return 3;
  } else if (cBlockType === "tee" && (cBlockRot === 1 || cBlockRot === 3)) {
    return 2;
  } else if (
    cBlockType === "square" &&
    (cBlockRot === 0 || cBlockRot === 1 || cBlockRot === 2 || cBlockRot === 3)
  ) {
    return 2;
  } else if (cBlockType === "ess" && (cBlockRot === 0 || cBlockRot === 2)) {
    return 3;
  } else if (cBlockType === "ess" && (cBlockRot === 1 || cBlockRot === 3)) {
    return 2;
  } else if (cBlockType === "zee" && (cBlockRot === 0 || cBlockRot === 2)) {
    return 3;
  } else if (cBlockType === "zee" && (cBlockRot === 1 || cBlockRot === 3)) {
    return 2;
  } else if (cBlockType === "jay" && (cBlockRot === 0 || cBlockRot === 2)) {
    return 2;
  } else if (cBlockType === "jay" && (cBlockRot === 1 || cBlockRot === 3)) {
    return 3;
  } else if (cBlockType === "ell" && (cBlockRot === 0 || cBlockRot === 2)) {
    return 2;
  } else if (cBlockType === "ell" && (cBlockRot === 1 || cBlockRot === 3)) {
    return 3;
  }
}

export default CalculateBlockWidth;
