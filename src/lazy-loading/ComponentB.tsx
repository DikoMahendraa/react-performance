const ComponentB: React.FC<{ title: string }> = ({ title }) => {
  console.log("render component B");
  return <li className="list-disc">{title}</li>;
};

export default ComponentB;
