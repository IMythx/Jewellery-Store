import * as yup from "yup";
import { Stack, Stepper, Step, StepLabel } from "@mui/material";
import { useState } from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import AddressForm from "../Components/checkout/addressForm";
import Payment from "../Components/checkout/payment";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { cartItemsSelector } from "../store/cartSlice";

const Checkout = (): JSX.Element => {
  const [activeStep, setActiveSep] = useState<number>(0);

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(cartItemsSelector);

  const onSubmitHandler = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    if (activeStep < 2) {
      setActiveSep((prev: number) => prev + 1);
      actions.setTouched({});
    }

    if (activeStep === 0) {
      actions.setSubmitting(false);
    }

    (activeStep === 1 || activeStep === 2) &&
      dispatch({
        type: "MAKE_PAYMENT",
        payload: {
          lineItems: cartItems.map((item) => {
            return {
              price: item!.priceId,
              quantity: item!.quantity,
            };
          }),
          email: values.email,
          onSubmitFailure: () => actions.setSubmitting(false),
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
          isSubmitting,
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
              isSubmitting={isSubmitting}
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

const initialValues: FormikValues = {
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
