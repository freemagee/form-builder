import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function AddQuestion(props) {
  const handleClick = event => {
    props.add();
  };

  return (
    <Fab variant="extended" aria-label="Add" onClick={handleClick}>
      <AddIcon />
      Add question
    </Fab>
  );
}

export default AddQuestion;