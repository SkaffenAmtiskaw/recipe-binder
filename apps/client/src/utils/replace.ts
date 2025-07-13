export default (array: any[], value: any, index: number): any[] => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
];
