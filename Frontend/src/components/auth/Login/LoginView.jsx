import React, { useState } from "react";
import { login } from "../../../api/getData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginData)
      .then(() => {
        toast.success("Zalogowano pomyślnie", {
          onClose: () => {
            window.location.href = "/";
          },
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.error("Błąd logowania:", error);
        toast.error("Nieprawidłowe dane logowania");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h4 className="text-center mb-4">Zaloguj się do Otoszroto</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Hasło
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
