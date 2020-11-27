import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import ReceitasContext from '../context/ReceitasContext';

function ReceitasFeitas() {
  const { isFetching, setIsFetching, setTitleHeader,
    setDisabledSearchIcon, setShowSearchBar } = useContext(ReceitasContext);
  const [feitas, setFeitas] = useState([{
    id: 'id-da-receita',
    type: 'comida-ou-bebida',
    area: 'area-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: ['array-de-tags-da-receita', 'ou-array-vazio'],
  }]);

  useEffect(() => {
    setTitleHeader('Receitas Feitas');
    setDisabledSearchIcon(true);
    setShowSearchBar(false);
    setIsFetching(true);
    const localStorageFeitas = localStorage.getItem('doneRecipes');
    console.log(localStorageFeitas);
    if (localStorageFeitas !== null) {
      const { doneRecipes } = JSON.parse(localStorageFeitas);
      setFeitas(...doneRecipes);
    }
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="feitas-container">
      <header className="feitas-header">
        <Header />
      </header>
      <section className="feitas-filtros">
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      </section>
      <section className="feitas-cards">
        {isFetching
          ? <p>Loading...</p>
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
    </main>
  );
}

export default ReceitasFeitas;
