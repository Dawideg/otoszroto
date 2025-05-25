import React, { useEffect, useRef, useState, UseState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../api/getData";

const SingleAnnouncementView = () => {
  const [announcement, setAnnouncement] = useState();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const { id } = useParams();
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;

  useEffect(() => {
    getData(`announcements/${id}`)
      .then((response) => {
        setAnnouncement(response);
        setImages(response.imageUrls.map((img) => `${IMAGES_URL}${img}`));
      })
      .catch((error) => {
        console.error("Error fetching announcement:", error);
      });
  }, [id]);
  if (announcement === undefined) {
    return <div className="container mt-5">Ładowanie ogłoszenia...</div>;
  }
  return (
    <div className="container mt-5 d-flex gap-4">
      {/* Lewa kolumna - zdjęcia */}
      <div style={{ flex: 2 }}>
        <div className="border rounded mb-2">
          <img
            src={images[currentImage]}
            alt="car"
            className="img-fluid w-100"
            style={{ maxHeight: "400px", objectFit: "scale-down" }}
          />
        </div>
        <div className="d-flex gap-2 overflow-auto">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`img-thumbnail ${
                idx === currentImage ? "border-primary" : ""
              }`}
              style={{
                width: "100px",
                height: "70px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => setCurrentImage(idx)}
            />
          ))}
        </div>
      </div>

      {/* Prawa kolumna - dane ogłoszenia */}
      <div style={{ flex: 1 }}>
        <h4>
          {announcement.brand} {announcement.model}
        </h4>
        <p className="text-muted">
          {announcement.yeayearOfProductionr} · {announcement.condition}
        </p>
        <h3 className="text-primary">
          {announcement.price.toLocaleString()} PLN
        </h3>
        <p className="text-secondary">Do negocjacji</p>

        <hr />

        <div className="mb-3"></div>

        <button
          className="btn w-100 mb-3 otomotobtn1"
          onClick={() => setShowNumber(true)}
        >
          {showNumber ? announcement.userData.phoneNumber : "Wyświetl numer"}
        </button>
        <p>{announcement.userData.name}</p>
        <p>{announcement.userData.isCompany ? "Firma" : "Osoba prywatna"}</p>
        <p>
          <a href={`https://www.google.pl/maps/place/${announcement.city}`}>
            {announcement.city}
          </a>
        </p>
      </div>
    </div>
  );
};

export default SingleAnnouncementView;
