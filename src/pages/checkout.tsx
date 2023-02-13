import * as yup from "yup";
import { Stack, Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import AddressForm from "../Components/checkout/addressForm";
import Payment from "../Components/checkout/payment";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { cartItemsSelector } from "../store/cartSlice";

const Checkout = (): JSX.Element => {
  const [activeStep, setActiveSep] = useState<number>(0);

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(cartItemsSelector);

  const onSubmitHandler = (values: { [key: string]: string }) => {
    activeStep < 2 && setActiveSep((prev: number) => prev + 1);

    activeStep === 1 &&
      dispatch({
        type: "MAKE_PAYMENT",
        payload: {
          lineItems: cartItems.map((item) => {
            console.log(item!.priceId);
            return {
              price: item!.priceId,
              quantity: item!.quantity,
            };
          }),
          email: values.email,
        },
      });
  };

  const onBackHandler = () => setActiveSep(0);
  return (
    <Stack px={8}>
      <Stepper
        activeStep={activeStep}
        sx={{
          "& > *": {
            px: 0,
          },
        }}
      >
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Formik
        validationSchema={validationSechema[activeStep]}
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) =>
          activeStep === 0 ? (
            <AddressForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Payment
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onBackHandler={onBackHandler}
            />
          )
        }
      </Formik>
    </Stack>
  );
};

export default Checkout;

const validationSechema = [
  yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    country: yup.string().required("required"),
    street1: yup.string().required("required"),
    street2: yup.string(),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    zipCode: yup.string().required("required"),
  }),
  yup.object().shape({
    email: yup.string().email().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const initialValues = {
  firstName: "",
  lastName: "",
  country: "",
  street1: "",
  street2: "",
  city: "",
  state: "",
  zipCode: "",
  email: "",
  phoneNumber: "",
};