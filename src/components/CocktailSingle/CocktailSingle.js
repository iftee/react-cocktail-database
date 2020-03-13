import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { LoadingCircle } from '../elements/LoadingCircle/LoadingCircle';
import Typography from '@material-ui/core/Typography';
import LocalCafeOutlined from '@material-ui/icons/LocalCafeOutlined';
import LocalBarOutlined from '@material-ui/icons/LocalBarOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { BackHomeButton } from '../elements/BackHomeButton/BackHomeButton';
import { ArtNotFound } from '../elements/arts/ArtNotFound';

const cocktailSingleStyles = makeStyles(theme => ({
  root: {
    height: 'auto',
    minHeight: 'calc(100vh - 202px)',
    marginTop: 32,
  },
  cocktailImage: {
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxWidth: '100%',    
    borderRadius: 12,
  },
  title: {
    margin: '0 0 24px',
    fontSize: '1.75rem',
    fontWeight: 300,
  },
  subtitleWrap: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& .MuiTypography-subtitle1': {
      display: 'flex',
      alignItems: 'center',
      marginRight: 32,
      '& svg': {
        marginRight: 8,
        fontSize: '1rem',
      }
    },
  },
  ingredientCard: {
    display: 'flex',
    borderRadius: 12,
    padding: 12,
    boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  subtitle1: {
    margin: 0,
    fontSize: '.75rem',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  ingredientImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  ingredientContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 0 12px !important',
  },
  ingredientName: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  ingredientAmount: {
    fontSize: '1rem',
    fontWeight: 500,
  },
  instructionsCard: {
    borderRadius: 12,
    padding: 12,
    boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.2)',
  },
  instructions: {
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: '12px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  backButtonWrap: {
    padding: '32px 0',
    textAlign: 'center',
  },
}));

export const CocktailSingle = () => {
  const classes = cocktailSingleStyles();

  const { id } = useParams();

  const [ loading, setLoading ] = useState(false);
  const [ cocktail, setCocktail ] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getCocktail = async() => {
      try {
        const result = await (await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
        )).json();

        if(result.drinks) {
          const {strDrink:name,
            strDrinkThumb:image,
            strCategory:category,
            strAlcoholic:alcoholic,
            strGlass:glass,
            strInstructions:instructions,
            strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient14, strIngredient15,
            strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure14, strMeasure15
          } = result.drinks[0];
          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient14, strIngredient15].filter((element) => { return element != null; });
          const measures = [strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure14, strMeasure15].slice(0, ingredients.length).map(element => { return element; });

          const newCocktail = {name, image, category, alcoholic, glass, instructions, ingredients, measures};
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
      } catch(error) {
        console.log('error: ', error);
      }
      setLoading(false);
    }
    getCocktail();
  }, [id]);

  if(loading) {
    return <LoadingCircle />;
  }
  if(!cocktail) {
    return(
      <ArtNotFound />
    );
  } else {
    const {name, image, category, alcoholic, glass, instructions, ingredients, measures} = cocktail;

    return(
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5} >
            <img src={image} alt={name} className={classes.cocktailImage} />
          </Grid>
          <Grid item xs={12} md={7} >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h3" className={classes.title}>
                  {name}
                </Typography>
                <div className={classes.subtitleWrap}>                  
                  {category ?
                    <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.subtitle1}>
                      <LabelOutlinedIcon /><div>{category}</div>
                    </Typography>
                    :
                    null
                  }
                  {alcoholic ?
                    <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.subtitle1}>
                      {alcoholic === 'Non alcoholic' ?
                        <>
                          <LocalCafeOutlined /><div>{alcoholic}</div>
                        </>
                        :
                        <>
                          <LocalBarOutlined /><div>{alcoholic}</div>
                        </>
                      }
                    </Typography>
                    :
                    null
                  }
                  {ingredients.length ?
                    <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.subtitle1}>
                      <LocalMallOutlinedIcon /><div>
                        {ingredients.length}
                        {ingredients.length > 1 ?
                          ' Ingredients'
                          :
                          ' Ingredient'
                        }
                      </div>                      
                    </Typography>
                    :
                    null
                  }
                </div>                
              </Grid>
              {ingredients.length ?
                ingredients.map((element, iterator) => {
                  return(
                    element ?
                    <Grid item xs={12} lg={6} key={iterator}>
                      <Card className={classes.ingredientCard}>
                        <CardMedia
                          className={classes.ingredientImage}
                          image={`https://www.thecocktaildb.com/images/ingredients/${element}-Small.png`}
                          title={element}
                        />
                        <CardContent className={classes.ingredientContent}>
                          <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.subtitle1}>
                            Ingredient {iterator + 1}
                          </Typography>
                          <div className={classes.ingredientName}>{element}</div>
                          {measures[iterator] ?
                            <Typography color="textSecondary" component="div" className={classes.ingredientAmount}>
                              {measures[iterator]}
                            </Typography>
                            :
                            null
                          }
                        </CardContent>
                      </Card>
                    </Grid>
                    :
                    null
                  );
                })
                :
                null
              }
              <Grid item xs={12}>
                <Card className={classes.instructionsCard}>
                  {
                    glass ?
                      <>
                        <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.subtitle1}>Served in</Typography>
                        <div className={classes.instructions}>{glass}</div>
                      </>
                    :
                    null
                  }
                  <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.subtitle1}>Instructions</Typography>
                  <div className={classes.instructions}>{instructions}</div>
                </Card>                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.backButtonWrap}>
          <BackHomeButton />
        </div>        
      </Container>
    );
  }
}