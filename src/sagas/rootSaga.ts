import { all, spawn } from "redux-saga/effects";
import watchFetchData from "./dataSaga";
import addItemWatcher from "./addItemSaga";
import watchRequests from "./notificationsSaga";
import paymentWatcher from "./paymentSaga";

export default function* rootSaga() {
  yield spawn(watchFetchData);
  yield spawn(addItemWatcher);
  yield spawn(watchRequests);
  yield spawn(paymentWatcher);
}
