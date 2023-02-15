import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { loggedIn } from "../store/loginSlice";

interface response {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

interface payload {
  userName: string;
  email: string;
  password: string;
  onSubbmitFailure: (type: string, message: string) => void;
  onSubbmitSuccess: () => void;
}

interface ErrorMessage {
  error: {
    code: number;
    message: string;
    errors: {
      [key: string]: string;
    }[];
  };
}

function* signinWorker(action: PayloadAction<payload>) {
  try {
    const response: Response = yield call(
      fetch,
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC6bhRAXdfT2jp7USW1_MD2ADyhIUA4yA",
      {
        method: "POST",
        body: JSON.stringify({
          email: action.payload.email,
          password: action.payload.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorMessage: ErrorMessage = yield response.json();

      errorMessage.error.message.toLowerCase().includes("email") &&
        action.payload.onSubbmitFailure("email", errorMessage.error.message);

      errorMessage.error.message.toLowerCase().includes("password") &&
        action.payload.onSubbmitFailure("password", errorMessage.error.message);
    } else {
      action.payload.onSubbmitSuccess();

      yield put(loggedIn(action.payload.userName));
    }
  } catch (e) {}
}

export default function* signinWatcher() {
  yield takeEvery("SIGN_IN", signinWorker);
}
