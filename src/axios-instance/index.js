/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useCallback } from "react";
import { useLogin } from "./instance";
import { useNavigate, Navigate } from "react-router-dom";

function LoginPage() {
  const [, setEmail] = useState();
  const [, setPassword] = useState();
  const navigation = useNavigate();

  const accToken = localStorage.getItem("access_token");
  const refToken = localStorage.getItem("refresh_token");

  if (accToken && refToken) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = useCallback(async () => {
    const { status, data } = await useLogin();

    localStorage.setItem("access_token", data?.access_token);
    localStorage.setItem("refresh_token", data?.refresh_token);

    if (status === 201) {
      return navigation("/dashboard");
    }
  }, [navigation]);

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
