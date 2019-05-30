// React & Material UI
import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
// Material UI components
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
// App custom
import CustomTheme from "../../Theme";

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

function Other(props) {
  const [remove] = [props.remove];
  const classes = useStyles();

  return (
    <Box className={classes.optionContainer}>
      <Radio color="default" disabled />
      <TextField
        value="Other..."
        classes={{ root: classes.optionName }}
        placeholder="Other..."
      />
      <IconButton
        className={classes.button}
        aria-label="Remove option"
        onClick={() => remove()}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export default Other;
