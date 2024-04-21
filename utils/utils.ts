export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const limitTitleLength = (title: string, maxWords: number = 9): string => {
  const words = title.split(' ');

  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return title;
};

export const getFormatedDateFromTimestamp = (timestamp: number | string): string => {
  // If timestamp is a string, parse it to a number

  if (typeof timestamp === 'string') {
    timestamp = Date.parse(timestamp);
  }

  const date = new Date(timestamp);
  const formatedDate = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  return formatedDate;
};

export const hexToRGBA = (hex: string, opacity?: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (opacity) {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};
