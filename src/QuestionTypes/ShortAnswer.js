// React & Material UI
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// Material UI components
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
// App custom
import Footer from "./Shared/Footer";
import myTheme from "../Theme.js";

const theme = createMuiTheme(myTheme);
const componentStyleOverrides = {
  title: {
    "& .MuiFormLabel-root": {
      fontSize: theme.typography.pxToRem(24)
    },
    "& .MuiInputBase-input": {
      fontSize: theme.typography.pxToRem(24)
    },
    "& .MuiInputLabel-asterisk": {
      color: theme.palette.error.main
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    borderLeft: `3px solid transparent`
  },
  paperActive: {
    boxShadow: theme.shadows[7],
    borderLeft: `3px solid ${theme.palette.primary.main}`
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "50%",
    "& .MuiInputBase-input": {
      fontSize: theme.typography.pxToRem(14)
    }
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`
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
    <ThemeProvider theme={theme}>
      <Paper
        className={
          hasFocus === true
            ? [classes.paper, classes.paperActive].join(" ")
            : classes.paper
        }
        onClick={handleFocus}
      >
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
    </ThemeProvider>
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
