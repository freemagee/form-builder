import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function AddQuestion(props) {
  const { add } = props;

  function handleClick(event) {
    event.stopPropagation();
    add();
  }

  return (
    <Fab aria-label="Add" onClick={handleClick}>
      <AddIcon />
    </Fab>
  );
}

export default AddQuestion;