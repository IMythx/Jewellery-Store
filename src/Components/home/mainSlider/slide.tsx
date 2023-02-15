import { Box, Stack, Button, Slide, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import image1 from "../../../assets/banner1.jpg";
import image2 from "../../../assets/banner2.jpg";
import image3 from "../../../assets/banner3.jpg";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
interface Props {
  currentSlide: number;
  title: string;
  desc: string;
  index: number;
  children?: React.ReactNode;
}

const ImageSlide = ({
  currentSlide,
  index,
  title,
  desc,
}: Props): JSX.Element => {
  const container = useRef<HTMLDivElement>();

  const imgsArray = [image1, image2, image3];

  const isTablet = useMediaQuery("(max-width:800px)");

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      ref={(reff) => (reff = container)}
      sx={{
        outline: "none",
        position: "relative",
      }}
    >
      <img
        style={{
          width: "100%",
        }}
        src={imgsArray[index]}
        alt="banner"
      />

      <Slide
        container={container.current}
        direction="down"
        in={currentSlide === index}
        mountOnEnter
        unmountOnExit
        timeout={400}
      >
        <Stack
          sx={{
            width: {
              sm: "50%",
              xs: "70%",
            },
            position: "absolute",
            right: {
              sm: "5%",
              xs: "0%",
            },
            top: {
              md: "9vw",
              sm: "4vw",
              miniTablet: "6vw",
              xs: "2vw",
            },
            alignItems: "center",
            rowGap: {
              md: 2,
              sm: 1,
              xs: 0.7,
            },
          }}
        >
          <Typography
            variant={isTablet ? (isMobile ? "h6" : "h5") : "h3"}
            fontWeight={{
              sm: "700",
              xs: "500",
            }}
            textAlign={"center"}
          >
            {title}
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h5"}
            width={{
              xs: "80%",
            }}
            textAlign={"center"}
          >
            {desc}
          </Typography>
          <Button
            component={NavLink}
            size={isMobile ? "small" : "large"}
            sx={{
              fontWeight: "400",
              "&:hover": {
                bgcolor: "text.primary",
              },
              "& a": {
                textDecoration: "none",
                color: "background.paper",
              },
            }}
            variant="contained"
            to={"/shop"}
          >
            SHOP NOW
          </Button>
        </Stack>
      </Slide>
    </Box>
  );
};

export default ImageSlide;
