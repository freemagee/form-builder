import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { uuid } from "./Utils/Math.uuid";
import AddQuestion from "./AddQuestion";
import QuestionType from "./QuestionType";
import Container from "@material-ui/core/Container";

// 'Extend' the default styles
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8)
  }
}));

function App() {
  const classes = useStyles();

  const [clickOutside, setClickOutside] = useState({ clickOutside: false });

  const [questionList, setQuestionList] = useState({
    questions: [
      {
        type: "Text",
        uuid: uuid(),
        active: false
      }
    ]
  });

  const outsideClick = event => {
    event.preventDefault();
    setClickOutside({ clickOutside: true });
  };

  const childIsActive = () => {
    setClickOutside({ clickOutside: false });
  };

  const addNewQuestion = () => {
    const questions = questionList.questions;

    questions.push({
      type: "Text",
      uuid: uuid(),
      active: false
    });
    setQuestionList({ questions: questions });
  };

  const questionTypeList = questionList.questions.map(question => {
    return (
      <QuestionType
        key={question.uuid}
        outside={clickOutside}
        isActive={childIsActive}
      />
    );
  });

  return (
    <Container
      className={classes.container}
      maxWidth="md"
      onClick={outsideClick}
    >
      <AddQuestion add={addNewQuestion} />
      {questionTypeList}
    </Container>
  );
}

export default App;
