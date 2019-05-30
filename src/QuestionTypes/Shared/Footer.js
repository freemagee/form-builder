// React & Material UI
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// Material UI components
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DuplicateIcon from "@material-ui/icons/AddToPhotos";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
// App custom
import CustomTheme from "../../Theme";

// 'Extend' the default styles
const componentStyleOverrides = {
  button: {
    marginLeft: CustomTheme.spacing(1),
    marginRight: CustomTheme.spacing(1)
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: CustomTheme.spacing(6),
    padding: CustomTheme.spacing(2),
    borderTop: `1px solid ${CustomTheme.palette.grey[300]}`
  },
  vertDivider: {
    width: 1,
    height: 48
  }
};
const useStyles = makeStyles(componentStyleOverrides);

function Footer(props) {
  const { uuid, remove, dupe } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    required: false,
    sensitive: false
  });
  const handleChange = name => event => {
    if (name !== "required") {
      const current = state[name];

      setState({ ...state, [name]: !current });
    } else {
      setState({ ...state, [name]: event.target.checked });
    }
  };
  const handleRemoveQuestion = event => {
    event.stopPropagation();
    remove(uuid);
  };
  const handleDupeQuestion = event => {
    event.stopPropagation();
    dupe(uuid);
  };

  return (
    <Box className={classes.footer}>
      <Tooltip title="Duplicate">
        <IconButton
          className={classes.button}
          aria-label="Duplicate"
          onClick={handleDupeQuestion}
        >
          <DuplicateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sensitive answer">
        <IconButton
          className={classes.button}
          aria-label="Sensitive answer"
          onClick={handleChange("sensitive")}
        >
          {state.sensitive && <LockIcon color="secondary" />}
          {!state.sensitive && <LockOpenIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          className={classes.button}
          aria-label="Delete"
          onClick={handleRemoveQuestion}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.vertDivider} />
      <FormControlLabel
        value="required"
        control={
          <Switch
            color="secondary"
            checked={state.required}
            onChange={handleChange("required")}
            value="required"
          />
        }
        label="Required"
        labelPlacement="start"
      />
    </Box>
  );
}

Footer.propTypes = {
  uuid: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired
};

export default Footer;
