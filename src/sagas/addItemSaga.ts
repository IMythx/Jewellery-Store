import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import { addItem, addedItemSuccessfully, item } from "../store/cartSlice";

function* addItemWorker(action: PayloadAction<item>) {
  const { payload } = action;
  //send item to the backend
  //i will simulate it with delay effect
  yield delay(500);

  yield put(addedItemSuccessfully(payload));
}

export default function* addItemWatcher() {
  yield takeEvery(addItem.type, addItemWorker);
}
