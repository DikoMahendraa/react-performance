import React, { memo, useContext, useState } from "react";

/**
* @Permasalahan
* pada react kita biasa mengenal istilah Parent dan Child component, yg dimana setiap parent akan memiliki beberapa anak Component.
* misal ComponentA punya anak [ComponentB, ComponentC] terus ComponentC punya anak [ComponentD] dan seterusnya.
* *analogi sederhananya bayangkan parent adalah Buyut / Kakek kemudian dia ingin memberikan uang kepada cucunya, hal yg biasa dilakukan adalah Kakek
* akan memberikan kepada (Orang Tuanya) setelah itu ORTU akan memberikan uang tersebut kepada anaknya (Cucu si Kakek).
* padahal si KAKEK bisa langsung memberikan uang tersebut kepada CUCU nya tanpa perantara ORANG TUA nya.
* hal inilah yg dilakukan oleh si Context, jadi kita bisa langsung memberikan value tersebut kepada Component yg memerlukan.
* dengan CATATAN, bahwa component tersebut berada dalam 1 pembungkus (Provider) yg sama

* @Goals
* sehingga kita bisa meng optimisasi proses render ulang pada setiap component yg tidak memiliki perubahan didalamnnya
* tidak memerlukan render ulang

* @Solusi
* @reference Context https://react.dev/reference/react/useContext#usecontext
*   useContext mengizinkan kita untuk mengakses value dari context di seluruh component tanpa harus melewati props secara manual dari komponen ke komponen
*/

const TimeContext = React.createContext();

const ComponentA = () => {
  console.log("render component A");
  const { time, setTime } = useContext(TimeContext);

  return (
    <div className="border border-gray-400 p-4">
      <div className="">Component A - TIME: {time}</div>

      <button
        onClick={() => setTime(time + 1)}
        className="w-full py-2 bg-red-400 text-white my-6"
      >
        ADD TIME
      </button>

      <ComponentB />
      <ComponentC />
    </div>
  );
};

// menambahkan memo untuk component yg tidak memerlukan perubahan didalamnya
const ComponentB = memo(() => {
  console.log("render component B");
  return <div className="border border-red-600 p-2 my-2">Component - B</div>;
});

// menambahkan memo untuk component yg tidak memerlukan perubahan didalamnya
const ComponentC = memo(() => {
  console.log("render component C");

  return (
    <div className="border border-green-600 p-2 my-6">
      <div>Component - C</div>
      <ComponentD />
    </div>
  );
});

const ComponentD = () => {
  const { time } = useContext(TimeContext);
  console.log("render component D");

  return (
    <div className="border border-green-600 p-2 my-2">
      <div className="py-4">Component - D </div>
      <div className="py-4">return time disini : {time} </div>
    </div>
  );
};

function LearningPath2() {
  const [time, setTime] = useState(0);
  console.log("render parent");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="mb-4 uppercase font-bold">ini adalah parent component</h1>

      {/* Jangan lupa untuk membungkus parent Component menggunakan Provider dari Context */}
      <TimeContext.Provider value={{ time, setTime }}>
        <ComponentA />
      </TimeContext.Provider>
    </div>
  );
}

export default LearningPath2;
