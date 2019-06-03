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
  const { uuid, hasFocus, wasFocused, remove, dupe, changeType } = props;
  const classes = useStyles();
  const handleChange = name => event => {
    props.changeQuestionValue(name, event.target.value, uuid);
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
        <Input
          value="Long answer text"
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
