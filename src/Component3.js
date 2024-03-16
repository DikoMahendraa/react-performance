import React, { memo } from "react";
import PropTypes from "prop-types";

function Component3(props) {
  console.log("render component 3");
  return (
    <div className="mb-10">
      <ul>
        {props.data.map((item) => {
          return (
            <li className="list-disc" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

Component3.propTypes = {};

export default memo(Component3);
