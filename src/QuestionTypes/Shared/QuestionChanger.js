// React & Material UI
import React, { useState } from "react";
// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ShortTextIcon from "@material-ui/icons/ShortText";
import NotesIcon from "@material-ui/icons/Notes";
// App custom
import CustomTheme from "../../Theme";

const componentStyleOverrides = {
  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {},
  icon: {
    marginRight: CustomTheme.spacing(2)
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function QuestionTypeChanger(props) {
  const classes = useStyles();
  const options = [
    {
      name: "Short Answer",
      type: "ShortAnswer",
      icon: <ShortTextIcon className={classes.icon} />
    },
    {
      name: "Paragraph",
      type: "Paragraph",
      icon: <NotesIcon className={classes.icon} />
    }
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const renderOptions = options.map((option, index) => {
    return (
      <MenuItem
        key={option.name}
        selected={index === selectedIndex}
        onClick={event => handleMenuItemClick(event, index)}
      >
        <ListItemIcon>{option.icon}</ListItemIcon>
        {option.name}
      </MenuItem>
    );
  });

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
    <div className={classes.container}>
      <Button
        variant="outlined"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClickListItem}
      >
        {options[selectedIndex].icon}
        {options[selectedIndex].name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderOptions}
      </Menu>
    </div>
  );
}

// Footer.propTypes = {
//   uuid: PropTypes.string.isRequired,
//   remove: PropTypes.func.isRequired,
//   dupe: PropTypes.func.isRequired
// };

export default QuestionTypeChanger;
