import collisionLevel from "../enums/CollisionLevel.enum";
import TileMap from "../maps/TileMap";

let tileCollisionLevelsMap: Map<number, number> = new Map<number, number>();

// Grass Collision
for (let i = 0; i < 14; i++) {
  tileCollisionLevelsMap.set(TileMap.get("gra" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.none);
}

// Sand Collision
for (let i = 0; i < 7; i++) {
  tileCollisionLevelsMap.set(TileMap.get("san" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.none);
}

// Bridge Collision
for (let i = 9; i < 12; i++) {
  tileCollisionLevelsMap.set(TileMap.get("bri" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

// Water Collision
for (let i = 0; i < 24; i++) {
  tileCollisionLevelsMap.set(TileMap.get("wat" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

// Building Collision
for (let i = 0; i < 41; i++) {
  tileCollisionLevelsMap.set(TileMap.get("bui" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

tileCollisionLevelsMap.set(TileMap.get("bui008") ?? -1, collisionLevel.none);

// Cliff Collision
for (let i = 0; i < 3; i++) {
  tileCollisionLevelsMap.set(TileMap.get("cli" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

// Skills Collision
for (let i = 0; i < 27; i++) {
  tileCollisionLevelsMap.set(TileMap.get("ski" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

tileCollisionLevelsMap.set(TileMap.get("ski014") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("ski024") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("ski026") ?? -1, collisionLevel.none);

// Portfolio Collision
for (let i = 0; i < 30; i++) {
  tileCollisionLevelsMap.set(TileMap.get("por" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

tileCollisionLevelsMap.set(TileMap.get("por027") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("por028") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("por029") ?? -1, collisionLevel.none);

// Home Collision
for (let i = 0; i < 30; i++) {
  tileCollisionLevelsMap.set(TileMap.get("hom" + i.toString().padStart(3, "0")) ?? -1, collisionLevel.block);
}

tileCollisionLevelsMap.set(TileMap.get("hom020") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("hom021") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("hom022") ?? -1, collisionLevel.none);
tileCollisionLevelsMap.set(TileMap.get("hom029") ?? -1, collisionLevel.none);

export default tileCollisionLevelsMap;
