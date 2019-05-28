import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { uuid } from "./Utils/Math.uuid";
import AddQuestion from "./AddQuestion";
import ShortAnswer from "./QuestionTypes/ShortAnswer";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import Container from "@material-ui/core/Container";

// 'Extend' the default styles
const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(8)
  }
}));

function App() {
  const classes = useStyles();

  const [questionList, setQuestionList] = useState({
    questions: [
      {
        type: "ShortAnswer",
        uuid: uuid(),
        active: false
      }
    ]
  });

  const outsideClick = event => {
    event.preventDefault();
    const questions = questionList.questions;

    questions.forEach(question => (question.active = false));
    setQuestionList({ questions: questions });
  };

  const questionIsActive = componentId => {
    const questions = questionList.questions;
    const index = findComponentId(questions, componentId);

    if (index !== -1) {
      // Set all questions to active: false
      questions.forEach(question => (question.active = false));
      // Set the clicked question to active: true
      questions[index].active = true;
      setQuestionList({ questions: questions });
    }
  };

  const addNewQuestion = (type) => {
    const questions = questionList.questions;

    questions.push({
      type: type,
      uuid: uuid(),
      active: false
    });
    setQuestionList({ questions: questions });
  };

  const questionTypeList = questionList.questions.map(question => {
    switch (question.type) {
      case "ShortAnswer":
        return (
          <ShortAnswer
            key={question.uuid}
            uuid={question.uuid}
            hasFocus={question.active}
            wasFocused={questionIsActive}
          />
        );
      case "MultipleChoice":
        return (
          <MultipleChoice
            key={question.uuid}
            uuid={question.uuid}
            hasFocus={question.active}
            wasFocused={questionIsActive}
          />
        );
      default:
        return <p>No question type found</p>;
    }
  });

  const findComponentId = (questions, id) => {
    const index = questions.findIndex(question => question.uuid === id);

    if (index >= 0) {
      return index;
    }

    return -1;
  };

  return (
    <Container
      className={classes.container}
      maxWidth="md"
      onClick={outsideClick}
    >
      <AddQuestion type="ShortAnswer" add={addNewQuestion} />
      <AddQuestion type="MultipleChoice" add={addNewQuestion} />
      {questionTypeList}
    </Container>
  );
}

export default App;
