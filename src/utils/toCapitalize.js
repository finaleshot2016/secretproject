const toCapitalize = (string) => {
  if (string.includes('-')) {
    return string
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default toCapitalize;
