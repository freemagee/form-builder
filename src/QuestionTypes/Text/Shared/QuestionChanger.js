// React & Material UI
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ShortTextIcon from "@material-ui/icons/ShortText";
import NotesIcon from "@material-ui/icons/Notes";
// App custom
import CustomTheme from "../../../Theme";

const componentStyleOverrides = {
  container: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {},
  icon: {
    marginRight: CustomTheme.spacing(2)
  },
  menuItem: {
    fontSize: CustomTheme.typography.pxToRem(14),
    fontWeight: CustomTheme.typography.fontWeightMedium,
    textTransform: "uppercase"
  },
  listItem: {
    minWidth: "auto"
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function QuestionTypeChanger(props) {
  const { type, changeType } = props;
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
  const startIndex = findTypeIndex(type);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(startIndex);
  const renderOptions = options.map((option, index) => {
    return (
      <MenuItem
        key={option.name}
        selected={index === selectedIndex}
        onClick={event => handleMenuItemClick(event, index)}
        classes={{ root: classes.menuItem }}
      >
        <ListItemIcon classes={{ root: classes.listItem }}>
          {option.icon}
        </ListItemIcon>
        {option.name}
      </MenuItem>
    );
  });

  function findTypeIndex(needle) {
    return options.findIndex(option => option.type === needle);
  }

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    event.stopPropagation();
    setSelectedIndex(index);
    setAnchorEl(null);
    changeType(options[index].type);
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

QuestionTypeChanger.propTypes = {
  type: PropTypes.string.isRequired
};

export default QuestionTypeChanger;
