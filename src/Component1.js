import React, { memo } from "react";
import PropTypes from "prop-types";

function Component1(props) {
  console.log("render component 1");
  return <div>Component1 {props.count}</div>;
}

Component1.propTypes = {};

export default memo(Component1);
