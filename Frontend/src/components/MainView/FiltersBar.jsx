import React, { useEffect } from "react";
import { getCarApiData, getData, getDataParams } from "../../api/getData";
import { useState } from "react";
import {
  carBodyTypes,
  carBrands,
  carFuelTypes,
} from "../data/announcementsFiltersData";

const FiltersBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    bodyType: "",
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: "",
    fuelType: "",
    mileageFrom: "",
    mileageTo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };
  const handleReset = () => {
    setFormData({
      brand: "",
      model: "",
      bodyType: "",
      priceFrom: "",
      priceTo: "",
      yearFrom: "",
      yearTo: "",
      fuelType: "",
      mileageFrom: "",
      mileageTo: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" bg-secondary-subtle  p-3 rounded shadow-sm">
        <div className="row g-2">
          <div className="col-md-2">
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
          <div className="col-md-2">
            <input
              className="form-control"
              type="text"
              placeholder="Model samochodu"
              name="model"
              id="model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="bodyType"
              value={formData.bodyType}
              onChange={handleChange}
            >
              <option value="">Typ nadwozia</option>
              {carBodyTypes.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Cena od"
              name="priceFrom"
              value={formData.priceFrom}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Cena do"
              name="priceTo"
              value={formData.priceTo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Rok od"
              name="yearFrom"
              value={formData.yearFrom}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Rok do"
              name="yearTo"
              value={formData.yearTo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            >
              <option value="">Rodzaj paliwa</option>
              {carFuelTypes.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Przebieg od"
              name="mileageFrom"
              value={formData.mileageFrom}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Przebieg do"
              name="mileageTo"
              value={formData.mileageTo}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 d-flex">
            <button type="submit" className="btn otomotobtn1 me-2">
              Szukaj
            </button>
            <button className="btn otomotobtn2" onClick={handleReset}>
              Wyczyść filtry
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FiltersBar;
