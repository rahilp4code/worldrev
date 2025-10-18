import { useEffect, useReducer } from "react";
import { CitiesContext } from "./useCities";

import PropTypes from "prop-types";

CitiesProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

// return actions[action.type]?.() ?? state;

function reducer(state, action) {
  const actions = {
    loading: () => ({ ...state, isLoading: true }),
    citiesLoaded: () => ({
      ...state,
      isLoading: false,
      cities: action.payload,
    }),
    cityAdd: () => ({
      ...state,
      isLoading: false,
      cities: [...state.cities, action.payload],
      currentCity: action.payload,
    }),
    cityDelete: () => ({
      ...state,
      isLoading: false,
      cities: state.cities.filter((city) => city.id !== action.payload),
      currentCity: {},
    }),
    cityLoaded: () => ({
      ...state,
      isLoading: false,
      currentCity: action.payload,
    }),
    rejected: () => ({ ...state, isLoading: false, error: action.payload }),
  };
  return actions[action.type]?.() ?? state;
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

export function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const BASE_URL = "http://localhost:3000";

  useEffect(function () {
    async function fetchCities() {
      // setLoading(true);
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "citiesLoaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error while loading the data",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    // if (number(id) === currentCity.id) return;
    // setLoading(true);
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "cityLoaded", payload: data });
    } catch (err) {
      // alert("There was an error while loading the data");
      dispatch({
        type: "rejected",
        payload: "There was an error while loading the data",
      });
    }
  }

  async function addCity(newCity) {
    // setLoading(true);
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-Type": "application/jso n" },
      });
      const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "cityAdd", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error while posting the data",
      });
    }
  }

  async function deleteCity(id) {
    // setLoading(true);
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "cityDelete", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error while deleting the data",
      });
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
