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
    console.log(localStorageFeitas);
    if (localStorageFeitas !== null) {
      const doneRecipes = JSON.parse(localStorageFeitas);
      setIsFetching(false);
      setFeitas(doneRecipes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="comidas-container">
      <header>
        <Header />
      </header>
      <section className="comidas-body">
        <section className="comidas-filters">
          <button data-testid="filter-by-all-btn" type="button">All</button>
          <button data-testid="filter-by-food-btn" type="button">Food</button>
          <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
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
                  itemType={ feita.type }
                  indexId={ idx }
                  cardType="horizontal"
                  origin={ feita.area }
                  category={ feita.category }
                  alcoholic={ feita.alcoholicOrNot }
                  titlePage="Receitas Feitas"
                  date={ feita.doneDate }
                  tagsRecipe={ feita.tags.map((tagName, idxTag) => (
                    <button
                      type="button"
                      key={ idxTag }
                      data-testid={ `${idxTag}-${tagName}-horizontal-tag` }
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
