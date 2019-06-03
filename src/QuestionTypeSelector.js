// React & Material UI
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import Divider from "@material-ui/core/Divider";
import RadioButtonIcon from "@material-ui/icons/RadioButtonChecked";
import ShortTextIcon from "@material-ui/icons/ShortText";
import NotesIcon from "@material-ui/icons/Notes";
import CheckboxIcon from "@material-ui/icons/CheckBox";

const componentStyleOverrides = {
  root: {
    width: "100%"
  }
};
const useStyles = makeStyles(componentStyleOverrides);
const options = [
  { name: "Short Answer", type: "ShortAnswer" },
  { name: "Paragraph", type: "Paragraph" },
  { name: "Multiple Choice", type: "MultipleChoice" },
  { name: "Checkboxes", type: "Checkboxes" }
];

function QuestionTypeSelector(props) {
  const { add } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleClickListItem(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuItemClick(event, index) {
    event.stopPropagation();
    setSelectedIndex(index);
    setAnchorEl(null);
    add(options[index].type);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const renderOptions = options.map((option, index) => {
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
    <div className={classes.root}>
      <Fab aria-label="Add" onClick={handleClickListItem}>
        <AddIcon />
      </Fab>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {renderOptions}
      </Menu>
    </div>
  );
}

export default QuestionTypeSelector;
