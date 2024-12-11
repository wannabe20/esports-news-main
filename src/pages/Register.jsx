import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../../supabase.js';

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { username: data.username }, // Add extra user metadata
        },
      });

      if (error) throw error;
      navigate("/login");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-gradient-to-tr from-blue-400 to-blue-500">
      <h1 className="text-3xl font-bold mb-3 text-slate-100">Register</h1>
      <form className="flex flex-col items-center p-8 rounded bg-slate-100">
        <div className="flex flex-col items-center gap-2 relative">
          <input
            className="w-72 px-3 py-2 rounded border-gray-300 border-[2px]"
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            className="w-72 px-3 py-2 rounded border-gray-300 border-[2px]"
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            className="w-72 px-3 py-2 rounded border-gray-300 border-[2px]"
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="password"
          />
          {err && <p className="text-sm text-blue-500 w-full absolute -bottom-7">{err}</p>}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-800 rounded p-2 font-medium text-slate-200 mt-12"
          type="submit"
        >
          Submit
        </button>
        <span className="mt-3 text-sm">
          Do you have an account?{" "}
          <span className="underline text-blue-600 hover:text-blue-700">
            <Link to="/login">Login</Link>
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
