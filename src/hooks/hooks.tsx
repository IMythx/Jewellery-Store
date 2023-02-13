import type { RootState } from "../store/store";
import type { AppDispatch } from "../store/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import React, {
  createContext,
  useContext,
  useRef,
  MutableRefObject,
} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//this useNavigate will rerender the component once incase u navigate to
//the same route(e.g when you are applying a filter and will add a query
//parameter to your path) unlike the normal useNavigate which rerenders
//the component twice for some reason

const StableNavigateContext =
  createContext<MutableRefObject<NavigateFunction> | null>(null);

const StableNavigateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  return (
    <StableNavigateContext.Provider value={navigateRef}>
      {children}
    </StableNavigateContext.Provider>
  );
};

const useStableNavigate = (): NavigateFunction => {
  const navigateRef = useContext(StableNavigateContext);
  return navigateRef!.current;
};

export { StableNavigateContextProvider, useStableNavigate };
