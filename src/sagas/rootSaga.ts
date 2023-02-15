import { spawn } from "redux-saga/effects";
import watchFetchData from "./dataSaga";
import addItemWatcher from "./addItemSaga";
import watchRequests from "./notificationsSaga";
import paymentWatcher from "./paymentSaga";
import signupWatcher from "./signupSaga";
import signinWatcher from "./loginSaga";

export default function* rootSaga() {
  yield spawn(watchFetchData);
  yield spawn(addItemWatcher);
  yield spawn(watchRequests);
  yield spawn(paymentWatcher);
  yield spawn(signupWatcher);
  yield spawn(signinWatcher);
}
