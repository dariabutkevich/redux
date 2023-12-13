import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../util/validation";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/user/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin() {
    const user = User.parse({
      email,
      password,
    });
    setError(null);
    dispatch(getUser({ email, password })).then(
      () => navigate("/about"),
      (err) => setError(err?.toString())
    );
  }

  const fillFields = email && password;

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="mt-24 font-bold text-3xl">Login</h1>
      <input
        className=" py-2 px-4 bg-gray-100  hover:bg-gray-200"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error?.email && (
        <div className="text-red-400">{error?.email?._error}</div>
      )}
      <input
        className=" py-2 px-4 bg-gray-100 hover:bg-gray-200 "
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error?.password && (
        <div className="text-red-400">{error?.password?._error}</div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {fillFields ? (
        <button
          onClick={handleLogin}
          className=" py-2 px-4 mb-8  bg-gray-300  hover:bg-gray-400 text-black"
        >
          Login
        </button>
      ) : (
        <button disabled className=" py-2 px-4 mb-8  bg-gray-300">
          Login
        </button>
      )}
    </div>
  );
}

export default Login;
