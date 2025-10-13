import { createContext, useContext } from "react";
export const CitiesContext = createContext();

export default function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Context is outside of Provider");
  return context;
}
