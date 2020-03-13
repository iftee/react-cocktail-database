import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const loadingCircleStyles = makeStyles(theme => ({  
  root: {
    textAlign: 'center',
    padding: '24px 0',
  },
}));

export const LoadingCircle = () => {
  const classes = loadingCircleStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>    
  );
}
