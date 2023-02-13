import { Stack, Typography } from "@mui/material";

const NotFound = (): JSX.Element => {
  return (
    <Stack
      direction={"row"}
      height={"100vh"}
      justifyContent={"center"}
      pt={"15rem"}
      gap={"1rem"}
    >
      <Typography variant={"h2"} color={"primary.main"}>
        404
      </Typography>
      <Typography variant={"h2"} color={"text.primary"}>
        NOT FOUND
      </Typography>
    </Stack>
  );
};

export default NotFound;
