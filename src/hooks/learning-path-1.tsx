import React, { useState, memo, useCallback } from "react";

/**
* @Penjelasan Issue Terkait
* seperti yg bisa kita lihat dibawah ini, dimana kita memiliki beberapa component yg dipanggil dalam sebuah parent
* component, pada setiap component pasti akan melakukan beberapa fungsi kusus. contohnya, ada yg melakukan count increment, decrement,
* kemudian melakukan input text sederhena yg menampilkan setiap text yg kita ketika pada element input.
* atau hanya melakukan render element saja tanpa melakukan apapun.
* pada kasus dibawah ini sebenarnya tidak ada yg aneh pada tampilan dan fungsinya berjalan dengan baik,
* namun jika kita teliti lagi, setiap kali kita melakukan perubahan pada Component1, sedangkan component lainnya (Component2, Component3)
* tidak memiliki perubahan apapun, maka component yg TIDAK memliki changes / perubahan ikut melakukan re render.
* padahal seharusnya component yg melakukan re render hanya Component1. dan ini adalah issue utamanya.

* @Catatan
* penggunaan memo yg tidak tepat tidak akan memberikan dampak apapun,
* contoh ketika kita melempar sebuah props function, kemudian props function tersebut tidak kita bungkus
* dengan useCallback maka yg terjadi adalah, component yg kita bungkus dengan memo tersebut akan selalu melakukan re render
* karena dia akan membaca bahwa, dependency / props tersebut memiliki value yg berbeda.
* karena pada javascript, func(){} !== func(){} sehingga javascript akan selalu membuat function baru
* atau anda bisa menggunakan Object.is() untuk melakukan perbandingan

* @Solusi
* untuk mengatasi hal tersebut maka kita bisa menggunakan memo dan mengkombinasikan juga dengan useCallback untuk caching function

* @Memo
* @reference https://react.dev/reference/react/memo
* memo merupakan salah satu fitur pada react yg digunakan untuk skip re rendering component, jika props tidak memiliki perubahan.

* @useCallback
* @reference https://react.dev/reference/react/useCallback
* merupakan salah satu hooks pada react yg digunakan untuk melakukan cache/menyimpan sebuah function tanpa merender
* ulang setiap kali component dirender.

* @Cara Kerja
* silahkan bungkus component dibawah ini menggunakan memo
* ex. const Component1 = memo(() => { return element disini })
* bandingkan setelah dan sebelum menggunakan memo dan useCallback.
*/

type TComponent1 = {
  increment: () => void;
  decrement: () => void;
  count: number;
};

type TComponent2 = {
  words?: string;
  onChange?: () => void;
};

type TComponent4 = {
  onFetch: () => void;
};

const Component1: React.FC<TComponent1> = ({
  increment,
  decrement,
  count = 0,
}) => {
  console.log("render component 1");
  return (
    <div className="w-full border border-gray-400 my-24 py-4">
      <div className="flex justify-center gap-4 items-center">
        <button
          onClick={decrement}
          className="px-6 py-3 bg-blue-500 text-white"
        >
          -
        </button>
        <span className="text-4xl">{count}</span>
        <button
          onClick={increment}
          className="px-6 py-3 bg-blue-500 text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

const Component2: React.FC<TComponent2> = ({ words, onChange }) => {
  console.log("render component 2");
  return (
    <div className="w-full border border-gray-400 my-24 flex justify-center py-4">
      <div>
        <p>Say something: {words}</p>

        <input
          onChange={onChange}
          className="p-3 border border-gray-400"
          placeholder="enter something"
        />
      </div>
    </div>
  );
};

const Component3: React.FC = () => {
  console.log("render component 3");
  return (
    <div className="w-full py-4 text-center border border-gray-400">
      <div>Component3</div>
    </div>
  );
};

const Component4: React.FC<TComponent4> = memo(({ onFetch }) => {
  console.log("render component 4");
  return (
    <div className="w-full mt-10 py-4 text-center border border-gray-400">
      <div>Component4</div>
      {/* 
        !NOTES
        ketika component sudah dibungkus dengan memo, pada kasus ini
        onFetch menjadi salah satu dependency yg akan menentukan apakah component akan rerender atau tidak,
        kalian bisa cek di console.log kemudian lakukan perubahan pada Component1.
        dan lihat apa yg terjadi
      */}
      <button onClick={onFetch} className="px-6 py-3 bg-blue-500 text-white">
        onFetch
      </button>
    </div>
  );
});

const LearningPath1 = () => {
  const [count, setCount] = useState(0);

  // Gunakan useCallback untuk memastikan onFetchComponent tidak dibuat ulang setiap render
  const onFetchComponent = useCallback(async () => {
    return await fetch("https://jsonplaceholder.typicode.com/posts")
      .then(async (response) => {
        await response.json();
      })
      .then((json) => console.log(json));
  }, []);

  return (
    <div>
      <Component1
        count={count}
        increment={() => setCount(count + 1)}
        decrement={() => setCount(count - 1)}
      />
      <Component2 />
      <Component3 />
      <Component4 onFetch={onFetchComponent} />
    </div>
  );
};

LearningPath1.propTypes = {};

export default LearningPath1;
