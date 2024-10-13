export const getKeyByValue = (object: any, value: any): any => {
  for (let [mapKey, mapValue] of object.entries()) {
    if (mapValue === value) return mapKey;
  }
};

export const isTouchDevice = (): boolean => {
  return navigator.maxTouchPoints > 0;
};
