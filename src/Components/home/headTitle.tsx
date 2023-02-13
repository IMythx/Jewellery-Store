import { Typography, useMediaQuery } from "@mui/material";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const Title = ({ title }: Props): JSX.Element => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Typography
      variant={isMobile ? "h5" : "h4"}
      sx={{
        mb: 3,
      }}
    >
      {title}
    </Typography>
  );
};

export default Title;
