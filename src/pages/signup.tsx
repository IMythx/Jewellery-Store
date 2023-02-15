import { Stack, Breadcrumbs, Typography, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { Fragment, useState } from "react";
import { useAppDispatch, useStableNavigate } from "../hooks/hooks";

const Signup = (): JSX.Element => {
  const [signupErrorMessage, setSignupErrorMessage] = useState<{
    type: string;
    message: string;
  }>();

  const dispatch = useAppDispatch();

  const navigate = useStableNavigate();

  const onSubmitHandler = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    dispatch({
      type: "SIGN_UP",
      payload: {
        email: values.email,
        password: values.password,
        onSubbmitFailure: (type: string, message: string) => {
          setSignupErrorMessage(
            (prev) =>
              (prev = {
                type,
                message,
              })
          );
          actions.setSubmitting(false);
        },
        onSubbmitSuccess: () => {
          navigate("/account/login");
        },
      },
    });
  };
  return (
    <Stack>
      <Breadcrumbs
        sx={{
          bgcolor: "#434343",
          py: {
            between: 5,
            xs: 2,
          },
          "& .MuiBreadcrumbs-ol": {
            justifyContent: "center",
          },
          "& a": {
            textDecoration: "none",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "primary.main",
            },
          },
        }}
      >
        <NavLink to={"/"}>
          <Typography variant="h6" color={"text.secondary"}>
            Home
          </Typography>
        </NavLink>
        <Typography variant="h6" color={"text.primary"}>
          Create Account
        </Typography>
      </Breadcrumbs>
      <Stack
        my={{
          md: 14,
          xs: 10,
        }}
        gap={"2rem"}
        width={"500px"}
        maxWidth={"90%"}
        mx={"auto"}
        sx={{
          "& a": {
            textDecoration: "none",
            color: "text.primary",
          },
        }}
      >
        <Typography variant="h5" textAlign={"center"}>
          Create Account
        </Typography>
        <Formik
          validationSchema={validationSchema}
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
          }) => (
            <Fragment>
              <Stack gap={"1rem"}>
                <TextField
                  label={"First Name"}
                  fullWidth
                  type="text"
                  name={"firstName"}
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched["firstName"] && !!errors["firstName"]}
                  helperText={
                    touched["firstName"] &&
                    typeof errors["firstName"] === "string" &&
                    errors["firstName"]
                  }
                />
                <TextField
                  label={"Last Name"}
                  fullWidth
                  type="text"
                  name={"lastName"}
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched["lastName"] && !!errors["lastName"]}
                  helperText={
                    touched["lastName"] &&
                    typeof errors["lastName"] === "string" &&
                    errors["lastName"]
                  }
                />
                <TextField
                  label={"Email"}
                  fullWidth
                  type="text"
                  name={"email"}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched["email"] &&
                    (!!errors["email"] || signupErrorMessage?.type === "email")
                  }
                  helperText={
                    touched["email"] &&
                    ((typeof errors["email"] === "string" && errors["email"]) ||
                      (signupErrorMessage?.type === "email" &&
                        signupErrorMessage.message
                          .toLowerCase()
                          .replaceAll("_", " ")))
                  }
                />
                <TextField
                  type={"password"}
                  label={"Password"}
                  fullWidth
                  name={"password"}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    touched["password"] &&
                    (!!errors["password"] ||
                      signupErrorMessage?.type === "password")
                  }
                  helperText={
                    touched["password"] &&
                    ((typeof errors["password"] === "string" &&
                      errors["password"]) ||
                      (signupErrorMessage?.type === "password" &&
                        signupErrorMessage.message
                          .toLowerCase()
                          .replaceAll("_", " ")))
                  }
                />
              </Stack>
              <Stack
                mx={"auto"}
                gap={"0.5rem"}
                width={"fit-content"}
                alignItems={"center"}
              >
                <LoadingButton
                  sx={{
                    minWidth: "105px",
                  }}
                  variant="contained"
                  fullWidth
                  loading={isSubmitting}
                  onClick={() => handleSubmit()}
                >
                  Sign up
                </LoadingButton>
              </Stack>
            </Fragment>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default Signup;

const validationSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  password: yup.string().required("required"),
});

const initialValues: FormikValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
