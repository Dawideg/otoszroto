import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  carBrands,
  carBodyTypes,
  carFuelTypes,
  carGearboxTypes,
  carCondition,
  carPowerTrain,
} from "../data/announcementsFiltersData";
import { addAnnouncement } from "../../api/getData";

const AddAnnouncementView = () => {
  const [formData, setFormData] = useState({
    price: "",
    description: "",
    city: "",
    brand: "",
    model: "",
    version: "",
    generation: "",
    bodyType: "",
    mileage: "",
    engineCapacity: "",
    horsepower: "",
    gearbox: "",
    powertrain: "",
    fuelType: "",
    yearOfProduction: "",
    vinNumber: "",
    condition: "",
    accidentFree: false,
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const generateAIDescription = async () => {
    const aiQuery = `Sprzedajesz samochód na platformie ogłoszeniowej - wygeneruj opis ogłoszenia samochodu.
  
  Marka: ${formData.brand}
  Model: ${formData.model}
  Rok produkcji: ${formData.yearOfProduction}
  Nadwozie: ${formData.bodyType}
  Przebieg: ${formData.mileage} km
  Pojemność: ${formData.engineCapacity} cm3
  Moc: ${formData.horsepower} KM
  Paliwo: ${formData.fuelType}
  Skrzynia: ${formData.gearbox}
  Napęd: ${formData.powertrain}
  
  Napisz krótki opis (3-5 zdań) po polsku. Nie używaj markdown, pogrubień ani punktów, nie dodawaj żadnego wstępu i zakończenia. `;
  
    try {
      const response = await fetch("https://localhost:7067/api/deepseek/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: aiQuery }),
      });
  
      if (!response.ok) {
        throw new Error("Błąd podczas generowania opisu.");
      }

      const data = await response.text();
      setFormData((prev) => ({ ...prev, description: data, }));
  
      return await response.text();
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się wygenerować opisu.");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      if (key === "accidentFree") {
        form.append(key, formData[key] ? "true" : "false");
      } else {
        form.append(key, formData[key]);
      }
    }
    images.forEach((file) => form.append("Images", file));

    addAnnouncement(form)
      .then(() => {
        toast.success("Ogłoszenie dodane!", {
          onClose: () => {
            window.location.href = "/";
          },
          autoClose: 1000,
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const canGenerateDescription =
  formData.brand &&
  formData.model &&
  formData.yearOfProduction &&
  formData.bodyType &&
  formData.mileage &&
  formData.engineCapacity &&
  formData.horsepower &&
  formData.fuelType &&
  formData.gearbox &&
  formData.powertrain;
  return (
    <div className="container mt-5 shadow p-4">
      <h3>Dodaj ogłoszenie</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Marka</label>
          <select
            className="form-select"
            onChange={handleChange}
            value={formData.brand}
            name="brand"
          >
            <option value="">Marka samochodu</option>
            {carBrands.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Model</label>
          <input
            type="text"
            className="form-control"
            name="model"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Wersja</label>
          <input
            type="text"
            className="form-control"
            name="version"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Generacja</label>
          <input
            type="text"
            className="form-control"
            name="generation"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Typ nadwozia</label>
          <select
            className="form-select"
            onChange={handleChange}
            value={formData.bodyType}
            name="bodyType"
          >
            <option value="">Typ nadwozia</option>
            {carBodyTypes.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Cena (PLN)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Przebieg (km)</label>
          <input
            type="number"
            className="form-control"
            name="mileage"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Pojemność silnika (cm³)</label>
          <input
            type="number"
            className="form-control"
            name="engineCapacity"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Moc (KM)</label>
          <input
            type="number"
            className="form-control"
            name="horsepower"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Rodzaj paliwa</label>
          <select
            className="form-select"
            onChange={handleChange}
            value={formData.fuelType}
            name="fuelType"
          >
            <option value="">Rodzaj paliwa</option>
            {carFuelTypes.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Skrzynia biegów</label>
          <select
            className="form-select"
            onChange={handleChange}
            value={formData.gearbox}
            name="gearbox"
          >
            <option value="">Skrzynia biegów</option>
            {carGearboxTypes.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Napęd</label>
          <select
            className="form-select"
            onChange={handleChange}
            value={formData.powertrain}
            name="powertrain"
          >
            <option value="">Napęd</option>
            {carPowerTrain.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Rok produkcji</label>
          <input
            type="number"
            className="form-control"
            name="yearOfProduction"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Numer VIN</label>
          <input
            type="text"
            className="form-control"
            name="vinNumber"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Stan</label>
          <select
            className="form-select"
            onChange={handleChange}
            value={formData.condition}
            name="condition"
          >
            <option value="">Stan</option>
            {carCondition.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
  <div className="d-flex justify-content-between align-items-center mb-2">
    <label className="form-label mb-0">Opis</label>

    <button
      type="button"
      className={`btn ${
        canGenerateDescription ? "btn-primary" : "btn-secondary"
      } rounded-pill px-4 fw-semibold`}
      disabled={!canGenerateDescription}
      onClick={generateAIDescription}
    >
      🤖 Wygeneruj opis AI
    </button>
  </div>

  {!canGenerateDescription && (
    <small className="text-muted d-block mb-2">
      Uzupełnij podstawowe dane samochodu, aby wygenerować opis.
    </small>
  )}

  <textarea
    className="form-control"
    name="description"
    rows="6"
    value={formData.description}
    onChange={handleChange}
  />
</div>

        <div className="col-md-6">
          <label className="form-label">Miasto</label>
          <input
            type="text"
            className="form-control"
            name="city"
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 d-flex align-items-center">
          <div className="form-check mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="accidentFree"
              id="accidentFree"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="accidentFree">
              Bezwypadkowy
            </label>
          </div>
        </div>

        <div className="col-12">
          <div className="mb-3">
            <label className="form-label">Zdjęcia</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="form-control"
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>
        </div>

        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary w-100">
            Dodaj ogłoszenie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnnouncementView;
