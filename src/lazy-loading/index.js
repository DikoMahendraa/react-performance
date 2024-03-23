import React, { useState, Suspense, useEffect, lazy } from "react";

import ComponentC from "./ComponentC";
import axios from "axios";
const ComponentB = lazy(() => import("./ComponentB"));

/**
 * @Permasalahan
 * ketika sebuah component akan di render atau akan di tampilkan, maka yg terjadi adalah, component
 * tersebut akan di load atau di muat terlebih dahulu, sebelum di tampilkan pada sisi browser. biasanya hal tersebut terjadi sangat cepat (0.0xx seconds).
 * tapi ada kalanya ketika kondisi network kita tidak stabil atau lemot. maka proses load component akan menjadi lebih lambat.
 * sehingga akan terjadi blank page, karena component atau halaman tersebut belum siap untuk dimunculkan.
 * dan disinilah metode lazy mengambil alih.

 * @Penyelesaian
 * @reference https://react.dev/reference/react/lazy
 * React Lazy akan mengisi kekosongan component / page, ketika component / page masih dalam proses load, sampai komponen benar-benar siap untuk di tampilkan.
 * hal ini akan sangat berguna untuk dari sisi user interface, karena user akan di beritahu bahwa page tersebut sedang dalam proses untuk di tampilkan.
 * sehingga tidak terjadi kekosongan konten pada sisi browser.

 * @Produce
 * dibawah ini sudah tersedia beberapa component dan juga button sebagai saklar untuk memunculkan dan menyembunyikan ComponentB,
 * yg dimana komponen tersebut sudah kita bungkus dengan Suspense dan lazy.
 * pada browser masuk ke mode devtools kemudian pilih menu network dan aktifkan throttling ke slow 3G
  
 
 * @Catatan
 * perlu kita ketahui bahwa component yg di import menggunakan lazy harus di export menggunakan export default.
 * fungsi Suspense disini adalah untuk menangkap proses load pada halaman.
 * loading tersebut hanya akan dimunculkan ketika halaman di muat saat pertama kali di render.
 * untuk melihat apakah loading bekerja, pastikan bahwa komponen yg dibungkus menggunakan Suspense di import menggunakan lazy
 */

function LazyLoading() {
  // const [isLazy, setLazy] = useState(false);
  const [data, setData] = useState([]);

  const res = async () =>
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => console.log(error));

  useEffect(() => {
    res();
  }, []);

  console.log(data);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Parent Component</h1>

      {/* <button
        onClick={() => setLazy(!isLazy)}
        className="px-6 py2 bg-blue-400 text-white"
      >
        switch lazy {isLazy ? "active" : "unactive"}
      </button>


      {isLazy && (
        <Suspense fallback={<div>...Loading</div>}>
          <ComponentB title="Compoennt B" />
        </Suspense>
      )} */}

      <ComponentC />

      <ul>
        {data && (
          <Suspense fallback={<div>...fetching data</div>}>
            {data.map((item) => (
              <ComponentB title={item.title} />
            ))}
          </Suspense>
        )}
      </ul>
    </div>
  );
}

export default LazyLoading;
