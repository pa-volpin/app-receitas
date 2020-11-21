async function fetchDrink(searchFor, value) {
  const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    itemName: 'search.php?s=',
    firstLetter: 'search.php?f=',
    random: 'random.php',
  };
  const URL = `${baseURL}${searchType[searchFor]}${value}`;
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    } });
  const responseJSON = await response.json();
  console.log(responseJSON);
  return responseJSON.drinks;
}

export default fetchDrink;
