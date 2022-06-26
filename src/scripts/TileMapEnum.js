let tileMapEnum = {};

tileMapEnum['playerNorth'] = 9000;
tileMapEnum['playerNorthMove'] = 9001;
tileMapEnum['playerEast'] = 9010;
tileMapEnum['playerEastMove'] = 9011;
tileMapEnum['playerSouth'] = 9020;
tileMapEnum['playerSouthMove'] = 9021;
tileMapEnum['playerWest'] = 9030;
tileMapEnum['playerWestMove'] = 9031;

// Grass Tiles
for(let i = 0; i < 14; i++){
    tileMapEnum['gra' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"10"));
}

// Sand Tiles
for(let i = 0; i < 17; i++){
    tileMapEnum['san' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"20"));
}

// Water Tiles
for(let i = 0; i < 24; i++){
    tileMapEnum['wat' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"30"));
}

// Cliff Tiles
for(let i = 0; i < 3; i++){
    tileMapEnum['cli' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"40"));
}

// Bridge Tiles
for(let i = 0; i < 13; i++){
    tileMapEnum['bri' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"50"));
}

// Bridge Tiles
for(let i = 0; i < 42; i++){
    tileMapEnum['bui' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"60"));
}

// Skills Tiles
for(let i = 0; i < 28; i++){
    tileMapEnum['ski' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"70"));
}

// Portfolio Tiles
for(let i = 0; i < 30; i++){
    tileMapEnum['por' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"80"));
}

// Home Tiles
for(let i = 0; i < 30; i++){
    tileMapEnum['hom' + String(i).padStart(3,"00")] = parseInt(String(i).padStart(3,"90"));
}

export default tileMapEnum;