import React, { useCallback, memo, useReducer } from "react";

/**
* @Permasalahan
* ketika kita menggunakan useState untuk mengelola state sederhana mungkin akan baik-baik saja, namun jika state tersebut
* sudah sangat kompleks dan perlu memiliki berbagai jenis action maka useReducer adalah salah satu fitur yg tepat.
* analogi sederhananya, useState adalah sebuah toko yg menjual 1 jenis barang,
* sedangkan useReducer adalah toko yg menjual banyak jenis barang, sehingga kita bisa banyak memilih dan melakukan jenis action.
* kode ini merupakan cara sederhana dalam memahami bagaimana useReducer bekerja, sehingga harapannya dari kode berikut
* bisa di explore untuk kasus yg lebih kompleks lagi.

 * @useReducer
 * @reference https://react.dev/reference/react/useReducer#usage
 * mirip seperti useState namun digunakan untuk menghandle state yg lebih kompleks, dan memiliki concern pada performance dan maintablity.
 
 * @Reducer fungsi yg digunakan untuk memperbarui state berdasarkan action yg diterima
 * @InitialState nilai awal dari state tersebut
 */

const initialValues = {
  username: "Jhon Doe",
  age: 21,
  gender: "Male",
  job: "Frontend Developer",
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_USERNAME":
      return {
        ...state,
        username: action.username,
      };
    case "CHANGE_AGE":
      return {
        ...state,
        age: action.age,
      };
    case "CHANGE_GENDER":
      return {
        ...state,
        gender: action.gender,
      };
    case "CHANGE_JOB":
      return {
        ...state,
        job: action.job,
      };
    default:
      throw Error("Unknown action: " + action.type);
  }
}

const InputValue = ({ label, onChange, type, options }) => {
  return (
    <div className="flex flex-col w-full max-w-[20rem] mb-6">
      <label className="font-semibold">Change {label}:</label>

      {type === "select" ? (
        <select
          className="p-4 w-[20rem] border border-gray-500 mb-4"
          name="job"
          onChange={onChange}
          defaultValue="frontend"
        >
          {options?.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      ) : (
        <input
          onChange={onChange}
          className="p-3 border border-gray-400"
          placeholder="enter something"
        />
      )}
    </div>
  );
};

const ComponentB = memo(() => {
  console.log("ComponentB");
  return <div>Render Component B</div>;
});

function LearningPath3() {
  /**
   * @state sebagai initial state
   * @dispatch sebagai action
   * @reducer sebagai function untuk mengelola dan memperbarui state berdasarkan type yg ada
   * @initialValues sebagai default values yg diberikan pada state
   */
  const [state, dispatch] = useReducer(reducer, initialValues);

  console.log("renderr");

  const onChange = useCallback(
    (e, { type, key }) => {
      const value = e.target.value;
      // memanggil dispatch untuk mengubah state yg ada kemudian akan di proses oleh reducer
      dispatch({ type, [key]: value });
    },
    [dispatch]
  );

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="text-left mb-6 mt-10 w-[20rem]">
        {Object.keys(state).map((item) => (
          <div key={item} className="flex items-center">
            <p className="font-semibold uppercase">
              {item} : <span className="text-blue-600">{state[item]}</span>
            </p>
          </div>
        ))}
      </div>

      <InputValue
        label="USERNAME"
        onChange={(e) =>
          onChange(e, { type: "CHANGE_USERNAME", key: "username" })
        }
      />
      <InputValue
        label="AGE"
        onChange={(e) => onChange(e, { type: "CHANGE_AGE", key: "age" })}
      />
      <InputValue
        label="GENDER"
        type="select"
        options={["Male", "Female", "Netral"]}
        onChange={(e) => onChange(e, { type: "CHANGE_GENDER", key: "gender" })}
      />
      <InputValue
        label="JOB"
        type="select"
        onChange={(e) => onChange(e, { type: "CHANGE_JOB", key: "job" })}
        options={[
          "Product Manager",
          "Frontend Engineer",
          "Mobile Developer",
          "Backend Developer",
          "UI/UX Designer",
        ]}
      />

      {/* cek apakah component ini apakah ikut rerender jika parentnya re render */}
      <ComponentB />
    </div>
  );
}

export default LearningPath3;
