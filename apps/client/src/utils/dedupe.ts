export default (array: any[]) =>
  array.filter((value, idx) => array.indexOf(value) === idx);
