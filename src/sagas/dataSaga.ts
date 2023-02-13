import { call, takeEvery, put } from "redux-saga/effects";
import { appStarted, recivedData } from "../store/dataSlice";
import { data } from "../modules/data";

function* fetchData() {
  const products: Promise<data> = yield call(
    fetch,
    "https://jewellery--store-default-rtdb.europe-west1.firebasedatabase.app/data.json"
  );

  const formattedProducts: data = yield products?.json(); //it works well but ts keeps complaining for new reason
  yield put(recivedData(formattedProducts));
}

export default function* watchFetchData() {
  yield takeEvery(appStarted.type, fetchData);
}
