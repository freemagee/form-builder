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
    width: "80%"
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function Paragraph(props) {
  const { uuid, hasFocus, wasFocused, remove, dupe, changeType, question, description, changeQuestionValue } = props;
  const classes = useStyles();
  const handleQuestionChange = event => {
    event.stopPropagation();
    if (event.target.value !== question) {
      changeQuestionValue(event.target.name, event.target.value, uuid);
    }
  };
  const handleDescriptionChange = event => {
    event.stopPropagation();
    if (event.target.value !== description) {
      changeQuestionValue(event.target.name, event.target.value, uuid);
    }
  };

  function handleFocus(event) {
    event.stopPropagation();
    wasFocused(uuid);
  }

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
      <QuestionChanger type="Paragraph" changeType={handleChangeType} />
      <form className={classes.form} noValidate>
        <TextField
          name="question"
          defaultValue={question}
          id="question"
          classes={{ root: classes.title }}
          label="Question"
          onBlur={handleQuestionChange}
          required
          fullWidth
          autoFocus
        />
        <TextField
          name="description"
          defaultValue={description}
          id="description"
          label="Description (optional)"
          onBlur={handleDescriptionChange}
          margin="normal"
          fullWidth
        />
        <Input
          defaultValue="Long answer text"
          className={classes.input}
          disabled
          inputProps={{
            "aria-label": "Long answer text"
          }}
        />
        <Footer remove={remove} dupe={dupe} uuid={uuid} />
      </form>
    </Paper>
  );
}

Paragraph.propTypes = {
  uuid: PropTypes.string.isRequired,
  hasFocus: PropTypes.bool.isRequired,
  wasFocused: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired,
  changeType: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Paragraph;
