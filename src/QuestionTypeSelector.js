// React & Material UI
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// Material UI components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// App custom
import myTheme from "./Theme.js";

const theme = createMuiTheme(myTheme);
const componentStyleOverrides = {
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
};
const useStyles = makeStyles(componentStyleOverrides);
const options = [
  'Short Answer',
  'Multiple Choice',
];

function QuestionTypeSelector(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setAnchorEl(null);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Please choose a question type"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Please choose a question type" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default QuestionTypeSelector;