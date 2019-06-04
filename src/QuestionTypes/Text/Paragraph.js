// React & Material UI
import React from "react";
// App custom
import Text from "./Shared/Text";

function Paragraph(props) {
  return (
    <Text {...props} label="Long answer text" width="80%" />
  );
}

export default Paragraph;
