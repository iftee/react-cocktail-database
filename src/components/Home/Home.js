import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { SearchForm } from '../elements/SearchForm/SearchForm';
import { CocktailList } from '../elements/CocktailList/CocktailList';

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);  

  useEffect(() => {
    let localSearchTerm = window.sessionStorage.getItem('seacrhTerm');
    if(!localSearchTerm){
      setInitial(true);
      setLoading(false);
    } else {
      document.querySelector('#searchInput').value = localSearchTerm;
      setSearchTerm(localSearchTerm);
    }    
  }, []);

  useEffect(() => {    
    if(searchTerm === ''){
      setInitial(true);
    } else {
      const timer = setTimeout(() => {        
        setInitial(false);
        setLoading(true);        
        const getDrinks = async() => {
          try {
            const result = await (await fetch(
              `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            ).json();
            const { drinks } = result;

            if(drinks) {
              const newCocktails = drinks.map(element => {
                const { idDrink, strDrink, strDrinkThumb, strAlcoholic } = element;
                return {
                  id: idDrink,
                  name: strDrink,
                  image: strDrinkThumb,
                  alcoholic: strAlcoholic
                };
              });
              setCocktails(newCocktails);
            } else {
              setCocktails([]);
            }
          } catch (error) {
            console.log('error: ', error);
          }
          setLoading(false);
        }
        getDrinks();
      }, 500);
      return () => clearTimeout(timer);
    }    
  }, [searchTerm]);

  return (
    <>
      <SearchForm setSearchTerm={setSearchTerm} />
      <Container maxWidth="lg">
        <CocktailList loading={loading} cocktails={cocktails} initial={initial} />
      </Container>      
    </>
  );
}
