export const insert = (arr, index, newItem) => [
    ...arr.slice(0, index),
  
    newItem,
  
    ...arr.slice(index)
  ];