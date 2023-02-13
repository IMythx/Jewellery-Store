import image1 from "../../assets/31.webp";
import image2 from "../../assets/41.webp";
import image3 from "../../assets/1.webp";
import image4 from "../../assets/6.webp";
import image5 from "../../assets/7.webp";
import image6 from "../../assets/2.webp";
import image7 from "../../assets/5.webp";
import { Stack } from "@mui/material";
import Slider from "react-slick";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { CustomArrowProps } from "react-slick";

const Brands = (): JSX.Element => {
  const brands = [image1, image2, image3, image4, image5, image6, image7];
  return (
    <Slider
      infinite={true}
      speed={500}
      slidesToShow={4}
      slidesToScroll={1}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      useTransform={false}
      arrows={true}
      responsive={[
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {brands.map((brand, index) => (
        <Stack
          key={index}
          alignItems={"center"}
          display={"flex !important"}
          sx={{
            outline: "none",
          }}
        >
          <img src={brand} alt="brand" />
        </Stack>
      ))}
    </Slider>
  );
};

export default Brands;

const NextArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <ArrowForwardOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(-40px, -50%)",
      fontSize: "1.9rem",
      "&:hover": {
        color: "text.primary",
      },
    }}
  />
);
const PrevArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <ArrowBackOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(40px, -50%)",
      fontSize: "1.9rem",
      zIndex: "50",
      "&:hover": {
        color: "text.primary",
      },
    }}
  />
);
