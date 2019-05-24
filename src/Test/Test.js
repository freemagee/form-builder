import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
  },
});

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: theme.typography.pxToRem(24),
  },
}));

function Palette() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Button className={classes.button} color="primary">My Custom Button!</Button>
    </ThemeProvider>
  );
}

export default Palette;