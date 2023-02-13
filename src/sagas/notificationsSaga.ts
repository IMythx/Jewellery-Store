import { channel, Channel } from "redux-saga";
import { take, call, put, fork, delay, race } from "redux-saga/effects";
import {
  showNotification,
  addedItemSuccessfully,
  hideNotification,
  item,
} from "../store/cartSlice";

export default function* watchRequests() {
  const chanel: Channel<{}> = yield call(channel);

  for (var i = 0; i < 3; i++) {
    yield fork(handleRequest, chanel);
  }

  while (true) {
    const { payload } = yield take(addedItemSuccessfully.type);
    yield put(chanel, payload);
  }
}

function* handleRequest(chan: Channel<{}>) {
  while (true) {
    const { name }: item = yield take(chan);

    yield delay(150);

    yield put(showNotification(name));

    const { close, expired } = yield race({
      expired: delay(4000),
      close: take(`${name}/CLOSE NOTIFICATION`),
    });

    yield put(hideNotification(name));
  }
}
