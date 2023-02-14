import { takeEvery } from "redux-saga/effects";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { PayloadAction } from "@reduxjs/toolkit";

const stripePromise = loadStripe(
  "pk_test_51MW4YXAQqTLhXS8keuq7k5CBqJFUdiptkXELRmCUUE4ti3jlZYPE309w5DAc4usOf3lQx7BC7wJx4W70uwPCcTQJ00j5wqVa4t"
);

interface actionPayload {
  lineItems: { price: string; quantity: number }[];
  email: string;
}

function* paymentWorker(action: PayloadAction<actionPayload>) {
  try {
    const stripe: Stripe = yield stripePromise;
    yield stripe.redirectToCheckout({
      mode: "payment",
      lineItems: action.payload.lineItems,
      successUrl: `${window.location.origin}/checkout/success`,
      cancelUrl: window.location.origin,
      customerEmail: action.payload.email,
    });
  } catch (e) {
    console.log(e);
    console.log("hello");
  }
}

export default function* paymentWatcher() {
  yield takeEvery("MAKE_PAYMENT", paymentWorker);
}
