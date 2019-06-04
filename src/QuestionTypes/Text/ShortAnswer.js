// React & Material UI
import React from "react";
// App custom
import Text from "./Shared/Text";

function ShortAnswer(props) {
  return (
    <Text {...props} label="Short answer text" width="40%" />
  );
}

export default ShortAnswer;
