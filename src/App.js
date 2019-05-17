import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import QuestionType from './QuestionType';
import Container from '@material-ui/core/Container';

const MyContainer = withStyles({
  '@global': {
    body: {
      margin: 0,
      backgroundColor: '#fafafa',
    },
  },
  root: {
    marginTop: '4rem',
  },
})(Container);

function App() {
  return (
    <MyContainer component="main" maxWidth="md">
      <QuestionType />
    </MyContainer>
  )
}

export default App;