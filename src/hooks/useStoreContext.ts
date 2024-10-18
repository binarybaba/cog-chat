import { useContext } from "react";
import { StoreContext } from "@/context/Store.tsx";

/**
 * Just a handy hook to use the context and not keep importing
 */
export const useStoreContext = () => {
  return useContext(StoreContext);
};
