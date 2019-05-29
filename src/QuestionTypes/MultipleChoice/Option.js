// React & Material UI
import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
// Material UI components
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
// App custom
import myTheme from "../../Theme.js";

const theme = createMuiTheme(myTheme);
const componentStyleOverrides = {
  optionContainer: {
    display: "flex",
    marginTop: theme.spacing(2)
  },
  optionName: {
    flex: "1 0 auto",
    "& .MuiInputBase-root": {
      marginTop: "10px"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: theme.palette.grey[300]
    },
    "& .MuiInputBase-input": {
      paddingTop: 0
    }
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function Option(props) {
  const [value, uuid, cb] = [props.value, props.uuid, props.cb];
  const classes = useStyles();
  const setOptionValue = event => {
    cb(event.target.value, uuid);
  };

  return (
    <Box className={classes.optionContainer}>
      <Radio color="default" disabled />
      <TextField
        value={value}
        classes={{ root: classes.optionName }}
        placeholder="Option 1"
        onChange={setOptionValue}
      />
    </Box>
  );
}

export default Option;
