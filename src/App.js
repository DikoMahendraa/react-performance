import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Component1 from "./Component1";
import Component2 from "./Component2";
import Component3 from "./Component3";
import axios from "axios";
import Component4 from "./Component4";

function App() {
  const [count, setCount] = useState(0);

  // const listData = useCallback(() => {
  //   return [count + 1, count + 2, count + 3];
  // }, [count]);

  const handleSubmitData = useCallback(async () => {
    console.log("masuk sini");
    try {
      const response = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            return response.data;
          }
        });

      return response;
    } catch (error) {}
  }, []);

  console.log("render app");

  return (
    <div className="h-screen flex flex-col w-full items-center justify-center">
      <Component4 onClick={handleSubmitData} />
      <Component1 count={count} />
      <div className="w-[10rem] my-10 flex items-center justify-between">
        <button
          onClick={() => setCount(count - 1)}
          className="p-3 px-6 bg-yellow-600 text-white"
        >
          -
        </button>
        <span>{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="p-3 px-6 bg-yellow-600 text-white"
        >
          +
        </button>
      </div>
      {/* <Component3 data={listData()} />

      <Component2 /> */}
    </div>
  );
}

export default App;
