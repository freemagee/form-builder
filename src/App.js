import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// import AddQuestion from "./AddQuestion";
import QuestionTypeSelector from "./QuestionTypeSelector";
import ShortAnswer from "./QuestionTypes/ShortAnswer";
import Paragraph from "./QuestionTypes/Paragraph";
import MultipleChoice from "./QuestionTypes/MultipleChoice/";
import Container from "@material-ui/core/Container";

import { uuid as genUuid } from "./Utils/Math";
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
      uuid: genUuid(),
      active: false
    }
  ]);
  const [questionCount, setQuestionCount] = useState(1);
  const outsideClick = event => {
    event.preventDefault();
    const questionListClone = cloneArray(questionList);

    questionListClone.forEach(question => (question.active = false));
    setQuestionList(questionListClone);
  };

  const questionIsActive = componentId => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.uuid === componentId
    );

    if (index !== -1) {
      // Set all questions to active: false
      questionListClone.forEach(question => (question.active = false));
      // Set the clicked question to active: true
      questionListClone[index].active = true;
      setQuestionList(questionListClone);
    }
  };

  const handleNewQuestion = type => {
    setQuestionList([
      ...questionList,
      {
        type: type,
        uuid: genUuid(),
        active: false
      }
    ]);
    setQuestionCount(questionCount => questionCount + 1);
  };

  const handleRemoveQuestion = componentId => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.uuid === componentId
    );

    if (questionCount > 1 && index !== -1) {
      questionListClone.splice(index, 1);
      setQuestionList(questionListClone);
      setQuestionCount(questionCount => questionCount - 1);
    }
  };

  // TODO: This is gonna be a hard one!
  // Need to know complete overview of the question type being cloned and all it's data
  const handleDupeQuestion = componentId => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.uuid === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    questionClone.uuid = genUuid();
    questionClone.active = false;
    questionListClone.splice(index + 1, 0, questionClone);
    setQuestionList(questionListClone);
    setQuestionCount(questionCount => questionCount + 1);
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
            remove={handleRemoveQuestion}
            dupe={handleDupeQuestion}
          />
        );
      case "Paragraph":
          return (
            <Paragraph
              key={question.uuid}
              uuid={question.uuid}
              hasFocus={question.active}
              wasFocused={questionIsActive}
              remove={handleRemoveQuestion}
              dupe={handleDupeQuestion}
            />
          );
      case "MultipleChoice":
        return (
          <MultipleChoice
            key={question.uuid}
            uuid={question.uuid}
            hasFocus={question.active}
            wasFocused={questionIsActive}
            remove={handleRemoveQuestion}
          />
        );
      default:
        return <p>Error! No matching question type found</p>;
    }
  });

  return (
    <Container
      className={classes.container}
      maxWidth="md"
      onClick={outsideClick}
    >
      <QuestionTypeSelector add={handleNewQuestion} />
      {questionTypeList}
    </Container>
  );
}

export default App;
