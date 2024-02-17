export const capitalizeFirstLetter = (string: string) => { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const limitTitleLength = (title: string, maxWords: number = 9) => {
  const words = title.split(' ');


  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return title;
};


export const getFormatedDateFromTimestamp = (timestamp: number | string) => {
  // If timestamp is a string, parse it to a number

  if (typeof timestamp === 'string') {
    timestamp = Date.parse(timestamp);
  }

  const date = new Date(timestamp);
  const formatedDate = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric'});
  return formatedDate;
}