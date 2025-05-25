import React, { useState } from "react";
import { getData, getDataParams } from "../../api/getData";
import { data } from "react-router-dom";
import AnnoucnementListElement from "./AnnoucnementListElement";
import NavigationSection from "./NavigationSection";
import FiltersBar from "./FiltersBar";

const CarListView = () => {
  const [announcements, setAnnouncements] = useState([]);

  useState(() => {
    getData("announcements")
      .then((data) => {
        setAnnouncements(data);
        console.log("Pobrane ogłoszenia:", data);
      })
      .catch((error) => {
        console.error("Błąd pobierania ogłoszeń:", error);
      });
  }, []);
  const handleSearch = (filters) => {
    getDataParams("announcements", filters)
      .then((data) => {
        setAnnouncements(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <FiltersBar onSearch={handleSearch} />
      <div className="container mt-5">
        {announcements &&
          announcements.map((el, idx) => (
            <AnnoucnementListElement data={el} key={idx} />
          ))}
      </div>
    </div>
  );
};

export default CarListView;
