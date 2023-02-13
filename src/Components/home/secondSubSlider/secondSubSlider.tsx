import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Slider from "react-slick";
import { Fragment, useRef } from "react";
import Post from "./Post";

const SecondSubSlider = (): JSX.Element => {
  const sliderRef = useRef<Slider | null>(null);

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
        slidesToShow={2}
        slidesToScroll={1}
        useTransform={false}
        ref={sliderRef}
        arrows={false}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {Object.keys(PostsData)
          .slice(0, 15)
          .map((key, index) => (
            <Post
              key={index}
              srcIndex={PostsData[`${key}`].srcIndex}
              title={PostsData[`${key}`].title}
              date={PostsData[`${key}`].date}
              desc={PostsData[`${key}`].desc}
            />
          ))}
      </Slider>
    </Fragment>
  );
};

export default SecondSubSlider;

const PostsData: {
  [key: string]: {
    srcIndex: number;
    date: string;
    title: string;
    desc: string;
  };
} = {
  image1: {
    srcIndex: 0,
    date: "November 17, 2022",
    title: "Do you know how classic company was started?",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  image2: {
    srcIndex: 1,
    date: "November 17, 2022",
    title: "Browse Through More Products Of Classic.",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  image3: {
    srcIndex: 2,
    date: "November 17, 2022",
    title: "How to dress like a fashionista",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  image4: {
    srcIndex: 3,
    date: "November 17, 2022",
    title: " Where does it come from?",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
};
