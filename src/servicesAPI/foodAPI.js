async function fetchFood(searchFor, value) {
  const zero = 0;
  if (searchFor === 'firstLetter' && (value.length > 1 || value.length === zero)) {
    // eslint-disable-next-line no-alert
    alert('Sua busca deve conter somente 1 (um) caracter');
    return;
  }
  const baseURL = 'https://www.themealdb.com/api/json/v1/1/';
  const searchType = {
    ingredient: 'filter.php?i=',
    itemName: 'search.php?s=',
    firstLetter: 'search.php?f=',
    byId: 'lookup.php?i=',
    categories: 'list.php?c=list',
    byCategory: 'filter.php?c=',
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
