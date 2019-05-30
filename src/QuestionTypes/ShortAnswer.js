// React & Material UI
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
// App custom
import Footer from "./Shared/Footer";
import QuestionChanger from "./Shared/QuestionChanger";
import CustomTheme from "../Theme";

const componentStyleOverrides = {
  title: {
    "& .MuiFormLabel-root": {
      fontSize: CustomTheme.typography.pxToRem(24)
    },
    "& .MuiInputBase-input": {
      fontSize: CustomTheme.typography.pxToRem(24)
    },
    "& .MuiInputLabel-asterisk": {
      color: CustomTheme.palette.error.main
    }
  },
  paper: {
    marginTop: CustomTheme.spacing(4),
    paddingTop: CustomTheme.spacing(4),
    paddingLeft: CustomTheme.spacing(4),
    paddingRight: CustomTheme.spacing(4),
    borderLeft: `3px solid transparent`
  },
  paperActive: {
    boxShadow: CustomTheme.shadows[7],
    borderLeft: `3px solid ${CustomTheme.palette.primary.main}`
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  input: {
    marginTop: CustomTheme.spacing(1),
    marginBottom: CustomTheme.spacing(1),
    width: "50%",
    "& .MuiInputBase-input": {
      fontSize: CustomTheme.typography.pxToRem(14)
    }
  },
  button: {
    marginLeft: CustomTheme.spacing(1),
    marginRight: CustomTheme.spacing(1)
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: CustomTheme.spacing(6),
    padding: CustomTheme.spacing(2),
    borderTop: `1px solid ${CustomTheme.palette.grey[300]}`
  },
  vertDivider: {
    width: 1,
    height: 48
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function ShortAnswer(props) {
  const { uuid, hasFocus, wasFocused, remove, dupe } = props;
  const classes = useStyles();
  const handleFocus = event => {
    event.stopPropagation();
    wasFocused(uuid);
  };

  return (
    <Paper
      className={
        hasFocus === true
          ? [classes.paper, classes.paperActive].join(" ")
          : classes.paper
      }
      onClick={handleFocus}
    >
      <QuestionChanger />
      <form className={classes.form} noValidate>
        <TextField
          id="question"
          classes={{ root: classes.title }}
          label="Question"
          required
          fullWidth
          autoFocus
        />
        <TextField
          id="description"
          label="Description (optional)"
          margin="normal"
          fullWidth
        />
        <Input
          value="Short answer text"
          className={classes.input}
          disabled
          inputProps={{
            "aria-label": "Description"
          }}
        />
        <Footer remove={remove} dupe={dupe} uuid={uuid} />
      </form>
    </Paper>
  );
}

ShortAnswer.propTypes = {
  uuid: PropTypes.string.isRequired,
  hasFocus: PropTypes.bool.isRequired,
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired
};

export default ShortAnswer;
