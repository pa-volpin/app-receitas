async function fetchFood(searchFor, value) {
  if (searchFor === 'firstLetter' && value.length > 1) {
    // eslint-disable-next-line no-alert
    alert('Sua busca deve conter somente 1 (um) caracter');
    return;
  }
  const baseURL = 'https://www.themealdb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    itemName: 'search.php?s=',
    firstLetter: 'search.php?f=',
    random: 'random.php',
  };
  const URL = `${baseURL}${searchType[searchFor]}${value}`;
  const response = await fetch(URL)
    .then((resp) => resp.json())
    .catch((error) => {
      console.log(`Deu erro: ${error.message}`);
    });
  return response.meals;
}

export default fetchFood;
