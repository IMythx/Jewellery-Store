import { Stack, Typography } from "@mui/material";

interface Props {
  Icon: React.ReactNode;
  Name: string;
  details: string;
  children?: React.ReactNode;
}

const Service = ({ Icon, Name, details }: Props): JSX.Element => {
  return (
    <Stack
      direction={{
        md: "row",
        xs: "column",
      }}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"0.5rem"}
    >
      {Icon}
      <Stack>
        <Typography
          textAlign={{
            md: "start",
            xs: "center",
          }}
          variant="h6"
          sx={{
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {Name}
        </Typography>
        <Typography
          textAlign={{
            md: "start",
            xs: "center",
          }}
          variant="body1"
          color={"text.secondary"}
        >
          {details}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Service;
