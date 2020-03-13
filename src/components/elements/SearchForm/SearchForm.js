import React, { useRef } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

const searchFormStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 32,
    paddingTop: 32,
  },
  input: {
    borderRadius: 28,
    boxShadow: '0 5px 30px -5px rgba(0, 0, 0, 0.2)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e0e0e0',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ff5722',
      },
    },
    '&:focus': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ff5722',
      },
    },
  },
}));

export const SearchForm = ({ setSearchTerm }) => {
  const classes = searchFormStyles();
  const searchValue = useRef('');

  const handleSubmit = (event) => {
    event.perventDefault();
  }
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
    window.sessionStorage.setItem('seacrhTerm', searchValue.current.value);
  }

  return(
    <div className={classes.root}>
      <Container
        maxWidth="lg"
        component="form"      
        onSubmit={handleSubmit}
        autoComplete="off"
      >   
        <FormControl fullWidth variant="outlined">
          <OutlinedInput
            name="searchInput"
            id="searchInput"
            className={classes.input}
            placeholder="Seacrh cocktails"
            inputProps={{ 'aria-label': 'Seacrh cocktails' }}
            onChange={searchCocktail}
            inputRef={searchValue}
            startAdornment={<InputAdornment position="start"><SearchIcon color="primary" /></InputAdornment>}
            labelWidth={0}
          />
        </FormControl>
      </Container>
    </div>    
  );
}
