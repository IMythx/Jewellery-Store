import { takeEvery, takeLatest } from "redux-saga/effects";
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
  const stripe: Stripe = yield stripePromise;
  console.log(action.payload.lineItems);
  yield stripe.redirectToCheckout({
    mode: "payment",
    lineItems: action.payload.lineItems,
    successUrl: `${window.location.origin}/success`,
    cancelUrl: window.location.origin,
    customerEmail: action.payload.email,
  });
}

export default function* paymentWatcher() {
  yield takeLatest("MAKE_PAYMENT", paymentWorker);
}
