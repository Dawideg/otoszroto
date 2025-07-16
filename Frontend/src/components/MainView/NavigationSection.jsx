import React from "react";
import { Link } from "react-router-dom";

const NavigationSection = ({ showChat, setShowChat }) => {
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
              <li className="nav-item">
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="btn p-2 otomotobtn1"
                >
                  {showChat ? "Zamknij czat" : "Czat"}
                </button>
              </li>
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationSection;
