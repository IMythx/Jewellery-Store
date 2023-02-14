import { Alert, Box, AlertTitle } from "@mui/material";

const Success = (): JSX.Element => {
  return (
    <Box
      m="90px auto"
      width="80%"
      height="50vh"
      sx={{
        "& .MuiPaper-root.MuiAlert-root": {
          bgcolor: "#202020a8 !important",
        },
      }}
    >
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Success;
