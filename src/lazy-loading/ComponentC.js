import React, { memo } from "react";

function ComponentC() {
  console.log("render component C");
  return <div>ComponentC</div>;
}

export default memo(ComponentC);
