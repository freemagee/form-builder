import React, { useEffect } from 'react';
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

import { useInput } from '../../Hooks/textInputHook';
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
  let currentValue = props.value;
  const classes = useStyles();
  const setOptionValue = (value) => {
    currentValue = value;
  };
  const { bind } = useInput(props.value, setOptionValue);

  useEffect(() => {
    props.cb(currentValue, props.uuid);
  });

  return (
    <Box className={classes.optionContainer}>
      <Radio
        color="default"
        disabled
      />
      <TextField
        classes={{ root: classes.optionName }}
        placeholder="Option 1"
        {...bind}
      />
    </Box>
  );
};

export default Option;