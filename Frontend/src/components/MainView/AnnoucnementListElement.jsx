import React from "react";
import { Link } from "react-router-dom";

const AnnoucnementListElement = ({ data }) => {
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

  return (
    <div className="card mb-3 p-3 bg-light shadow-sm rounded position-relative">
      {/* Link wypełniający całą kartę */}
      <Link
        to={`/announcement/${data.id}`}
        className="stretched-link"
        style={{ textDecoration: "none", color: "inherit", zIndex: 1 }}
      ></Link>

      <div className="row g-3 align-items-center">
        <div className="col-md-2">
          <img
            src={`${IMAGES_URL}${data.imageUrls[0]}`}
            alt=""
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h5 className="mb-1 fw-bold">
            {data.brand} {data.model}
          </h5>
          <p className="text-muted small mb-2">
            {data.engineCapacity}cm<sup>3</sup> •{" "}
            {data.accidentFree ? "Bezwypadkowy" : "Powypadkowy"} •{" "}
            {"Wersja: " + data.version}
          </p>
          <ul className="list-inline text-muted small">
            <li className="list-inline-item">
              <i className="bi bi-speedometer2"></i>{" "}
              {data.mileage.toLocaleString()} km
            </li>
            <li className="list-inline-item">
              <i className="bi bi-fuel-pump"></i> {data.fuelType}
            </li>
            <li className="list-inline-item">
              <i className="bi bi-gear"></i> {data.horsepower} KM
            </li>
            <li className="list-inline-item">
              <i className="bi bi-calendar"></i> {data.yearOfProduction}
            </li>
          </ul>
          <div className="text-muted small">
            {data.city}
            <br />
            <i className="bi bi-person"></i> Prywatny sprzedawca
          </div>
        </div>

        <div className="col-md-3 text-end">
          <h4 className="fw-bold">
            {data.price.toLocaleString()}{" "}
            <small className="text-muted">PLN</small>
          </h4>

          <button
            className="btn btn-link p-0 mt-3 text-primary fs-4"
            style={{ zIndex: 2, position: "relative" }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <i className="bi bi-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnoucnementListElement;
