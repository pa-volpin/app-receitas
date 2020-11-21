async function fetchFood(searchFor, value) {
  const baseURL = 'https://www.themealdb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    name: 'search.php?s=',
    firstLetter: 'search.php?f=',
    random: 'random.php',
  };
  const URL = `${baseURL}${searchType[searchFor]}${value}`;
  const response = await fetch(URL);
  const responseJSON = await response.json();
  return responseJSON.meals;
}

export default fetchFood;
