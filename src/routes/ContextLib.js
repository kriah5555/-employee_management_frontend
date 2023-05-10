import { useContext, createContext } from "react";

export const AppContext = createContext(false);

export function useAppContext() {
  return useContext(AppContext);
}