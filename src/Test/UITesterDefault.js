import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// 'Extend' the default styles
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
}));

function UITesterDefault() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <Typography variant="h2" gutterBottom>
          UI Test Default Theme
        </Typography>
        <Tooltip title="Hello!">
          <Button>Say</Button>
        </Tooltip>
        <FormControlLabel
          control={
            <Switch
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
              color="primary"
            />
          }
          label="Switched"
        />
      </Paper>
    </Container>
  );
}

export default UITesterDefault;
