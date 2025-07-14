import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const AnnouncementBox = ({ announcement }) => {
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
  return (
    <Link
      to={`/announcement/${announcement.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="card shadow-sm" style={{ width: "15rem" }}>
        <img
          src={`${IMAGES_URL}${announcement.imageUrls[0]}`}
          className="card-img-top"
          alt="image"
        />
        <div className="card-body">
          <h5 className="card-title">
            {announcement.brand} {announcement.model}
          </h5>
          <p className="card-text mb-1 text-muted">
            {announcement.yearOfProduction} · {announcement.mileage} km ·{" "}
            {announcement.fuelType}
          </p>
          <p className="card-text mb-1 text-muted">
            <i className="bi bi-geo-alt"></i> {announcement.city}
          </p>
          <h5 className="text-danger fw-bold">{announcement.price} PLN</h5>
        </div>
      </div>
    </Link>
  );
};

export default AnnouncementBox;
