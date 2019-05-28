import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AddQuestion from "./AddQuestion";
import ShortAnswer from "./QuestionTypes/ShortAnswer";
import MultipleChoice from "./QuestionTypes/MultipleChoice/";
import Container from "@material-ui/core/Container";

import { uuid } from "./Utils/Math";
import { cloneArray } from "./Utils/Array";

// 'Extend' the default styles
const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(8)
  }
}));

function App() {
  const classes = useStyles();

  const [questionList, setQuestionList] = useState([
    {
      type: "ShortAnswer",
      uuid: uuid(),
      active: false
    }
  ]);

  const outsideClick = event => {
    event.preventDefault();
    const questionListClone = cloneArray(questionList);

    questionListClone.forEach(question => (question.active = false));
    setQuestionList(questionListClone);
  };

  const questionIsActive = componentId => {
    const questionListClone = cloneArray(questionList);
    const index = findComponentId(questionListClone, componentId);

    if (index !== -1) {
      // Set all questions to active: false
      questionListClone.forEach(question => (question.active = false));
      // Set the clicked question to active: true
      questionListClone[index].active = true;
      setQuestionList(questionListClone);
    }
  };

  const addNewQuestion = (type) => {
    const questionListClone = cloneArray(questionList);

    questionListClone.push({
      type: type,
      uuid: uuid(),
      active: false
    });
    setQuestionList(questionListClone);
  };

  const questionTypeList = questionList.map(question => {
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

  const findComponentId = (array, id) => {
    const index = array.findIndex(item => item.uuid === id);

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
