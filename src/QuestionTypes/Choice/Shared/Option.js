// React & Material UI
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Box from "@material-ui/core/Box";
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// App custom
import CustomTheme from "../../../Theme";

const componentStyleOverrides = {
  optionContainer: {
    display: "flex",
    marginTop: CustomTheme.spacing(2)
  },
  optionName: {
    flex: "1 0 auto",
    "& .MuiInputBase-root": {
      marginTop: "10px"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: CustomTheme.palette.grey[300]
    },
    "& .MuiInputBase-input": {
      paddingTop: 0
    }
  },
  button: {
    "&:hover": {backgroundColor: "transparent"}
  },
};
const useStyles = makeStyles(componentStyleOverrides);

function Option(props) {
  const {type, value, id, set, remove} = props;
  const classes = useStyles();

  return (
    <Box className={classes.optionContainer}>
      {type === "MultipleChoice" && (
        <Radio color="default" disabled />
      )}
      {type === "Checkboxes" && (
        <Checkbox color="default" disabled />
      )}
      <TextField
        defaultValue={value}
        classes={{ root: classes.optionName }}
        placeholder="Option 1"
        onBlur={(event) => set(event.target.value, id)}
      />
      <IconButton
        className={classes.button}
        aria-label="Remove option"
        onClick={() => remove(id)}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default Option;
