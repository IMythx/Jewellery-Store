import {
  Stack,
  Breadcrumbs,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";

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
        <Stack gap={"1rem"}>
          <TextField label={"Email"} fullWidth />
          <TextField type={"password"} label={"Password"} fullWidth />
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
            <Typography variant="body2" color={"text.secondary"}>
              Create Account
            </Typography>
          </NavLink>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
