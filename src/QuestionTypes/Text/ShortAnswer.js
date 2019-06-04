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
import CustomStyles from "./Shared/Styles";

const componentStyleOverrides = {
  ...CustomStyles,
  input: {
    width: "40%"
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function ShortAnswer(props) {
  const { core, wasFocused, remove, dupe, changeQuestionValue, changeType } = props;
  const classes = useStyles();

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
      <QuestionChanger type="ShortAnswer" changeType={handleChangeType} />
      <form className={classes.form} noValidate>
        <TextField
          name="question"
          defaultValue={core.question}
          id="question"
          classes={{ root: classes.title }}
          label="Question"
          onBlur={(event) => handleChangeValue(event.target.name, event.target.value)}
          required
          fullWidth
          autoFocus
        />
        <TextField
          name="description"
          defaultValue={core.description}
          id="description"
          label="Description (optional)"
          onBlur={(event) => handleChangeValue(event.target.name, event.target.value)}
          margin="normal"
          fullWidth
        />
        <Input
          defaultValue="Short answer text"
          className={classes.input}
          disabled
          inputProps={{
            "aria-label": "Short answer text"
          }}
        />
        <Footer remove={remove} dupe={dupe} id={core.id} required={core.required} sensitive={core.sensitive} change={handleChangeValue} />
      </form>
    </Paper>
  );
}

ShortAnswer.propTypes = {
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  changeQuestionValue: PropTypes.func.isRequired,
  core: PropTypes.object.isRequired
};

export default ShortAnswer;
