export const getKeyByValue = (object, value) => {
  for (let [mapKey, mapValue] of object.entries()) {
    if (mapValue === value) return mapKey;
  }
};
