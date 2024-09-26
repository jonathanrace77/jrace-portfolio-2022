let TileMap: Map<string, number> = new Map<string, number>();

TileMap.set("playerNorth", 9000);
TileMap.set("playerNorthMove", 9001);
TileMap.set("playerEast", 9010);
TileMap.set("playerEastMove", 9011);
TileMap.set("playerSouth", 9020);
TileMap.set("playerSouthMove", 9021);
TileMap.set("playerWest", 9030);
TileMap.set("playerWestMove", 9031);

// Grass Tiles
for (let i = 0; i < 14; i++) {
  TileMap.set("gra" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "10")));
}

// Sand Tiles
for (let i = 0; i < 17; i++) {
  TileMap.set("san" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "20")));
}

// Water Tiles
for (let i = 0; i < 24; i++) {
  TileMap.set("wat" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "30")));
}

// Cliff Tiles
for (let i = 0; i < 3; i++) {
  TileMap.set("cli" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "40")));
}

// Bridge Tiles
for (let i = 0; i < 13; i++) {
  TileMap.set("bri" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "50")));
}

// Bridge Tiles
for (let i = 0; i < 42; i++) {
  TileMap.set("bui" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "60")));
}

// Skills Tiles
for (let i = 0; i < 28; i++) {
  TileMap.set("ski" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "70")));
}

// Portfolio Tiles
for (let i = 0; i < 30; i++) {
  TileMap.set("por" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "80")));
}

// Home Tiles
for (let i = 0; i < 30; i++) {
  TileMap.set("hom" + String(i).padStart(3, "00"), parseInt(String(i).padStart(3, "90")));
}

export default TileMap;
