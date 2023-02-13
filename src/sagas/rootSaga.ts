import { all } from "redux-saga/effects";
import watchFetchData from "./dataSaga";
import addItemWatcher from "./addItemSaga";
import watchRequests from "./notificationsSaga";
import paymentWatcher from "./paymentSaga";

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    addItemWatcher(),
    watchRequests(),
    paymentWatcher(),
  ]);
}
