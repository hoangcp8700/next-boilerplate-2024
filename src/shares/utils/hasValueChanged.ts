export const hasValueChanged = (oldValue: any, newValue: any): boolean => {
  // Check if the types of oldValue and newValue are different
  // console.log(hasValueChanged(10, '10')); // Output: true
  if (typeof oldValue !== typeof newValue) {
    return true;
  }

  // Check if both oldValue and newValue are arrays
  // console.log(hasValueChanged([1, 2, 3], [1, 2, 3])); // Output: false
  // console.log(hasValueChanged([1, 2, 3], [1, 2, 3, 4])); // Output: true
  if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    // If the lengths of the arrays are different, values have changed
    if (oldValue.length !== newValue.length) {
      return true;
    }

    // Iterate over the array elements and recursively check for value changes
    return oldValue.some((_, index) =>
      hasValueChanged(oldValue[index], newValue[index]),
    );
  }

  // Check if both oldValue and newValue are objects
  // console.log(hasValueChanged({ name: 'John' }, { name: 'John' })); // Output: false
  if (typeof oldValue === 'object' && typeof newValue === 'object') {
    // Check if both values are Date objects and their times are different
    // console.log(hasValueChanged(new Date('2022-01-01'), new Date('2022-02-01'))); // Output: true
    // console.log(hasValueChanged(new Date('2022-01-01'), new Date('2022-02-02'))); // Output: false
    if (oldValue instanceof Date && newValue instanceof Date) {
      return oldValue.getTime() !== newValue.getTime();
    }

    // Handle the case when value is null or undefined
    // console.log(hasValueChanged(null, {})); // Output: true
    const oldKeys = Object.keys(oldValue || {});
    const newKeys = Object.keys(newValue || {});

    // If the number of keys in the objects is different, values have changed
    if (oldKeys.length !== newKeys.length) {
      return true;
    }

    // Iterate over the keys and recursively check for value changes
    return oldKeys.some((key) => hasValueChanged(oldValue[key], newValue[key]));
  }

  // If none of the above conditions are met, compare the values directly
  // console.log(hasValueChanged(5, 5)); // Output: false
  // console.log(hasValueChanged(5, 10)); // Output: true
  return oldValue !== newValue;
};
