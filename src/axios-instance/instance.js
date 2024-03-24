import axios from "axios";

/**
 * @Permasalahan
 * ketika kita berkomunikasi dengan HTTP method, sering kali kita menemukan sebuah API yg memerlukan beberapa parameter,
 * yg paling sering adalah Authorization. ketika kita menggunakan axios tanpa instance kita akan mengatur config Authorization secara manual
 * pada setiap request contoh: axios.request1({Authorization: token}), axios.request2({Authorization: token}), axios.request3({Authorization: token}) xxxxxx.
 */

/**
 * @Solusi
 * @reference Axios Instance https://axios-http.com/docs/instance
 * @Axios Instance
 * adalah sebuah metode pada axios yg biasa digunakan untuk mengatur config secara global.
 
 * selain itu juga kita bisa melakukan intercept untuk request dan juga response. sehingga kita bisa menentukan
 * data apa yg akan dikirim ataupun di terima, memodifikasi response dan memisahkan logic pada business dengan logic settingan HTTP.
 * sehingga kode tetap terorganisir dan mudah dipahami.
 
 * @Bagaimana cara intercept bekerja ?
 * sesuai namanya intercept yg artinya mencegat, kita sering mendengar istilah client-server
 * diamana client akan melakukan request kepada server, kemudian server akan memberikan feedback berupa response.
 * intecept sendiri bekerja di tengah-tengah request dan juga response.
 
 * jadi flow nya akan seperti ini:
 
 * client akan melakukan request -> kemudian masuk ke interceptor -> diterima server
 * server akan meresponse request tersebut -> kemudian masuk ke interceptor -> diterima oleh client
 
 * sehingga dari sini kita bisa memodifikasi parameter apa saja yg akan dikirim ataupun diterima dari sisi client dan juga server.
 * */

// initialisasi awal penggunaan axios instance
export const instance = axios.create();

// melakukan interceptor request (client - server)
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    // setup global config header Authorization
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// melakukan interceptor response (server - client)
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // variable ini digunakan sebagai flagging untuk menghindari request terus menerus apabila kondisi tidak terpenuhi
    let allowedRefreshToken = true;

    // melakukan logika untuk melakukan refresh_token
    if (error.response.status === 401 && allowedRefreshToken) {
      try {
        allowedRefreshToken = false;
        const refreshToken = localStorage.getItem("refresh_token");

        // integrasi dengan api refresh_token
        const newToken = await instance.post(
          "https://api.escuelajs.co/api/v1/auth/refresh-token",
          {
            refreshToken,
          }
        );

        // update access_token dengan yg baru
        localStorage.setItem("access_token", newToken.data?.access_token);

        // jangan lupa untuk melakukan request ulang untuk mengupdate error 401 sebelumnya
        // dan mengirimkan paremeter konfigurasi original dari instance
        const requestAgain = await instance(error.config);

        return requestAgain;
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const useLogin = async () => {
  try {
    const response = await instance.post(
      "https://api.escuelajs.co/api/v1/auth/login",
      {
        email: "john@mail.com",
        password: "changeme",
      }
    );
    return response;
  } catch (error) {
    // do something went error
  }
};

export const getProfile = async () => {
  try {
    const response = await instance.get(
      "https://api.escuelajs.co/api/v1/auth/profile"
    );

    return response.data;
  } catch (error) {
    // do something went error
  }
};
