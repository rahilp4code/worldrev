import { useState, useEffect } from "react";
import { CitiesContext } from "./useCities";

import PropTypes from "prop-types";

CitiesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  const BASE_URL = "http://localhost:3000";

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("There was an error while loading the data");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert("There was an error while loading the data");
    } finally {
      setLoading(false);
    }
  }

  async function addCity(newCity) {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-Type": "application/jso n" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      alert("There was an error while posting the data");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert("There was an error while posting the data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// export { CitiesProvider, useCities };
// fast refresh eslint error
