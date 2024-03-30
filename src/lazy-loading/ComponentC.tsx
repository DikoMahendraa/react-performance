import { memo } from "react";

const ComponentC: React.FC = () => {
  console.log("render component C");
  return <div>ComponentC</div>;
};

export default memo(ComponentC);
