import React from "react";
import PropTypes from "prop-types";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DuplicateIcon from "@material-ui/icons/AddToPhotos";
import LockIcon from "@material-ui/icons/Lock";

import Option from "./Option";
import AddOther from "./AddOther";
import { uuid } from "../../Utils/Math";
import { cloneArray } from "../../Utils/Array";
import myTheme from "../../Theme.js";

const theme = createMuiTheme(myTheme);

const componentStyleOverrides = {
  title: {
    "& .MuiFormLabel-root": {
      fontSize: theme.typography.pxToRem(24)
    },
    "& .MuiInputBase-input": {
      fontSize: theme.typography.pxToRem(24)
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
  textInline: {
    alignSelf: "center",
    margin: "0 10px"
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

function findIndex(array, key, needle) {
  const index = array.findIndex(item => item[key] === needle);

  if (index >= 0) {
    return index;
  }

  return -1;
}

function MultipleChoice(props) {
  const classes = useStyles();

  const setOptionValue = (value, uuid) => {
    const count = optionsList.optionCount;
    const options = cloneArray(optionsList.options);
    const index = findIndex(options, "uuid", uuid);
    options[index].value = value;
    setOptionsList({ optionCount: count, options: options });
  };

  const [state, setState] = React.useState({
    required: false
  });

  const [optionsList, setOptionsList] = React.useState({
    optionCount: 1,
    options: [
      {
        value: "Option 1",
        uuid: uuid()
      }
    ]
  });

  const handleRequired = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleFocus = event => {
    event.stopPropagation();
    props.wasFocused(props.uuid);
  };

  const handleAddNewOption = event => {
    const options = cloneArray(optionsList.options);
    const newCount = optionsList.optionCount + 1;

    options.push({
      value: `Option ${newCount}`,
      uuid: uuid()
    });
    setOptionsList({ optionCount: newCount, options: options });
  };

  // const handleAddOther = event => {
  //   const options = optionsList.options;

  //   options.push({
  //     value: "Other...",
  //     uuid: uuid()
  //   });
  //   setOptionsList({ options: options });
  // };

  const renderOptionsList = optionsList.options.map(option => {
    return (
      <Option
        value={option.value}
        key={option.uuid}
        uuid={option.uuid}
        cb={setOptionValue}
      />
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper
        className={
          props.hasFocus === true
            ? [classes.paper, classes.paperActive].join(" ")
            : classes.paper
        }
        onClick={handleFocus}
      >
        <form className={classes.form} noValidate>
          <TextField
            id="title"
            classes={{ root: classes.title }}
            label="Title"
            required
            fullWidth
            autoFocus
          />
          <TextField
            id="description"
            label="Description"
            margin="normal"
            fullWidth
          />
          {renderOptionsList}
          <AddOther cb={handleAddNewOption} />
          <Box className={classes.footer}>
            <Tooltip title="Duplicate">
              <IconButton className={classes.button} aria-label="Duplicate">
                <DuplicateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sensitive answer">
              <IconButton
                className={classes.button}
                aria-label="Sensitive answer"
              >
                <LockIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton className={classes.button} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Divider className={classes.vertDivider} />
            <FormControlLabel
              value="required"
              control={
                <Switch
                  color="primary"
                  checked={state.required}
                  onChange={handleRequired("required")}
                  value="required"
                />
              }
              label="Required"
              labelPlacement="start"
            />
          </Box>
        </form>
      </Paper>
    </ThemeProvider>
  );
}

MultipleChoice.propTypes = {
  uuid: PropTypes.string.isRequired,
  hasFocus: PropTypes.bool.isRequired,
  wasFocused: PropTypes.func.isRequired
};

export default MultipleChoice;
