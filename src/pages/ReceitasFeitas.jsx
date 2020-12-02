import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import ReceitasContext from '../context/ReceitasContext';

function ReceitasFeitas() {
  const { isFetching, setIsFetching, setTitleHeader,
    setDisabledSearchIcon, setShowSearchBar } = useContext(ReceitasContext);
  const [feitas, setFeitas] = useState([]);

  useEffect(() => {
    setTitleHeader('Receitas Feitas');
    setDisabledSearchIcon(true);
    setShowSearchBar(false);
    setIsFetching(true);
    const localStorageFeitas = localStorage.getItem('doneRecipes');
    // console.log(localStorageFeitas);
    if (localStorageFeitas !== null) {
      const doneRecipes = JSON.parse(localStorageFeitas);
      setIsFetching(false);
      setFeitas(doneRecipes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feitas]);

  const filterFoodOrDrink = (filter) => {
    const localStorageFeitas = localStorage.getItem('doneRecipes');
    if (localStorageFeitas !== null) {
      const doneRecipes = JSON.parse(localStorageFeitas);
      console.log(doneRecipes);
      if (filter === 'Food') {
        setFeitas(doneRecipes.filter((recipe) => recipe.type === 'comida'));
      } else if (filter === 'Drinks') {
        setFeitas(doneRecipes.filter((recipe) => recipe.type === 'bebida'));
      } else {
        setFeitas(doneRecipes);
      }
    }
  };

  return (
    <main className="receitas-container">
      <Header />
      <section className="receitas-body">
        <section className="receitas-filters">
          <section className="done-fav-container">
            <button
              data-testid="filter-by-all-btn"
              type="button"
              value="All"
              onClick={ ({ target }) => filterFoodOrDrink(target.value) }
            >
              All
            </button>
            <button
              data-testid="filter-by-food-btn"
              type="button"
              value="Food"
              onClick={ ({ target }) => filterFoodOrDrink(target.value) }
            >
              Food
            </button>
            <button
              data-testid="filter-by-drink-btn"
              type="button"
              value="Drinks"
              onClick={ ({ target }) => filterFoodOrDrink(target.value) }
            >
              Drinks
            </button>
          </section>
        </section>
        <section className="cards-list">
          {isFetching
            ? <p>Nenhuma Receita Feita</p>
            : (
              feitas.map((feita, idx) => (
                <CardFavorite
                  key={ idx }
                  imagePath={ feita.image }
                  itemName={ feita.name }
                  id={ feita.id }
                  itemType={ `${feita.type}s` }
                  indexId={ idx }
                  cardType="horizontal"
                  area={ feita.area }
                  category={ feita.category }
                  alcoholic={ feita.alcoholicOrNot }
                  titlePage="Receitas Feitas"
                  date={ feita.doneDate }
                  tagsRecipe={ feita.tags.map((tagName, idxTag) => (
                    <button
                      type="button"
                      key={ idxTag }
                      data-testid={ `${idx}-${tagName}-horizontal-tag` }
                    >
                      {tagName}
                    </button>
                  )) }
                />
              ))
            )}
        </section>
      </section>
    </main>
  );
}

export default ReceitasFeitas;
