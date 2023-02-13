import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { data } from "../modules/data";

interface SliceState {
  loading: boolean;
  data: data;
  shopItems: data;
}
const initialState = {
  loading: true,
  data: {},
  shopItems: {},
} as SliceState;
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    appStarted(state) {
      state.loading = true;
    },
    recivedData(state, action: PayloadAction<data>) {
      state.data = action.payload;
      state.shopItems = action.payload;
      state.loading = false;
    },
    filter(state) {
      const brandsFilters = new URLSearchParams(location.search).getAll(
        "BRAND"
      );
      const priceFilters =
        new URLSearchParams(location.search).getAll("PRICE").length > 0
          ? new URLSearchParams(location.search).getAll("PRICE")[0].split("-")
          : [];

      const colorsFilters = new URLSearchParams(location.search).getAll(
        "COLOR"
      );

      let filteredItems = Object.entries(state.data);

      brandsFilters.length &&
        (filteredItems = filteredItems.filter(
          (item) =>
            brandsFilters.indexOf(state.data[`${item[0]}`]["brand"]) !== -1
        ));

      priceFilters.length &&
        (filteredItems = filteredItems.filter(
          (item) =>
            +state.data[`${item[0]}`]["price"] >= +priceFilters[0] &&
            +state.data[`${item[0]}`]["price"] <= +priceFilters[1]
        ));

      colorsFilters.length &&
        (filteredItems = filteredItems.filter(
          (item) =>
            colorsFilterHelper(state.data, colorsFilters, item[0]) != false
        ));

      state.shopItems = Object.fromEntries(filteredItems);
    },
  },
});

export default dataSlice;
export const { appStarted, recivedData, filter } = dataSlice.actions;

const colorsFilterHelper = (
  data: data,
  filters: string[] = [],
  item: string
) => {
  let isMatching = false;
  data[`${item}`]["colors"].forEach((color: string) => {
    if (filters.indexOf(color) !== -1) {
      isMatching = true;
    }
  });
  return isMatching;
};

export const productsSelector = createSelector(
  (state: RootState) => state.data.shopItems,
  (data) => data
);

export const loadingSelector = createSelector(
  (state: RootState) => state.data.loading,
  (loading: boolean) => loading
);

export const dataSelector = createSelector(
  (state: RootState) => state.data.data,
  (data) => data
);
