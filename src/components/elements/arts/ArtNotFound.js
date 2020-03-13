import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import { BackHomeButton } from '../BackHomeButton/BackHomeButton';
import NotFoundSVG from './notFound.svg';

const artNotFoundStyles = makeStyles({
  root: {
    height: 'auto',
    minHeight: 'calc(100vh - 180px)',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    width: '100%',
    maxWidth: '320px',
    margin: '0 auto',
    textAlign: 'center',
  },
  img: {
    display: 'block',
    margin: '0 auto 24px',
    width: '100%',
    height: 'auto',
    maxWidth: '300px',
  },
  p: {
    display: 'block',
    width: '100%',
    fontSize: '17px',
  },
});

export const ArtNotFound = () => {
  const classes = artNotFoundStyles();

  return (
    <Fade in={true}>
      <Box component="div" className={classes.root}>
        <img src={NotFoundSVG} alt="Search for cocktail recipes." width="270" className={classes.img} />
        <div className={classes.p}>This is not real.<BackHomeButton /></div>
      </Box>
    </Fade>
  );
}
