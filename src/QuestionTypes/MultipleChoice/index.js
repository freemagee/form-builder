// React & Material UI
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// Material UI components
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
// App custom
import Option from "./Option";
import AddOther from "./AddOther";
import Other from "./Other";
import { uuid as genUuid } from "../../Utils/Math";
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

function MultipleChoice(props) {
  const { uuid, hasFocus, wasFocused, remove, dupe } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    required: false,
    sensitive: false,
    hasOther: false
  });
  const [options, setOptions] = useState([
    {
      value: "Option 1",
      uuid: genUuid()
    }
  ]);
  const [count, setOptionsCount] = useState(1);
  const handleChange = name => event => {
    if (name !== "required") {
      const current = state[name];

      setState({ ...state, [name]: !current });
    } else {
      setState({ ...state, [name]: event.target.checked });
    }
  };
  const handleFocus = event => {
    event.stopPropagation();
    wasFocused(uuid);
  };
  const handleAddNewOption = () => {
    setOptions([
      ...options,
      {
        value: `Option ${count + 1}`,
        uuid: genUuid()
      }
    ]);
    setOptionsCount(count => count + 1);
  };
  const handleAddOther = () => {
    setState({ ...state, hasOther: true });
  };
  const handleRemoveOption = uuid => {
    const optionsClone = cloneArray(options);
    const index = optionsClone.findIndex(option => option["uuid"] === uuid);

    if (count > 1 && index !== -1) {
      optionsClone.splice(index, 1);
      setOptions(optionsClone);
      setOptionsCount(count => count - 1);
    }
  };
  const handleSetOptionValue = (value, uuid) => {
    const optionsClone = cloneArray(options);
    const index = optionsClone.findIndex(option => option["uuid"] === uuid);
    const currentValue = optionsClone[index].value;

    if (currentValue !== value && index !== -1) {
      optionsClone[index].value = value;
      setOptions(optionsClone);
    }
  };
  const handleRemoveQuestion = event => {
    event.stopPropagation();
    remove(uuid);
  };
  const handleDupeQuestion = event => {
    event.stopPropagation();
    dupe(uuid);
  };
  const renderOptionsList = options.map(option => {
    return (
      <Option
        value={option.value}
        key={option.uuid}
        uuid={option.uuid}
        set={handleSetOptionValue}
        remove={handleRemoveOption}
      />
    );
  });

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
            label="Description"
            margin="normal"
            fullWidth
          />
          {renderOptionsList}
          {state.hasOther && (
            <Other remove={() => setState({ ...state, hasOther: false })} />
          )}
          <AddOther
            new={handleAddNewOption}
            other={handleAddOther}
            hasOther={state.hasOther}
          />
          <Box className={classes.footer}>
            <Tooltip title="Duplicate">
              <IconButton
                className={classes.button}
                aria-label="Duplicate"
                onClick={handleDupeQuestion}
              >
                <DuplicateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sensitive answer">
              <IconButton
                className={classes.button}
                aria-label="Sensitive answer"
                onClick={handleChange("sensitive")}
              >
                {state.sensitive && <LockIcon color="secondary" />}
                {!state.sensitive && <LockIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                className={classes.button}
                aria-label="Delete"
                onClick={handleRemoveQuestion}
              >
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
                  onChange={handleChange("required")}
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
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired
};

export default MultipleChoice;
