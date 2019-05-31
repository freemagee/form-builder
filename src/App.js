// React & Material UI
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Container from "@material-ui/core/Container";
// App custom
import QuestionTypeSelector from "./QuestionTypeSelector";
import ShortAnswer from "./QuestionTypes/ShortAnswer";
import Paragraph from "./QuestionTypes/Paragraph";
import MultipleChoice from "./QuestionTypes/MultipleChoice/";
import CustomTheme from "./Theme";
import { uuid as genUuid } from "./Utils/Math";
import { cloneArray } from "./Utils/Array";

const componentStyleOverrides = {
  container: {
    paddingTop: CustomTheme.spacing(8)
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function App() {
  const classes = useStyles();
  const [questionList, setQuestionList] = useState([
    {
      type: "ShortAnswer",
      uuid: genUuid(),
      active: false,
      question: "",
      description: ""
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
        active: false,
        question: "",
        description: ""
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

    // Make adjustments to the cloned question obj
    questionClone.uuid = genUuid();
    questionClone.active = false;
    // Insert the question clone into the list clone
    questionListClone.splice(index + 1, 0, questionClone);
    // Update state
    setQuestionList(questionListClone);
    setQuestionCount(questionCount => questionCount + 1);
  };

  const handleChangeType = (newType, componentId) => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.uuid === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    // Make adjustments to the cloned question obj
    questionClone.type = newType;
    // Replace the original question with the clone question
    questionListClone[index] = questionClone;
    setQuestionList(questionListClone);
  };

  const handleQuestionValueChange = (name, value, componentId) => {
    //console.log(event.target.value, componentId);

    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.uuid === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    // Make adjustments to the cloned question obj
    questionClone[name] = value;
    // Replace the original question with the clone question
    questionListClone[index] = questionClone;
    setQuestionList(questionListClone);
  };

  const questionTypeList = questionList.map(question => {
    const propsBootstrap = {
      key: question.uuid,
      uuid: question.uuid,
      hasFocus: question.active,
      wasFocused: questionIsActive,
      remove: handleRemoveQuestion,
      dupe: handleDupeQuestion,
      changeQuestionValue: handleQuestionValueChange,
      changeType: handleChangeType,
      question: question.question,
      description: question.description,
    };

    switch (question.type) {
      case "ShortAnswer":
        return (
          <ShortAnswer {...propsBootstrap} />
        );
      case "Paragraph":
        return (
          <Paragraph {...propsBootstrap} />
        );
      case "MultipleChoice":
        return (
          <MultipleChoice {...propsBootstrap} />
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
