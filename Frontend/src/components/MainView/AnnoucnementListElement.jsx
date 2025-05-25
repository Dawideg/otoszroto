import React from "react";
import { Link } from "react-router-dom";

const AnnoucnementListElement = ({ data }) => {
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

  return (
    <Link to={`/announcement/${data.id}`} style={{ textDecoration: "none" }}>
      <div className="card mb-3 p-3 bg-light shadow-sm rounded">
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
              {data.engineCapacity}cm<sup>3</sup> • {data.horsepower}KM •{" "}
              {data.version}{" "}
            </p>
            <ul className="list-inline text-muted small">
              <li className="list-inline-item">
                <i className="bi bi-speedometer2"></i> {data.mileage} km
              </li>
              <li className="list-inline-item">
                <i className="bi bi-fuel-pump"></i> {data.fuelType}
              </li>
              <li className="list-inline-item">
                <i className="bi bi-gear"></i> {data.gearbox}
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
            <i className="bi bi-heart fs-4 mt-3 d-block text-primary"></i>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnnoucnementListElement;
