import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Slider from "react-slick";
import { Fragment, useRef } from "react";
import { dataSelector } from "../../../store/dataSlice";
import { useAppSelector } from "../../../hooks/hooks";
import Product from "./product";
import { data } from "../../../modules/data";

const FirstSubSlider = (): JSX.Element => {
  const sliderRef = useRef<Slider | null>(null);

  const data = useAppSelector(dataSelector) as data;

  return (
    <Fragment>
      <ArrowForwardOutlinedIcon
        onClick={() => sliderRef.current!.slickNext()}
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "102%",
          right: "0px",
          color: "text.secondary",
          fontSize: "1.7rem",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <ArrowBackOutlinedIcon
        onClick={() => sliderRef.current!.slickPrev()}
        sx={{
          cursor: "pointer",
          position: "absolute",
          bottom: "102%",
          right: "35px",
          color: "text.secondary",
          fontSize: "1.7rem",
          zIndex: "50",
          "&:hover": {
            color: "#000",
          },
        }}
      />
      <Slider
        infinite={true}
        speed={500}
        slidesToShow={4}
        slidesToScroll={1}
        useTransform={false}
        ref={sliderRef}
        arrows={false}
        responsive={[
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {Object.keys(data)
          .slice(0, 15)
          .map((key, index) => (
            <Product
              key={index}
              src={data[`${key}`].src}
              name={key}
              brand={data[`${key}`].brand}
              price={data[`${key}`].price}
              priceId={data[`${key}`].priceId}
            />
          ))}
      </Slider>
    </Fragment>
  );
};

export default FirstSubSlider;
