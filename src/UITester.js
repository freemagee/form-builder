import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// Define a styles object
const MyButtonstyles = {
  root: {
    backgroundColor: 'red',
    '&:hover': {
      color: 'purple',
    },
  }
};
// Include the styles object
const MyButton = withStyles(MyButtonstyles)(Button);

// Testing custom colours per component

// More concise syntax version
const MyContainer = withStyles({
  root: {
    marginTop: '4rem',
  },
})(Container);

const MyPaper = withStyles({
  root: {
    padding: '1rem',
  },
})(Paper);

const Title = withStyles({
  root: {
    fontSize: '3rem',
  },
})(Typography);

const MyTooltip = withStyles({
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
    fontSize: '16px',
  },
})(Tooltip);

const MySwitch = withStyles({
  switchBase: {
    color: 'silver',
    '&$checked': {
      color: 'red',
    },
    '&$checked + $track': {
      backgroundColor: 'green',
    },
  },
  checked: {},
  track: {},
})(Switch);

function UITester() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <MyContainer>
      <MyPaper>
        <Title variant="h2" gutterBottom>
          UI Test Custom Colours
        </Title>
        <MyTooltip title="Hello!">
          <MyButton>Say</MyButton>
        </MyTooltip>
        <FormControlLabel
          control={
            <MySwitch
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Switched"
        />
      </MyPaper>
    </MyContainer>
  );
}

export default UITester;
