import { createContext, useContext } from "react";
export const AuthContext = createContext();

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Context is outside of Provider");
  return context;
}
