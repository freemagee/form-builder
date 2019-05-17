import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DuplicateIcon from '@material-ui/icons/AddToPhotos';

// 'Extend' the default styles
const useStyles = makeStyles(theme => ({
  title: {
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.pxToRem(24),
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: 'green',
    // },
    '& .MuiInputBase-input': {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  paperActive: {
    boxShadow: theme.shadows[7],
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '50%',
    '& .MuiInputBase-input': {
      fontSize: theme.typography.pxToRem(14),
    },
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  vertDivider: {
    width: 1,
    height: 48,
  },
}));

function QuestionType() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    active: false,
    required: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleFocus = event => {
    event.preventDefault();
    setState({ ...state, active: true });
  };

  const formClick = event => {
    event.stopPropagation();
  }

  return (
    <Container>
      <Paper
        className={(state.active === true) ? classes.paperActive : classes.paper}
        onClick={handleFocus}
      >
        <form className={classes.form} onClick={formClick} noValidate>
          <TextField
            id="title"
            classes={{ root: classes.title }}
            label="Title"
            required
            fullWidth
            autoFocus
          />
          <TextField
            id="description"
            label="Description"
            margin="normal"
            fullWidth
          />
          <Input
            value="Short answer text"
            className={classes.input}
            disabled
            inputProps={{
              'aria-label': 'Description',
            }}
          />
          <Box className={classes.footer}>
            <Tooltip title="Duplicate">
              <IconButton className={classes.button} aria-label="Duplicate">
                <DuplicateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton className={classes.button} aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Divider className={classes.vertDivider} />
            <FormControlLabel
              value="required"
              control={
                <Switch
                  color="primary"
                  checked={state.required}
                  onChange={handleChange('required')}
                  value="required"
                />
              }
              label="Required"
              labelPlacement="start"
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default QuestionType;
