import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../api/getData";
import { toast } from "react-toastify";

const NavigationSection = ({ showChat, setShowChat, userData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const logoutUser = () => {
    logout()
      .then(() => {
        toast.success("Wylogowano", {
          onClose: () => {
            window.location.href = "/";
          },
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg shadow-sm"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-3">
            <Link to={"/"} className="navbar-brand m-0 p-0">
              <img
                src="../img/otoszrotoLogo.png"
                alt="logo"
                style={{ maxWidth: "150px" }}
              />
            </Link>

            {userData && (
              <Link
                to="/add-announcement"
                className="btn btn-outline-primary fw-semibold"
              >
                Dodaj ogłoszenie
              </Link>
            )}
          </div>

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
              {userData ? (
                <div className="nav-item d-flex align-items-center">
                  <li className="nav-item">
                    <button
                      onClick={() => setShowChat(!showChat)}
                      className="btn p-2 otomotobtn1"
                    >
                      {showChat ? "Zamknij czat" : "Czat"}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="mb-0 ms-2 px-3 py-1 rounded border bg-light small fw-semibold shadow-sm d-inline-block text-center"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={logoutUser}
                      style={{
                        cursor: "pointer",
                        width: "220px",
                        height: "40px",
                      }}
                    >
                      {isHovered ? (
                        <span className="text-danger">Wyloguj</span>
                      ) : (
                        <>
                          Zalogowano jako:{" "}
                          <span className="text-dark">{userData.name}</span>
                        </>
                      )}
                    </button>
                  </li>
                </div>
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
