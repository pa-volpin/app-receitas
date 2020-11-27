import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import ReceitasContext from '../context/ReceitasContext';

function ReceitasFavoritas() {
  const { isFetching, setIsFetching, setTitleHeader,
    setDisabledSearchIcon, setShowSearchBar } = useContext(ReceitasContext);
  const [favoritas, setFavoritas] = useState([{
    id: 'id-da-receita',
    type: 'comidas-ou-bebidas',
    area: 'area-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
  }]);

  useEffect(() => {
    setTitleHeader('Receitas Favoritas');
    setDisabledSearchIcon(false);
    setShowSearchBar(false);
    setIsFetching(true);
    const localStorageFavoritas = localStorage.getItem('favoriteRecipes');
    console.log(localStorageFavoritas);
    if (localStorageFavoritas !== null) {
      const { favoriteRecipes } = JSON.parse(localStorageFavoritas);
      setFavoritas(...favoriteRecipes);
    }
    setIsFetching(false);
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
                // {tags.map(data-testid={ `${indexId}-${tagName}-horizontal-tag` })}
              />
            ))
          )}
      </section>
    </main>
  );
}

export default ReceitasFavoritas;
