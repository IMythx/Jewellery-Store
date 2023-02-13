import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import Slider from "react-slick";
import { useMediaQuery } from "@mui/material";
import { CustomArrowProps } from "react-slick";

interface Props {
  type: "main" | "sub";
  children: React.ReactNode;
  onChange: (index?: number) => void;
}

const MainSlider = ({ type, onChange, children }: Props): JSX.Element => {
  const hideArrows = useMediaQuery("(max-width:900px)");
  return (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      useTransform={false}
      arrows={!hideArrows}
      prevArrow={<PrevArrow />}
      nextArrow={<NextArrow />}
      afterChange={type === "main" ? (index) => onChange(index) : undefined}
    >
      {children}
    </Slider>
  );
};

export default MainSlider;

const NextArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <ArrowCircleRightOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(-40px, -50%)",
      fontSize: "3rem",
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
  <ArrowCircleLeftOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(40px, -50%)",
      fontSize: "3rem",
      zIndex: "50",
      "&:hover": {
        color: "text.primary",
      },
    }}
  />
);

const imageData: {
  [key: string]: { title: string; desc: string };
} = {
  image1: {
    title: "Diamond Rings Designs",
    desc: `Browse gorgeous earings , bangles, neckwears and rings`,
  },
};
