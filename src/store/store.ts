import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import cartSlice from "./cartSlice";
import loginSlice from "./loginSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    cart: cartSlice.reducer,
    logIn: loginSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["MAKE_PAYMENT", "SIGN_UP", "SIGN_IN"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
