import React, { memo } from "react";
import { useState } from "react";

function Component2(props) {
  const [value, setValue] = useState("");

  console.log("render component 2");
  return (
    <>
      <span>Hi my name is : {value}</span>

      <input
        placeholder="enter count"
        value={value}
        onChange={(e) => {
          const val = e.target.value;

          setValue(val);
        }}
        className="border border-gray-500 p-4 mt-4 rounded-sm"
      />

      <button
        className="bg-red-500 px-6 py-4 mt-6 text-white"
        onClick={() => setValue("")}
      >
        reset
      </button>
    </>
  );
}

Component2.propTypes = {};

export default memo(Component2);
