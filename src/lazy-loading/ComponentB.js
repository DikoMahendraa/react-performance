import React from "react";

function ComponentB({ title }) {
  console.log("render component B");
  return <li className="list-disc">{title}</li>;
}

export default ComponentB;
