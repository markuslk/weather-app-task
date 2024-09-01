import { useContext } from "react";
import { InputContext, InputContextType } from "../context/InputContext";

export const useInputContext = (): InputContextType => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("Error with input context");
  }
  return context;
};
