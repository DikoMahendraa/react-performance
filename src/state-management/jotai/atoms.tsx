import { memo, useMemo } from "react";

import { atom, useAtomValue, useSetAtom } from "jotai";

/**
 * @Permasalahan
  ketika kita ingin mengelola sebuah state pada suatu komponent, dan ingin menggunakan state tersebut untuk komponent lain,
  maka yg akan kita lakukan adalah melemparkan state tersebut menjadi sebuah props, kemudian props tersebut akan digunakan oleh komponent
  yg membutuhkan. bayangkan jika kita memiliki komponen yg sangat dalam dan harus melempar props ke komponen1 - komponent2 - komponent3 dst, maka hal
  tersebut akan sangat merepotkan.
 * @Props Drilling
 * @reference https://dev.to/codeofrelevancy/what-is-prop-drilling-in-react-3kol
 
  */

/**
 * @Penyelesain
  sebenarnya kita bisa saja menggunakan useContext pada React, namun untuk case yg cukup kompleks dan issue performance terkait rerender
  maka ada beberapa opsi pilihan yg bisa kita gunakan di antaranya adalah, Redux, Zustand, Jotai. dsb.
  namun saya sangat merekomendasikan penggunaan jotai dan juga zustand karena penggunaannya yg sangat simple dan mudah,
  serta dapat menghindari rerender komponent saat ada perubahan value pada state tertentu.
  * @reference https://jotai.org/
  */

// mendifinisikan inital value atom
const animeAtom = atom([
  {
    title: "Ghost in the Shell",
    year: 1995,
    watched: true,
  },
  {
    title: "Serial Experiments Lain",
    year: 1998,
    watched: false,
  },
]);

// kita bisa melakukan modifikasi terhadap data yg akan di gunakan/tampilkan
const modifiedValue = atom((get) => {
  return get(animeAtom).map((item) => ({
    // hanya menampilkan data label
    label: `${item.title} - ${item.year}`,
  }));
});

const ComponentList: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex w-[20rem] justify-between">
      <li>{title}</li>

      <button>delete</button>
    </div>
  );
};

// dibungkus dengan memo untuk menghindari rerender component jika tidak memiliki changes dependency
const ComponentB = memo(() => {
  // kita bisa melakukan perubahan atom menggunakan useSetAtom
  // jika ingin menggunakannya secara global kita cukup meng import atom yg ingin digunakan
  const setAnime = useSetAtom(animeAtom);

  // melakukan pengecekan apakah ComponentB akan di rerender jika tidak ada perubahan apapun di komponen ini
  console.log("render component B");
  return (
    <button
      className="p-2 bg-blue-400 text-white px-6"
      onClick={() => {
        setAnime((anime) => [
          ...anime,
          {
            title: "Cowboy Bebop",
            year: 1998,
            watched: false,
          },
        ]);
      }}
    >
      Add Cowboy Bebop
    </button>
  );
});

const AtomPage = () => {
  const anime = useAtomValue(useMemo(() => modifiedValue, []));
  console.log("re main page");
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <ul className="list-disc h-[10rem] overflow-y-auto">
        {anime.map((item, index) => (
          <ComponentList key={index} title={item.label} />
        ))}
      </ul>

      <ComponentB />
    </div>
  );
};

export default AtomPage;
