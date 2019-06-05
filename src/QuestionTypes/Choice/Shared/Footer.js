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
import CustomTheme from "../../../Theme";

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
  const { id, sensitive, required, remove, dupe, change } = props;
  const classes = useStyles();
  // TODO: Find out why event.propagation must be used, otherwise the parent state never changes. Possibly a bug?
  const handleChange = (event, name, value) => {
    event.stopPropagation();
    change(name, value);
  };
  const handleRemoveQuestion = event => {
    event.stopPropagation();
    remove(id);
  };
  const handleDupeQuestion = event => {
    event.stopPropagation();
    dupe(id);
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
          name="sensitive"
          className={classes.button}
          aria-label="Sensitive answer"
          onClick={event =>
            handleChange(event, event.currentTarget.name, !sensitive)
          }
        >
          {sensitive && <LockIcon color="secondary" />}
          {!sensitive && <LockOpenIcon />}
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
            name="required"
            color="secondary"
            checked={required}
            onChange={event =>
              handleChange(event, event.target.name, event.target.checked)
            }
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
  id: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  sensitive: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  dupe: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

export default Footer;
