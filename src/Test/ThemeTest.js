import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[200],
      main: blue[500],
      dark: blue[900]
    }
  },
});

const newThemeStylee = {
  root: {
    flexGrow: 1,
    borderTop: `3px solid ${theme.palette.primary.main}`
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
};

const useStyles = makeStyles(newThemeStylee);

function CustomStyles() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default CustomStyles;
