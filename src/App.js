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
        uuid: uuid(),
        active: false
      }
    ]);
  };

  // Remove function is not working 😭
  const handleRemoveQuestion = componentId => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.uuid === componentId
    );

    if (index !== -1) {
      questionListClone.splice(index, 1);
      setQuestionList(questionListClone);
    }
  };

  // const handleRemoveQuestion = (event, componentId) => {
  //   const questionListClone = cloneArray(questionList);

  //   questionListClone.pop();
  //   setQuestionList(questionListClone);
  // };

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

  // return (
  //   <MultipleChoice
  //     key="123"
  //     uuid="123"
  //     hasFocus={ false }
  //     wasFocused={questionIsActive}
  //   />
  // );

  return (
    <Container
      className={classes.container}
      maxWidth="md"
      onClick={outsideClick}
    >
      <AddQuestion type="ShortAnswer" add={handleNewQuestion} />
      <AddQuestion type="MultipleChoice" add={handleNewQuestion} />
      {questionTypeList}
    </Container>
  );
}

export default App;
