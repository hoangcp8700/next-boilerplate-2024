export const capitalizeFirstLetter = (str?: string): string => {
  if (!str) return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
};

// ex: 'firstName' => 'First Name'
// ex: 'first_name' => 'First Name
export const splitCamelAndSnakeText = (text: string) => {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Convert camelCase to words
    .replace(/_/g, ' ') // Replace underscores with spaces
    .toLowerCase() // Ensure all letters are in lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export function capitalize(str?: string) {
  if (!str) return str || '';
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}
