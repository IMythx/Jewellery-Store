import {
  Stack,
  Breadcrumbs,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { FormikValues, Formik, FormikHelpers } from "formik";
import { Fragment, useState } from "react";
import { LoadingButton } from "@mui/lab";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  useAppDispatch,
  useAppSelector,
  useStableNavigate,
} from "../hooks/hooks";
import { logout } from "../store/loginSlice";

const Login = (): JSX.Element => {
  const [signInErrorMessage, setSignInErrorMessage] = useState<{
    type: string;
    message: string;
  }>();

  const dispatch = useAppDispatch();

  const navigate = useStableNavigate();

  const isLoggedIn = useAppSelector((state) => state.logIn.isLoggedIn);

  const userName = useAppSelector((state) => state.logIn.userName);

  const onSubmitHandler = (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    dispatch({
      type: "SIGN_IN",
      payload: {
        userName: values.email.slice(0, values.email.indexOf("@")),
        email: values.email,
        password: values.password,
        onSubbmitFailure: (type: string, message: string) => {
          setSignInErrorMessage(
            (prev) =>
              (prev = {
                type,
                message,
              })
          );
          actions.setSubmitting(false);
        },
        onSubbmitSuccess: () => {
          navigate("/");
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
        {!isLoggedIn && (
          <Fragment>
            <Typography variant="h5" textAlign={"center"}>
              Login
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
                      label={"Email"}
                      fullWidth
                      type="text"
                      name={"email"}
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched["email"] &&
                        (!!errors["email"] ||
                          signInErrorMessage?.type === "email")
                      }
                      helperText={
                        touched["email"] &&
                        ((typeof errors["email"] === "string" &&
                          errors["email"]) ||
                          (signInErrorMessage?.type === "email" &&
                            signInErrorMessage.message
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
                          signInErrorMessage?.type === "password")
                      }
                      helperText={
                        touched["password"] &&
                        ((typeof errors["password"] === "string" &&
                          errors["password"]) ||
                          (signInErrorMessage?.type === "password" &&
                            signInErrorMessage.message
                              .toLowerCase()
                              .replaceAll("_", " ")))
                      }
                    />
                    <NavLink to="">
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
                    <LoadingButton
                      variant="contained"
                      sx={{
                        minWidth: "105px",
                      }}
                      loading={isSubmitting}
                      onClick={() => handleSubmit()}
                    >
                      Sign in
                    </LoadingButton>
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
          </Fragment>
        )}
        {isLoggedIn && (
          <Fragment>
            <Typography variant="h4" textAlign={"center"}>
              welcome {userName} !
            </Typography>
            <Button variant="contained" onClick={() => dispatch(logout())}>
              <LogoutIcon /> Logout
            </Button>
          </Fragment>
        )}
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
