import collisionLevel from "../enums/CollisionLevel.enum";
import TileMap from "../maps/TileMap";

let tileCollisionLevels = {};

// Grass Collision
for (let i = 0; i < 14; i++) {
  tileCollisionLevels[TileMap.get("gra" + i.toString().padStart(3, "0"))] = collisionLevel.none;
}

// Sand Collision
for (let i = 0; i < 7; i++) {
  tileCollisionLevels[TileMap.get("san" + i.toString().padStart(3, "0"))] = collisionLevel.none;
}

// Bridge Collision
for (let i = 9; i < 12; i++) {
  tileCollisionLevels[TileMap.get("bri" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

// Water Collision
for (let i = 0; i < 24; i++) {
  tileCollisionLevels[TileMap.get("wat" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

// Building Collision
for (let i = 0; i < 41; i++) {
  tileCollisionLevels[TileMap.get("bui" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

tileCollisionLevels[TileMap.get("bui008")] = collisionLevel.none;

// Cliff Collision
for (let i = 0; i < 3; i++) {
  tileCollisionLevels[TileMap.get("cli" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

// Skills Collision
for (let i = 0; i < 27; i++) {
  tileCollisionLevels[TileMap.get("ski" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

tileCollisionLevels[TileMap.get("ski014")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("ski024")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("ski026")] = collisionLevel.none;

// Portfolio Collision
for (let i = 0; i < 30; i++) {
  tileCollisionLevels[TileMap.get("por" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

tileCollisionLevels[TileMap.get("por027")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("por028")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("por029")] = collisionLevel.none;

// Home Collision
for (let i = 0; i < 30; i++) {
  tileCollisionLevels[TileMap.get("hom" + i.toString().padStart(3, "0"))] = collisionLevel.block;
}

tileCollisionLevels[TileMap.get("hom020")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("hom021")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("hom022")] = collisionLevel.none;
tileCollisionLevels[TileMap.get("hom029")] = collisionLevel.none;

export default tileCollisionLevels;
