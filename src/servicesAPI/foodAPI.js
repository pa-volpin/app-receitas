async function fetchFood(searchFor, value) {
  const baseURL = 'https://www.themealdb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    itemName: 'search.php?s=',
    firstLetter: 'search.php?f=',
    random: 'random.php',
  };
  const URL = `${baseURL}${searchType[searchFor]}${value}`;
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resp.json())
    .catch((error) => {
      console.log(`Deu erro: ${error.message}`);
    });
  return response.meals;
}

export default fetchFood;
