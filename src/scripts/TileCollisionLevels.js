import collisionLevel from "../enums/CollisionLevelEnum.js";
import TileMapEnum from "../enums/TileMapEnum.js";

let tileCollisionLevels = {};

// Grass Collision
for (let i = 0; i < 14; i++) {
  tileCollisionLevels[TileMapEnum["gra" + i.toString().padStart(3, "0")]] = collisionLevel.none;
}

// Sand Collision
for (let i = 0; i < 7; i++) {
  tileCollisionLevels[TileMapEnum["san" + i.toString().padStart(3, "0")]] = collisionLevel.none;
}

// Bridge Collision
for (let i = 9; i < 12; i++) {
  tileCollisionLevels[TileMapEnum["bri" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

// Water Collision
for (let i = 0; i < 24; i++) {
  tileCollisionLevels[TileMapEnum["wat" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

// Building Collision
for (let i = 0; i < 41; i++) {
  tileCollisionLevels[TileMapEnum["bui" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

tileCollisionLevels[TileMapEnum["bui008"]] = collisionLevel.none;

// Cliff Collision
for (let i = 0; i < 3; i++) {
  tileCollisionLevels[TileMapEnum["cli" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

// Skills Collision
for (let i = 0; i < 27; i++) {
  tileCollisionLevels[TileMapEnum["ski" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

tileCollisionLevels[TileMapEnum["ski014"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["ski024"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["ski026"]] = collisionLevel.none;

// Portfolio Collision
for (let i = 0; i < 30; i++) {
  tileCollisionLevels[TileMapEnum["por" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

tileCollisionLevels[TileMapEnum["por027"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["por028"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["por029"]] = collisionLevel.none;

// Home Collision
for (let i = 0; i < 30; i++) {
  tileCollisionLevels[TileMapEnum["hom" + i.toString().padStart(3, "0")]] = collisionLevel.block;
}

tileCollisionLevels[TileMapEnum["hom020"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["hom021"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["hom022"]] = collisionLevel.none;
tileCollisionLevels[TileMapEnum["hom029"]] = collisionLevel.none;

export default tileCollisionLevels;
