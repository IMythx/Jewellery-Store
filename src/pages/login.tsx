import {
  Stack,
  Breadcrumbs,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { FormikValues, Formik } from "formik";
import { Fragment } from "react";

const Login = (): JSX.Element => {
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
          Account
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
        <Typography variant="h6" textAlign={"center"}>
          Login
        </Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <Fragment>
              <Stack gap={"1rem"}>
                <TextField
                  label={"Email"}
                  fullWidth
                  type="text"
                  name={"email"}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched["email"] && !!errors["email"]}
                  helperText={touched["email"] && errors["email"]}
                />
                <TextField
                  type={"password"}
                  label={"Password"}
                  fullWidth
                  name={"password"}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched["password"] && !!errors["password"]}
                  helperText={touched["password"] && errors["password"]}
                />
                <NavLink to={"/account/recover"}>
                  <Typography
                    mt={"-0.5rem"}
                    variant="body2"
                    color={"text.secondary"}
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    Forgot your password?
                  </Typography>
                </NavLink>
              </Stack>
              <Stack
                mx={"auto"}
                gap={"0.5rem"}
                width={"fit-content"}
                alignItems={"center"}
              >
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "105px",
                  }}
                >
                  Sign in
                </Button>
                <NavLink to={"/account/signup"}>
                  <Typography
                    variant="body2"
                    color={"text.secondary"}
                    sx={{
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    Create Account
                  </Typography>
                </NavLink>
              </Stack>
            </Fragment>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
};

export default Login;

const validationSchema = yup.object().shape({
  email: yup.string().email().required("required"),
  password: yup.string().required("required"),
});

const initialValues: FormikValues = {
  email: "",
  password: "",
};
