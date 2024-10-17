import { useContext } from "react";
import { StoreContext } from "@/context/Store.tsx";

export const useStoreContext = () => {
  return useContext(StoreContext);
};
