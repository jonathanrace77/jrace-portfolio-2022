import tileMapEnum from "./TileMapEnum.js"
import { collisionLevel } from "./Enums.js"

let tileCollisionLevels = {}

// Grass Collision
for(let i = 0; i < 14; i++){
    tileCollisionLevels[tileMapEnum['gra' + i.toString().padStart(3, '0')]] = collisionLevel.none;
}

// Sand Collision
for(let i = 0; i < 7; i++){
    tileCollisionLevels[tileMapEnum['san' + i.toString().padStart(3, '0')]] = collisionLevel.none;
}

// Bridge Collision
for(let i = 9; i < 12; i++){
    tileCollisionLevels[tileMapEnum['bri' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

// Water Collision
for(let i = 0; i < 24; i++){
    tileCollisionLevels[tileMapEnum['wat' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

// Building Collision
for(let i = 0; i < 41; i++){
    tileCollisionLevels[tileMapEnum['bui' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

tileCollisionLevels[tileMapEnum['bui008']] = collisionLevel.none;

// Cliff Collision
for(let i = 0; i < 3; i++){
    tileCollisionLevels[tileMapEnum['cli' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

// Skills Collision
for(let i = 0; i < 27; i++){
    tileCollisionLevels[tileMapEnum['ski' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

tileCollisionLevels[tileMapEnum['ski014']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['ski024']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['ski026']] = collisionLevel.none;

// Portfolio Collision
for(let i = 0; i < 30; i++){
    tileCollisionLevels[tileMapEnum['por' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

tileCollisionLevels[tileMapEnum['por027']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['por028']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['por029']] = collisionLevel.none;

// Home Collision
for(let i = 0; i < 30; i++){
    tileCollisionLevels[tileMapEnum['hom' + i.toString().padStart(3, '0')]] = collisionLevel.block;
}

tileCollisionLevels[tileMapEnum['hom020']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['hom021']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['hom022']] = collisionLevel.none;
tileCollisionLevels[tileMapEnum['hom029']] = collisionLevel.none;

export default tileCollisionLevels;