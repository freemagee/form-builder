// React & Material UI
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// App custom
import QuestionTypeSelector from "./QuestionTypeSelector";
import ShortAnswer from "./QuestionTypes/Text/ShortAnswer";
import Paragraph from "./QuestionTypes/Text/Paragraph";
import MultipleChoice from "./QuestionTypes/Choice/MultipleChoice";
import Checkboxes from "./QuestionTypes/Choice/Checkboxes";
import CustomTheme from "./Theme";
import { uuid as genUuid } from "./Utils/Math";
import { cloneArray } from "./Utils/Array";

const componentStyleOverrides = {
  container: {
    paddingTop: CustomTheme.spacing(8)
  },
  paper: {
    marginTop: CustomTheme.spacing(4),
    padding: CustomTheme.spacing(4),
    borderLeft: `3px solid transparent`
  }
};
const useStyles = makeStyles(componentStyleOverrides);
const questionTypes = [
  { name: "Short Answer", type: "ShortAnswer" },
  { name: "Paragraph", type: "Paragraph" },
  { name: "Multiple Choice", type: "MultipleChoice" },
  { name: "Checkboxes", type: "Checkboxes" }
];
const questionObj = {
  type: "ShortAnswer",
  id: genUuid(),
  active: false,
  question: "",
  description: "",
  required: false,
  sensitive: false,
  additional: {
    options: [
      {
        value: "Option 1",
        id: genUuid()
      }
    ]
  }
};

function App() {
  const classes = useStyles();
  const [questionList, setQuestionList] = useState([questionObj]);
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
      question => question.id === componentId
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
    const newQuestionObj = {
      ...questionObj,
      type: type,
      id: genUuid()
    };
    setQuestionList([...questionList, newQuestionObj]);
    setQuestionCount(questionCount => questionCount + 1);
  };
  const handleRemoveQuestion = componentId => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.id === componentId
    );

    if (index !== -1) {
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
      question => question.id === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    // Make adjustments to the cloned question obj
    questionClone.id = genUuid();
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
      question => question.id === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    // Make adjustments to the cloned question obj
    questionClone.type = newType;
    // Replace the original question with the clone question
    questionListClone[index] = questionClone;
    setQuestionList(questionListClone);
  };
  const handleQuestionValueChange = (name, value, componentId) => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.id === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    // Make adjustments to the cloned question obj
    questionClone[name] = value;
    // Replace the original question with the clone question
    questionListClone[index] = questionClone;
    setQuestionList(questionListClone);
  };
  const handleChoiceOptions = (newOptions, componentId) => {
    const questionListClone = cloneArray(questionList);
    const index = questionListClone.findIndex(
      question => question.id === componentId
    );
    const questionClone = Object.assign({}, questionListClone[index]);

    // Make adjustments to the cloned question obj
    questionClone.additional.options = newOptions;
    // Replace the original question with the clone question
    questionListClone[index] = questionClone;
    setQuestionList(questionListClone);
  };
  const questionTypeList = questionList.map(question => {
    const propsBootstrap = {
      key: question.id,
      wasFocused: questionIsActive,
      remove: handleRemoveQuestion,
      dupe: handleDupeQuestion,
      changeQuestionValue: handleQuestionValueChange,
      changeType: handleChangeType,
      core: {
        ...question
      }
    };

    switch (question.type) {
      case "ShortAnswer":
        return <ShortAnswer {...propsBootstrap} />;
      case "Paragraph":
        return <Paragraph {...propsBootstrap} />;
      case "MultipleChoice":
        return (
          <MultipleChoice
            {...propsBootstrap}
            changeOptions={handleChoiceOptions}
          />
        );
      case "Checkboxes":
        return (
          <Checkboxes {...propsBootstrap} changeOptions={handleChoiceOptions} />
        );
      default:
        return <p>Error! No matching question type found</p>;
    }
  });
  const NoQuestions = () => {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h4">No questions!</Typography>
        <Typography>Please add a question type to continue</Typography>
      </Paper>
    );
  };

  return (
    <div onClick={outsideClick}>
      <Container className={classes.container} maxWidth="md">
        <QuestionTypeSelector types={questionTypes} add={handleNewQuestion} />
        {questionTypeList}
        {questionCount === 0 && <NoQuestions />}
      </Container>
    </div>
  );
}

export default App;
