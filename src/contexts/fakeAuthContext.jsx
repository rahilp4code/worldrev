import PropTypes from "prop-types";
import { AuthContext } from "./useAuth";
import { useReducer } from "react";

//  states to context api with reducer

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function reducer(state, action) {
  const actions = {
    login: () => ({ ...state, user: action.payload, isAuthenticated: true }),
    logout: () => ({ ...state, user: null, isAuthenticated: false }),
  };
  return actions[action.type]?.() ?? state;
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Zoro",
  email: "zoro@example.com",
  password: "qwerty",
  avatar: "/image.png",
};

export function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    console.log("hello");
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
