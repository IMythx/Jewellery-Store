import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface item {
  name: string;
  imgSrc: string;
  price: number;
  priceId: string;
  brand: string;
  quantity: number;
}
interface SliceState {
  cartItems: item[];
  total: number;
  itemsAreBeingAdded: string[];
  notificationsName: (string | undefined)[];
}

const initialState = {
  cartItems: [],
  total: 0,
  itemsAreBeingAdded: [],
  notificationsName: [],
} as SliceState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<item>) {
      state.itemsAreBeingAdded.push(action.payload.name);
    },
    addedItemSuccessfully(state, action: PayloadAction<item>) {
      const { quantity, price, name } = action.payload;

      state.cartItems.push(action.payload);

      state.total = state.total + price * quantity;

      state.itemsAreBeingAdded = state.itemsAreBeingAdded.filter(
        (item) => item !== name
      );
    },
    incrementByOne(state, action: PayloadAction<string>) {
      const item = state.cartItems.findIndex(
        (item) => item.name === action.payload
      );

      state.cartItems[item].quantity++;

      state.total = state.total + state.cartItems[item].price;
    },
    decrementByOne(state, action: PayloadAction<string>) {
      const item = state.cartItems.findIndex(
        (item) => item.name === action.payload
      );
      state.total = state.total - state.cartItems[item].price;

      if (state.cartItems[item].quantity > 1) {
        state.cartItems[item].quantity--;
        return;
      }

      state.cartItems = state.cartItems.filter(
        (item) => item.name !== action.payload
      );
    },
    removeItem(state, action: PayloadAction<string>) {
      const item = state.cartItems.findIndex(
        (item) => item.name === action.payload
      );

      state.total =
        state.total -
        state.cartItems[item].price * state.cartItems[item].quantity;

      state.cartItems = state.cartItems.filter(
        (item) => item.name !== action.payload
      );
    },
    showNotification(state, action: PayloadAction<string>) {
      state.notificationsName.push(action.payload);
    },
    hideNotification(state, action: PayloadAction<string>) {
      // here i have to let the index of item filled with
      //undefined instead of removing it from array even after removing the notify name

      //this because if i remove the notify name from the array it will give a bad user experince
      //because for react it will be always be the third notify which is removed even if i meant to
      //hide first or second notify

      //to make it more clear lets say i removed first notify so react will give second
      //notify index 1 and third notify index 2 and will find that index 3 is empty
      //so react will show to the user that third notify which is unmounted

      const itemIndex = state.notificationsName.findIndex(
        (item) => item === action.payload
      );
      state.notificationsName[itemIndex] = undefined;

      //but now for react first notify is undefined so it will get unmounted
      //but second and third notify still have thier proper index so it will work correctly
    },
  },
});

export default cartSlice;
export const {
  incrementByOne,
  decrementByOne,
  removeItem,
  addItem,
  addedItemSuccessfully,
  showNotification,
  hideNotification,
} = cartSlice.actions;

export const cartItemsSelector = createSelector(
  (state: RootState) => state.cart.cartItems,
  (cartItems) => cartItems
);

export const itemIsBeingAddedSelector = createSelector(
  (state: RootState, name: string) =>
    state.cart.itemsAreBeingAdded.findIndex((item: string) => item === name),
  (index) => (index !== -1 ? true : false)
);

export const isItemInCartSelector = createSelector(
  (state: RootState, name: string) =>
    state.cart.cartItems.findIndex((item) => item.name === name),
  (index) => (index !== -1 ? true : false)
);
