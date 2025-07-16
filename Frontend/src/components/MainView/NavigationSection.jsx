import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUser } from "../../api/getData"; // Adjust the import path as necessary

const NavigationSection = ({ showChat, setShowChat }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser()
      .then((user) => {
        console.log("Pobrano użytkownika:", user);
        setUser(user.name);
      })
      .catch((error) => {
        console.error("Błąd pobierania użytkownika:", error);
      });
  }, []);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <img
              src="../img/otoszrotoLogo.png"
              alt="logo"
              style={{ maxWidth: "150px" }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse me-4" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              {user ? (
                <li className="nav-item d-flex align-items-center">
                  <li className="nav-item">
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="btn p-2 otomotobtn1"
                    >
                      {showChat ? "Zamknij czat" : "Czat"}
                    </button>
                  </li>
                  <p className="mb-0 ms-2 px-3 py-1 rounded border bg-light small fw-semibold shadow-sm">
                    Zalogowano jako: <span className="text-dark">{user}</span>
                  </p>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/login"} className="btn p-2 otomotobtn1">
                      Zaloguj się
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="btn p-2 otomotobtn2">
                      Zarejestruj się
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationSection;
