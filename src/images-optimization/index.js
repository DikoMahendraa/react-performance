import React, { useState } from "react";
import { useEffect } from "react";
import { instance } from "../axios-instance/instance";

/**
 * @Permasalahan
  Hampir 90% content pada sebuah website merupakan images, dan images sendiri mengambil bagian penting dalam
  menaikan ketertarikan pada sebuah oleh users. dan juga menjadikan keindahan tersendiri pada sebuah website sebagai assets,
  illustrasi, ataupun menampilkan informasi.
  maka dari itu penting bagi kita untuk mempelajari bagaimana cara mengoptimalkan browser ketika menampilkan sebuah gambar.
  karena ketika browser menampilkan gambar, maka akan terjadi process load image dan akan memakan waktu yg cukup lama jika
  image yg diload memiliki ukuran yg besar, itu hanya dari 1 image. bayangkan jika kita memiliki ratusan bahkan ribuan images
  yg perlu di munculkan di browser / UI, maka akan terjadi kekosongan content yg akan membuat users experience menjadi buruk.
  hal ini dapat menurunkan angka pengguna pada sebuah aplikasi.
 
 
 * @Solusi
 * @Reference Image Performance https://web.dev/learn/performance/image-performance
 
  sebelum melangkah lebih jauh, kita harus tau dulu apa sebenarnya yg menjadi issue pada sebuah image performance.
  dan berikut ini adalah beberapa point yg bisa saya jelaskan, dan mungkin cukup berguna
 
 * 1. @Deferring image requests https://web.dev/learn/images/performance-issues#deferring_image_requests
  atau menunda permintaan, sebenarnya untuk mengatasi issue image performance. contoh dalam kasus ini adalah,
  ketika image tidak berada pada viewport pengguna maka jangan lakukan permintaan untuk menampilkan images (menunda permintaan).
  <img src="image.jpg" loading="lazy" alt="…">
  kita cukup menambahkan attribute loading dengan value lazy pada img,
  attribute tersebut berfungsi untuk mencegah permintaan image sampai berada dekat dengan viewport.
 
 * @Notes
 * ! hanya gunakan attr loading untuk gambar yg tidak terlihat saat UI pertama kali di render
 * ! penggunaan lazy dapat memicu blind
 
 
 * 2. @Fetch Priority https://web.dev/learn/images/performance-issues#fetch_priority
  memberikan hint atau petunjuk kepada browser untuk melakukan prioritas dalam pemuatan gambar yg
  didalamnnya terdapat attribute priority. sehingga akan meningkatkan pengalaman pengguna
  <img src="logo.png" loading="eager" priority="high" alt="Logo Website">
 
 * 3. @srcSet & sizes
  memungkinkan kita untuk menentukan beberapa sumber gambar, melalui beberapa faktor
  - ukuran layar (browser akan memilih gambar dengan resolusi yg paling sesuai
  dengan ukuran layar perangkat)
  - lebar gambar (browser akan memilih gambar yg lebarnya lebih dekat dengan lebar container gambar)
  -
 
  contohnya
  <img src="small.jpg" srcset="medium.jpg 768w, large.jpg 1280w" sizes="(min-width: 768px) 50vw, 100vw" alt="My image">
 
  pada contoh di atas, browser akan memilih gambar
  - perangkat layar kecil menggunakan gambar small.jpg
  - perangkat layar sedang menggunakan gambar medium,jpg 768w
  - perangkat layar besar menggunakan gambar large.jpg 1280w
  
  bisa juga menggunakan attributes sizes untuk memberikan informasi lebih lanjut
  <img src="small.jpg" srcset="medium.jpg 768w, large.jpg 1280w" sizes="(min-width: 768px) 50vw, 100vw" alt="My image">

 * @Notes
  !ketika menggunakan attributes srcSet tanpa memanggil attr sizes maka tidak akan berpengaruh
  apapun, begitu sebaliknya. maka penggunaan keduanya harus dipanggil.

 * @Image Sizes & Format
 * @references1 https://web.dev/learn/images/welcome
 * @references2 https://web.dev/learn/images/responsive-images
 
 * banyak faktor yg bisa kita lakukan untuk mengoptimasi images, salah satunya adalah
 * apa yg sudah di paparkan di atas, berikut ini adalah contoh penggunaan sederhana yg akan 
 * menampilkan images dalam jumlah besar. namun images hanya akan ditampilkan jika sudah masuk
 * dalam 1 viewport.
 * */

export default function ImageOptimization() {
  const [listImgs, setListImgs] = useState([]);

  const fetchImages = async () => {
    return await instance
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => setListImgs(response.data))
      .catch((error) => "ups something went wrong");
  };

  useEffect(() => {
    fetchImages();
  }, []);

  console.log({ listImgs });

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <h1>ImageOptimization</h1>

      <div className="max-h-[20rem] overflow-y-scroll">
        {listImgs.map((element) => {
          return (
            <img
              alt="testing"
              src={element.thumbnailUrl}
              className="h-auto max-w-full"
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
  );
}
