let TileMapEnum = {};

TileMapEnum["playerNorth"] = 9000;
TileMapEnum["playerNorthMove"] = 9001;
TileMapEnum["playerEast"] = 9010;
TileMapEnum["playerEastMove"] = 9011;
TileMapEnum["playerSouth"] = 9020;
TileMapEnum["playerSouthMove"] = 9021;
TileMapEnum["playerWest"] = 9030;
TileMapEnum["playerWestMove"] = 9031;

// Grass Tiles
for (let i = 0; i < 14; i++) {
  TileMapEnum["gra" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "10"));
}

// Sand Tiles
for (let i = 0; i < 17; i++) {
  TileMapEnum["san" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "20"));
}

// Water Tiles
for (let i = 0; i < 24; i++) {
  TileMapEnum["wat" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "30"));
}

// Cliff Tiles
for (let i = 0; i < 3; i++) {
  TileMapEnum["cli" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "40"));
}

// Bridge Tiles
for (let i = 0; i < 13; i++) {
  TileMapEnum["bri" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "50"));
}

// Bridge Tiles
for (let i = 0; i < 42; i++) {
  TileMapEnum["bui" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "60"));
}

// Skills Tiles
for (let i = 0; i < 28; i++) {
  TileMapEnum["ski" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "70"));
}

// Portfolio Tiles
for (let i = 0; i < 30; i++) {
  TileMapEnum["por" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "80"));
}

// Home Tiles
for (let i = 0; i < 30; i++) {
  TileMapEnum["hom" + String(i).padStart(3, "00")] = parseInt(String(i).padStart(3, "90"));
}

export default TileMapEnum;
