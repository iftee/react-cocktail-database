import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const appFooterStyles = makeStyles({
  root: {
    paddingTop: 24,
    paddingBottom: 24,
    textAlign: 'center',
  },
  a: {
    color: '#ff5722',
    '&:hover, &:focus': {
      color: '#e64a19',
    }
  },
});

export const AppFooter = () => {
  const classes = appFooterStyles();

  return(
    <Container maxWidth="lg" className={classes.root}>
      <p>A React based project to view cocktail recipes using <a href="https://www.thecocktaildb.com" target="_blank" rel="noopener noreferrer" className={classes.a}>TheCocktialDB</a> API. <br/>View repository on <a href="https://github.com/iftee/react-cocktail-database" target="_blank" rel="noopener noreferrer" className={classes.a}>GitHub</a>.</p>
    </Container>
  );
}