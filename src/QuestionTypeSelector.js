// React & Material UI
import React from "react";
import PropTypes from "prop-types";
// Material UI components
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import RadioButtonIcon from "@material-ui/icons/RadioButtonChecked";
import ShortTextIcon from "@material-ui/icons/ShortText";
import NotesIcon from "@material-ui/icons/Notes";
import CheckboxIcon from "@material-ui/icons/CheckBox";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node.isRequired
};

function QuestionTypeSelector(props) {
  const { types, add } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    event.stopPropagation();
    setSelectedIndex(index);
    setAnchorEl(null);
    add(types[index].type);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const renderOptions = types.map((option, index) => {
    let icon = null;

    switch (option.type) {
      case "ShortAnswer":
        icon = <ShortTextIcon />;
        break;
      case "Paragraph":
        icon = <NotesIcon />;
        break;
      case "MultipleChoice":
        icon = <RadioButtonIcon />;
        break;
      case "Checkboxes":
        icon = <CheckboxIcon />;
        break;
      default:
        icon = null;
    }

    return (
      <MenuItem
        key={option.name}
        selected={index === selectedIndex}
        onClick={event => handleMenuItemClick(event, index)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        {option.name}
      </MenuItem>
    );
  });

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" onClick={handleClickListItem}>
              <AddIcon />
            </IconButton>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {renderOptions}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}

export default QuestionTypeSelector;
