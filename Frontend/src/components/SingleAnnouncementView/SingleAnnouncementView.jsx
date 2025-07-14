import React, { useEffect, useRef, useState, UseState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser, getData } from "../../api/getData";
import ChatWidget from "./ChatWidget";
import { getDataBodyType } from "../../api/getData";
import AnnouncementBox from "./AnnouncementBox";
import UsersChat from "../chat/UsersChat";
const SingleAnnouncementView = () => {
  const [announcement, setAnnouncement] = useState();
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const { id } = useParams();
  const [feedAnnouncements, setFeedAnnouncements] = useState([]);
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
  const [showChat, setShowChat] = useState(false);
  const [initialReceiverId, setInitialReceiverId] = useState(null);

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
  useEffect(() => {
    getDataBodyType("announcements", announcement?.bodyType)
      .then((data) => {
        setFeedAnnouncements(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [announcement]);
  if (announcement === undefined) {
    return <div className="container mt-5">Ładowanie ogłoszenia...</div>;
  }
  return (
    <div className="container mt-5">
      {/* Górna sekcja: zdjęcia + dane ogłoszenia */}
      <div className="row">
        {/* Zdjęcia */}
        <div className="col-lg-7 mb-4">
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

        {/* Dane ogłoszenia */}
        <div className="col-lg-5 mb-4">
          <h2 className="fw-bold mb-2">
            {announcement.brand} {announcement.model}
          </h2>
          <p className="text-muted">
            {announcement.yearOfProduction} · {announcement.condition}
          </p>
          <h3 className="text-primary">
            {announcement.price.toLocaleString()} PLN
          </h3>
          <p className="text-secondary">Do negocjacji</p>

          <button
            className="btn btn-primary w-100 mb-3"
            onClick={() => setShowNumber(true)}
          >
            {showNumber ? announcement.userData.phoneNumber : "Wyświetl numer"}
          </button>
          <h3>
            {announcement.userData.name} {announcement.userData.surname}
          </h3>
          <p>{announcement.userData.isCompany ? "Firma" : "Osoba prywatna"}</p>
          <p>
            <a
              href={`https://www.google.pl/maps/place/${announcement.city}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {announcement.city}
            </a>
          </p>
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => {
              setInitialReceiverId(announcement.userData.id);
              setShowChat(true);
            }}
          >
            Napisz do sprzedawcy
          </button>

          {/* Chat Widget */}
          <ChatWidget
            brand={announcement.brand}
            model={announcement.model}
            desc={announcement.description}
            price={announcement.price}
            yearOfProduction={announcement.yearOfProduction}
            engine={announcement.engineCapacity}
          />
        </div>
      </div>

      <div className="mt-5">
        <h4 className="fw-bold mb-3">Najważniejsze:</h4>
        <div className="row text-center mb-4">
          <div className="col-6 col-md-2 mb-3">
            <div className="fw-bold">{announcement.mileage}</div>
            <small>Przebieg</small>
          </div>
          <div className="col-6 col-md-2 mb-3">
            <div className="fw-bold">{announcement.fuelType}</div>
            <small>Rodzaj paliwa</small>
          </div>
          <div className="col-6 col-md-2 mb-3">
            <div className="fw-bold">{announcement.gearbox}</div>
            <small>Skrzynia biegów</small>
          </div>
          <div className="col-6 col-md-2 mb-3">
            <div className="fw-bold">{announcement.bodyType}</div>
            <small>Typ nadwozia</small>
          </div>
          <div className="col-6 col-md-2 mb-3">
            <div className="fw-bold">{announcement.engineCapacity} cm³</div>
            <small>Pojemność</small>
          </div>
          <div className="col-6 col-md-2 mb-3">
            <div className="fw-bold">{announcement.horsepower} KM</div>
            <small>Moc</small>
          </div>
        </div>

        <hr />

        <h5 className="fw-bold mt-4">Opis</h5>
        <div style={{ whiteSpace: "pre-line" }}>{announcement.description}</div>

        <div className="text-danger fw-bold" style={{ cursor: "pointer" }}>
          Zgłoś
        </div>
        <h4 className="fw-bold mb-3 mt-4">Zobacz także:</h4>
        <div>
          {feedAnnouncements
            ? feedAnnouncements.map(
                (item) =>
                  item.id != announcement.id && (
                    <AnnouncementBox key={item.id} announcement={item} />
                  )
              )
            : "Ładowanie podobnych ogłoszeń..."}
        </div>
      </div>
      {showChat && (
        <div
          className="position-fixed bottom-0 end-0 m-4 border bg-white shadow rounded"
          style={{ width: "400px", height: "500px", zIndex: 1050 }}
        >
          {/* Nagłówek */}
          <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light rounded-top">
            <strong>Czat</strong>
            <button
              type="button"
              className="btn-close"
              aria-label="Zamknij"
              onClick={() => setShowChat(false)}
            ></button>
          </div>

          {/* Treść */}
          <div className="h-100 overflow-hidden">
            <UsersChat receiverId={initialReceiverId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleAnnouncementView;
