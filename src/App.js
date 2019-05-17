import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QuestionType from './QuestionType';
import Box from '@material-ui/core/Box';

// 'Extend' the default styles
const useStyles = makeStyles(theme => ({
  box: {
    marginTop: theme.spacing(8),
  }
}));

function App() {
  const classes = useStyles();

  const [clickOutside, setClickOutside] = useState({ clickOutside: false });

  const outsideClick = event => {
    event.preventDefault();
    setClickOutside({ clickOutside: true });
  };

  const childIsActive = () => {
    setClickOutside({ clickOutside: false });
  };

  return (
    <Box component="main" className={classes.box} onClick={outsideClick}>
      <QuestionType outside={ clickOutside } isActive={childIsActive} />
    </Box>
  )
}

export default App;