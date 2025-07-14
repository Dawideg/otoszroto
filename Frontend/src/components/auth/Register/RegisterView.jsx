import React, { useState } from "react";
import { use } from "react";
import { register } from "../../../api/getData";

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
    register(registerData);
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
    <div>
      <h2>Zarejestruj swoje konto na Otoszroto</h2>
      <form onSubmit={handleSubmit}>
        Imię: <input type="text" name="name" id="" onChange={handleChange} />
        <br />
        Nazwisko:{" "}
        <input type="text" name="surname" id="" onChange={handleChange} />
        <br />
        Numer telefonu:{" "}
        <input type="number" name="phoneNumber" id="" onChange={handleChange} />
        <br />
        Email: <input type="email" name="email" id="" onChange={handleChange} />
        <br />
        Hasło:{" "}
        <input type="password" name="password" id="" onChange={handleChange} />
        <br />
        Powtórz hasło:{" "}
        <input
          type="password"
          name="rpassword"
          id=""
          onChange={(e) => setCheckPass(e.target.value)}
        />
        <br />
        Osoba prywatna{" "}
        <input type="radio" name="isCompany" id="p" onChange={handleChange} />
        Firma{" "}
        <input type="radio" name="isCompany" id="f" onChange={handleChange} />
        <br />
        {comparePasswords && (
          <div>
            <p>Podane hasła różnią się</p>
          </div>
        )}
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default RegisterView;
