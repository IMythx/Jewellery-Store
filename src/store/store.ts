import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import cartSlice from "./cartSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { data: dataSlice.reducer, cart: cartSlice.reducer },
  middleware: (gdfm) => gdfm().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
