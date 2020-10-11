import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Home } from '../Home/Home';
import { NotFound } from '../NotFound/NotFound';
import { CocktailSingle } from '../CocktailSingle/CocktailSingle';
import { AppHeader } from '../elements/AppHeader/AppHeader';
import { BackToTop } from  '../elements/BackToTop/BackToTop';
import { AppFooter } from '../elements/AppFooter/AppFooter';

export const App = () => {
  const themeObject = {
    palette: {
      type: 'light',
      primary: deepOrange,
    },
    typography: {
      fontFamily: [
        'Inter',
        'sans-serif',
      ].join(','),
    },
  }
  const [theme, setTheme] = useState(themeObject);

  const toggleTheme = () => {
    if (theme.palette.type === 'light') {      
      window.localStorage.setItem('rcdbThemePaletteType', 'dark');
      const updatedTheme = {
        ...theme,
        palette: {
          ...theme.palette,
          type: 'dark'
        }
      }
      setTheme(updatedTheme);
    } else {
      window.localStorage.setItem('rcdbThemePaletteType', 'light');      
      setTheme(themeObject);
    }
  }

  useEffect(() => {
    const localThemePaletteType = window.localStorage.getItem('rcdbThemePaletteType');
    if (localThemePaletteType) {
      const updatedTheme = {
        ...theme,
        palette: {
          ...theme.palette,
          type: localThemePaletteType
        }
      }
      setTheme(updatedTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const muiTheme = createMuiTheme(theme);
  let toggleThemeIcon = muiTheme.palette.type === 'light' ? 'dark' : 'light';

  return(
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {/* <Router> */}
      <Router basename="/react-cocktail-database">
      {/* basename="/react-cocktail-database/" for deploying to my github pages, empty when deploying to server root */}    
        <AppHeader toggleTheme={toggleTheme} toggleThemeIcon={toggleThemeIcon} />
        <Switch>
          <Route path="/cocktail/:id" exact>
            <CocktailSingle />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="*" >
            <NotFound />
          </Route>        
        </Switch>
        <BackToTop />
        <AppFooter />
      </Router>
    </MuiThemeProvider>
  );
}