import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import orange from '@material-ui/core/colors/orange';

// New styles that extend the default theme
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.grey[50],
    },
  },
  title: {
    fontSize: theme.typography.pxToRem(42),
  },
  paper: {
    backgroundColor: orange[50],
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
  switchBase: {
    '&$checked': {
      color: orange[500],
    },
    '&$checked + $track': {
      backgroundColor: orange[400],
    },
  },
  track: {},
  checked: {},
  button: {
    backgroundColor: orange[400],
    '&:hover': {
      color: orange[800],
    },
  },
  tooltip: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
    fontSize: '16px',
  }
}));

function UITesterThemed() {
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
        <Typography variant="h2" gutterBottom className={classes.title}>
          UI Test Modified Default Theme
        </Typography>
        <Tooltip title="Hello!" classes={{ tooltip: classes.tooltip }}>
          <Button className={classes.button}>Say</Button>
        </Tooltip>
        <FormControlLabel
          control={
            <Switch
              classes={{
                switchBase: classes.switchBase,
                track: classes.track,
                checked: classes.checked
              }}
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Switched"
        />
      </Paper>
    </Container>
  );
}

export default UITesterThemed;
