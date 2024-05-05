import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      const { data } = await axios.post("./login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login successfull");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <body class="d-flex align-items-center py-4 bg-body-tertiary">
      <main class="form-signin w-25 m-auto">
        <form onSubmit={handleLogin}>
          <h1 class="h4 mb-3 fw-normal">Enter Login</h1>

          <div class="form-floating ">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mt-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button class="btn btn-primary w-100 py-2 mt-3" type="submit">
            Login
          </button>
        </form>
      </main>
    </body>
  );
}
