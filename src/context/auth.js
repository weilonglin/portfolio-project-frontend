import React, { createContext, useReducer, useContext } from "react";
import jwtDecode from "jwt-decode";
import { GET_USER } from "../graphql/queries";

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

let user = null;
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  console.log("decoded token", decodedToken.id);
  const expiresAt = new Date(decodedToken.exp * 1000);
  localStorage.setItem("user", decodedToken.id);
  if (new Date() > expiresAt) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } else {
    user = decodedToken;
  }
} else console.log("No token found");

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.id);
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
