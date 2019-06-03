// React & Material UI
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// App custom
import Option from "./Shared/Option";
import AddOther from "./Shared/AddOther";
import Other from "./Shared/Other";
import { uuid as genUuid } from "../../Utils/Math";
import { cloneArray } from "../../Utils/Array";
import Footer from "./Shared/Footer";
import QuestionChanger from "./Shared/QuestionChanger";
// import CustomTheme from "../../Theme";
import CustomStyles from "./Shared/Styles";

const componentStyleOverrides = {
  ...CustomStyles
};
const useStyles = makeStyles(componentStyleOverrides);

function Checkboxes(props) {
  const { uuid, hasFocus, wasFocused, remove, dupe, changeType } = props;
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

  function handleChangeType(newType) {
    changeType(newType, uuid);
  }

  return (
    <Paper
      className={
        hasFocus === true
          ? [classes.paper, classes.paperActive].join(" ")
          : classes.paper
      }
      onClick={handleFocus}
    >
      <QuestionChanger type="Checkboxes" changeType={handleChangeType} />
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

Checkboxes.propTypes = {
  uuid: PropTypes.string.isRequired,
  hasFocus: PropTypes.bool.isRequired,
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Checkboxes;
