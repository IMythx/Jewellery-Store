import { Stack, SvgIconTypeMap, ThemeOptions, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { createTheme } from "@mui/material";

interface Props {
  Icon: React.ReactNode;
  Name: string;
  details: string;
  children?: React.ReactNode;
}

const theme: ThemeOptions = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 550,
      md: 750,
      lg: 1200,
      xl: 1536,
    },
  },
});

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
