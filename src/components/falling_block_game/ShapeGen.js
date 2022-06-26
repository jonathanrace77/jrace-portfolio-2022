// This function returns a shape (string) which is generated randomly

function shapeGen() {
  let shapeArray = ['line', 'ess', 'zee', 'square', 'tee', 'jay', 'ell'];

  return shapeArray[Math.floor(Math.random() * 7)];
  
}

export default shapeGen;
