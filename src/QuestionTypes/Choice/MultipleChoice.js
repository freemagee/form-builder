// React & Material UI
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// App custom
import Option from "./Option";
import AddOther from "./AddOther";
import Other from "./Other";
import { uuid as genUuid } from "../../Utils/Math";
import { cloneArray } from "../../Utils/Array";
import Footer from "./Shared/Footer";
import CustomTheme from "../../Theme";

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
  textInline: {
    alignSelf: "center",
    margin: "0 10px"
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

function MultipleChoice(props) {
  const { uuid, hasFocus, wasFocused, remove, dupe } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    hasOther: false
  });
  const [options, setOptions] = useState([
    {
      value: "Option 1",
      uuid: genUuid()
    }
  ]);
  const [count, setOptionsCount] = useState(1);
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
  const handleChange = name => event => {
    props.changeQuestionValue(name, event.target.value, uuid);
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
          value={props.question}
          id="question"
          classes={{ root: classes.title }}
          label="Question"
          onChange={handleChange("question")}
          required
          fullWidth
          autoFocus
        />
        <TextField
          value={props.description}
          id="description"
          label="Description (optional)"
          onChange={handleChange("description")}
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
        <Footer remove={remove} dupe={dupe} uuid={uuid} />
      </form>
    </Paper>
  );
}

MultipleChoice.propTypes = {
  uuid: PropTypes.string.isRequired,
  hasFocus: PropTypes.bool.isRequired,
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default MultipleChoice;
