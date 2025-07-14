import React from "react";
import { useState } from "react";
import { login } from "../../../api/getData";

const LoginView = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    login(loginData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Zaloguj się do swojego konta na Otoszroto</h2>
      <form onSubmit={handleSubmit}>
        Email: <input type="email" name="email" id="" onChange={handleChange} />
        <br />
        Hasło:{" "}
        <input type="password" name="password" id="" onChange={handleChange} />
        <br />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
};
export default LoginView;
