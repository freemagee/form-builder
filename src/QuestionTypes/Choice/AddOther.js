// React & Material UI
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
  textInline: {
    alignSelf: "center",
    margin: "0 10px"
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function AddOther(props) {
  const [newOption, other, hasOther] = [props.new, props.other, props.hasOther];
  const classes = useStyles();

  return (
    <Box className={classes.optionContainer}>
      <Radio color="default" disabled />
      <TextField
        classes={{ root: classes.optionAdd }}
        placeholder="Add option"
        onClick={newOption}
      />
      {hasOther === false && (
        <Typography className={classes.textInline}>or</Typography>
      )}
      {hasOther === false && (
        <Button color="primary" className={classes.button} onClick={other}>
          Add 'other'
        </Button>
      )}
    </Box>
  );
}

export default AddOther;