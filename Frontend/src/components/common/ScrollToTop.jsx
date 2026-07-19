import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Przewija okno na samą górę
    window.scrollTo(0, 0);
  }, [pathname]); // Uruchamia się przy każdej zmianie ścieżki (URL)

  return null; // Komponent nic nie renderuje, działa w tle
};

export default ScrollToTop;
