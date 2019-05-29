import { createMuiTheme } from "@material-ui/core/styles";
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const Theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: green
  }
});

export default Theme;
