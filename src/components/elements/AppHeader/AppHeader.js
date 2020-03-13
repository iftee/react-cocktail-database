import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import Brightness4Icon from '@material-ui/icons/Brightness4Outlined';
import Brightness7Icon from '@material-ui/icons/Brightness7Outlined';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const appHeaderStyles = makeStyles({
  root: {
    backgroundImage: 'linear-gradient(90deg, #dd2c00 0%, #ff5722 75%)',
    '&.MuiPaper-elevation4': {
      boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.2)',
    },
  },
  toolBar: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1280,    
    display: 'flex',
    justifyContent: 'space-between',
  },
  brandTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.6,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
});

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const AppHeader = ({ toggleTheme, toggleThemeIcon }) => {
  const classes = appHeaderStyles();

  return (
    <>     
      <ElevationScroll>
        <AppBar className={classes.root}>
          <Toolbar className={classes.toolBar}>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Home"
              component={RouterLink}
              to="/"
            >
              <HomeIcon />
            </IconButton>
            <div className={classes.brandTitle}>
              Cocktail Recipes
            </div>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Switch Light/Dark Theme"
              onClick={toggleTheme}
            >
              {toggleThemeIcon === 'light' ? 
                <Brightness7Icon />
                :
                <Brightness4Icon />
              }                
            </IconButton>        
          </Toolbar>          
        </AppBar>
      </ElevationScroll> 
      <Toolbar id="back-to-top-anchor" />     
    </>
  );
}
