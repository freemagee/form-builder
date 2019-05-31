import CustomTheme from "../../Theme";

const Styles = {
  title: {
    "& .MuiFormLabel-root": {
      fontSize: CustomTheme.typography.pxToRem(24)
    },
    "& .MuiInputBase-input": {
      fontSize: CustomTheme.typography.pxToRem(24)
    },
    "& .MuiInputLabel-asterisk": {
      color: CustomTheme.palette.error.main
    }
  },
  paper: {
    marginTop: CustomTheme.spacing(4),
    paddingTop: CustomTheme.spacing(4),
    paddingLeft: CustomTheme.spacing(4),
    paddingRight: CustomTheme.spacing(4),
    borderLeft: `3px solid transparent`
  },
  paperActive: {
    boxShadow: CustomTheme.shadows[7],
    borderLeft: `3px solid ${CustomTheme.palette.primary.main}`
  },
  form: {
    width: "100%" // Fix IE 11 issue.
  },
  input: {
    marginTop: CustomTheme.spacing(1),
    marginBottom: CustomTheme.spacing(1),
    "& .MuiInputBase-input": {
      fontSize: CustomTheme.typography.pxToRem(14)
    }
  },
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

export default Styles;