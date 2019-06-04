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

function MultipleChoice(props) {
  const {
    core,
    wasFocused,
    remove,
    dupe,
    changeQuestionValue,
    changeType
  } = props;
  const classes = useStyles();
  const [state, setState] = useState({
    hasOther: false
  });
  const [options, setOptions] = useState([
    {
      value: "Option 1",
      id: genUuid()
    }
  ]);
  const [count, setOptionsCount] = useState(1);
  const handleAddNewOption = () => {
    setOptions([
      ...options,
      {
        value: `Option ${count + 1}`,
        id: genUuid()
      }
    ]);
    setOptionsCount(count => count + 1);
  };
  const handleAddOther = () => {
    setState({ ...state, hasOther: true });
  };
  const handleRemoveOption = id => {
    const optionsClone = cloneArray(options);
    const index = optionsClone.findIndex(option => option["id"] === id);

    if (count > 1 && index !== -1) {
      optionsClone.splice(index, 1);
      setOptions(optionsClone);
      setOptionsCount(count => count - 1);
    }
  };
  const handleSetOptionValue = (value, id) => {
    const optionsClone = cloneArray(options);
    const index = optionsClone.findIndex(option => option["id"] === id);
    const currentValue = optionsClone[index].value;

    if (currentValue !== value && index !== -1) {
      optionsClone[index].value = value;
      setOptions(optionsClone);
    }
  };
  const renderOptionsList = options.map(option => {
    return (
      <Option
        type={core.type}
        value={option.value}
        key={option.id}
        id={option.id}
        set={handleSetOptionValue}
        remove={handleRemoveOption}
      />
    );
  });

  function handleChangeValue(name, value) {
    changeQuestionValue(name, value, core.id);
  }

  function handleFocus(event) {
    event.stopPropagation();
    wasFocused(core.id);
  }

  function handleChangeType(newType) {
    changeType(newType, core.id);
  }

  return (
    <Paper
      className={
        core.hasFocus === true
          ? [classes.paper, classes.paperActive].join(" ")
          : classes.paper
      }
      onClick={handleFocus}
    >
      <QuestionChanger type={core.type} changeType={handleChangeType} />
      <form className={classes.form} noValidate>
        <TextField
          name="question"
          defaultValue={core.question}
          id="question"
          classes={{ root: classes.title }}
          label="Question"
          onBlur={event =>
            handleChangeValue(event.target.name, event.target.value)
          }
          required
          fullWidth
          autoFocus
        />
        <TextField
          name="description"
          defaultValue={core.description}
          id="description"
          label="Description (optional)"
          onBlur={event =>
            handleChangeValue(event.target.name, event.target.value)
          }
          margin="normal"
          fullWidth
        />
        {renderOptionsList}
        {state.hasOther && (
          <Other remove={() => setState({ ...state, hasOther: false })} type={core.type} />
        )}
        <AddOther
          type={core.type}
          newOption={handleAddNewOption}
          other={handleAddOther}
          hasOther={state.hasOther}
        />
        <Footer remove={remove} dupe={dupe} id={core.id} required={core.required} sensitive={core.sensitive} change={handleChangeValue} />
      </form>
    </Paper>
  );
}

MultipleChoice.propTypes = {
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  changeQuestionValue: PropTypes.func.isRequired,
  core: PropTypes.object.isRequired
};

export default MultipleChoice;
