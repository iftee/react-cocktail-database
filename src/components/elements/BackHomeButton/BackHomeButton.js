import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { makeStyles } from '@material-ui/core/styles';

const backHomeButtonStyles = makeStyles(theme => ({
  root: {
    marginTop: 24,
  },
  button: {
    borderRadius: 36,
    padding: '8px 36px',
    letterSpacing: 1,
    backgroundImage: 'linear-gradient(90deg, #dd2c00 0%, #ff5722 75%)',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
    '&:hover': {
      backgroundImage: 'linear-gradient(90deg, #ff5722 0%, #dd2c00 75%)',
    },
  },
}));

export const BackHomeButton = () => {
  const classes = backHomeButtonStyles();

  return(
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<HomeIcon />}        
        component={RouterLink}
        to="/"
      >
        Go Back to Home
      </Button>
    </div>
  );
}
