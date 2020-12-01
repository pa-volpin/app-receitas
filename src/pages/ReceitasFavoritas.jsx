import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import ReceitasContext from '../context/ReceitasContext';

function ReceitasFavoritas() {
  const { isFetching, setIsFetching, setTitleHeader,
    setDisabledSearchIcon, setShowSearchBar } = useContext(ReceitasContext);
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    setTitleHeader('Receitas Favoritas');
    setDisabledSearchIcon(true);
    setShowSearchBar(false);
    setIsFetching(true);
    const localStorageFavoritas = localStorage.getItem('favoriteRecipes');
    if (localStorageFavoritas) {
      const favoriteRecipes = JSON.parse(localStorageFavoritas);
      console.log(favoriteRecipes);
      setFavoritas(favoriteRecipes);
      setIsFetching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="favoritas-container">
      <header className="favoritas-header">
        <Header />
      </header>
      <section className="favoritas-filtros">
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>
      <section className="favoritas-cards">
        {isFetching
          ? <p>Loading...</p>
          : (
            favoritas.map((favorita, idx) => (
              <CardFavorite
                key={ idx }
                imagePath={ favorita.image }
                itemName={ favorita.name }
                id={ favorita.id }
                itemType={ favorita.type }
                indexId={ idx }
                cardType="horizontal"
                origin={ favorita.area }
                category={ favorita.category }
                alcoholic={ favorita.alcoholicOrNot }
                titlePage="Receitas Favoritas"
              />
            ))
          )}
      </section>
    </main>
  );
}

export default ReceitasFavoritas;
