const fetchDrink = (searchFor, value) => {
  const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    name: 'search.php?s=',
    firstLetter: 'search.php?f=',
  };
  const URL = `${baseURL}${searchType[searchFor]}${value}`;
  return fetch(URL).then((response) => response.json()).then((r) => r.drinks);
};

export default fetchDrink;
