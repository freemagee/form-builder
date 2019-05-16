import React from 'react';
import UITesterDefault from './UITesterDefault';
import UITester from './UITester';
import UITesterThemed from './UITesterThemed';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <Container component="main" maxWidth="md">
      <UITesterDefault />
      <UITesterThemed />
      <UITester />
    </Container>
  )
}

export default App;