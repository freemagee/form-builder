// React & Material UI
import React from "react";
// import PropTypes from "prop-types";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
// import { ThemeProvider } from "@material-ui/styles";
// Material UI components
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import RadioButtonIcon from "@material-ui/icons/RadioButtonChecked";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ShortTextIcon from "@material-ui/icons/ShortText";
// App custom
// import myTheme from "./Theme.js";

// const theme = createMuiTheme(myTheme);
const componentStyleOverrides = {
  root: {
    width: "100%",
  }
};
const useStyles = makeStyles(componentStyleOverrides);
const options = [
  { name: "Short Answer", type: "ShortAnswer" },
  { name: "Multiple Choice", type: "MultipleChoice" }
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
      case "MultipleChoice":
        icon = <RadioButtonIcon />;
        break;
      default:
        icon = null;
    }

    return (
      <MenuItem
        key={option.name}
        selected={index === selectedIndex}
        onClick={(event) => handleMenuItemClick(event, index)}
      >
        <ListItemIcon>
          {icon}
        </ListItemIcon>
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

  // return (
  //   <div className={classes.root}>
  //     <List component="nav">
  //       <ListItem
  //         button
  //         aria-haspopup="true"
  //         aria-controls="lock-menu"
  //         aria-label="Please choose a question type"
  //         onClick={handleClickListItem}
  //       >
  //         <ListItemText primary="Please choose a question type" secondary={options[selectedIndex]} />
  //       </ListItem>
  //     </List>
  //     <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
  //       {options.map((option, index) => (
  //         <MenuItem
  //           key={option}
  //           selected={index === selectedIndex}
  //           onClick={event => handleMenuItemClick(event, index)}
  //         >
  //           <ListItemIcon>
  //             <InboxIcon />
  //           </ListItemIcon>
  //           {option}
  //         </MenuItem>
  //       ))}
  //     </Menu>
  //   </div>
  // );
}

export default QuestionTypeSelector;
