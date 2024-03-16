import React, { memo } from "react";
import PropTypes from "prop-types";

function Component4(props) {
  console.log("render component 4");
  return (
    <div>
      <button className="px-6 py-3 bg-red-200" onClick={props.onClick}>
        fetch data
      </button>
    </div>
  );
}

Component4.propTypes = {};

export default memo(Component4);
