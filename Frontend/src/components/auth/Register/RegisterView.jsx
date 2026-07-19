import React, { useState } from "react";
import { use } from "react";
import { register } from "../../../api/getData";
import { toast } from "react-toastify";

const RegisterView = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
    surname: "",
    isCompany: false,
  });
  const [checkPass, setCheckPass] = useState("");
  const [comparePasswords, setComparePasswords] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerData.password != checkPass) {
      setComparePasswords(true);
      return;
    }
    setComparePasswords(false);
    register(registerData)
      .then(() => {
        toast.success("Zarejestrowano pomyślnie", {
          onClose: () => {
            window.location.href = "/login";
          },
          autoClose: 1000,
        });
      })
      .catch((error) => {
        toast.error("Błąd rejestracji: " + error.message);
      });
  };
  const handleChange = (e) => {
    const { name, value, id } = e.target;
    if (name === "isCompany") {
      setRegisterData((prev) => ({
        ...prev,
        [name]: id === "p" ? false : true,
      }));
    } else {
      setRegisterData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center mt-4 mb-4"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h4 className="text-center mb-4">
          Zarejestruj swoje konto na Otoszroto
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Imię
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Nazwisko
            </label>
            <input
              type="text"
              name="surname"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Numer telefonu
            </label>
            <input
              type="number"
              name="phoneNumber"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="mb-3">
            <label htmlFor="rpassword" className="form-label">
              Powtórz hasło
            </label>
            <input
              type="password"
              name="rpassword"
              className="form-control"
              onChange={(e) => setCheckPass(e.target.value)}
              required
            />
          </div>

          {comparePasswords && (
            <div className="alert alert-danger" role="alert">
              Podane hasła różnią się
            </div>
          )}

          <div className="mb-3">
            <label className="form-label d-block">Typ konta</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isCompany"
                id="p"
                value="false"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="p">
                Osoba prywatna
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="isCompany"
                id="f"
                value="true"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="f">
                Firma
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
