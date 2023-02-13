import {
  Stack,
  Breadcrumbs,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { NavLink, redirect, useParams } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useStableNavigate,
} from "../hooks/hooks";
import { dataSelector } from "../store/dataSlice";
import { data } from "../modules/data";
import Slider from "react-slick";
import { CustomArrowProps } from "react-slick";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, Fragment, useLayoutEffect } from "react";
import Title from "../Components/home/headTitle";
import FirstSubSlider from "../Components/home/firstSubSlider/firstSubSlider";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {
  addItem,
  itemIsBeingAddedSelector,
  isItemInCartSelector,
} from "../store/cartSlice";
import { LoadingButton } from "@mui/lab";

const ItemDetails = (): JSX.Element => {
  const data = useAppSelector(dataSelector) as data;

  const dispatch = useAppDispatch();

  const navigate = useStableNavigate();

  const { item } = useParams<string>();

  const isInCart = useAppSelector((state) =>
    isItemInCartSelector(state, item!)
  );

  const [activeImg, setActiveImg] = useState<number>(0);

  const [count, setCount] = useState<number>(1);

  const [size, setSize] = useState<string>("S");

  const itemDoesExist = data[item!];

  const isAddingItem = useAppSelector((state) =>
    itemIsBeingAddedSelector(state, item!)
  );

  const onClickHandler = () => {
    !isInCart &&
      dispatch(
        addItem({
          name: item!,
          imgSrc: data[`${item}`]?.src[0],
          price: data[`${item}`]?.price,
          quantity: count,
          brand: data[`${item}`]?.brand,
          priceId: data[`${item}`]?.priceId,
        })
      );
  };

  useLayoutEffect(() => {
    !itemDoesExist && navigate("/notfound");
  }, []);

  return (
    <Stack>
      <Breadcrumbs
        sx={{
          bgcolor: "#434343",
          py: {
            between: 5,
            xs: 2,
          },
          "& .MuiBreadcrumbs-ol": {
            justifyContent: "center",
          },
          "& a": {
            textDecoration: "none",
            borderRadius: "10px",
            "&:hover": {
              bgcolor: "primary.main",
            },
          },
        }}
      >
        <NavLink to={"/"}>
          <Typography variant="h6" color={"text.secondary"}>
            Home
          </Typography>
        </NavLink>
        <Typography variant="h6" color={"text.primary"}>
          {item}
        </Typography>
      </Breadcrumbs>
      <Stack
        direction={{
          md: "row",
          xs: "column",
        }}
        p={"1rem"}
        gap={"3rem"}
        mt={{
          md: 10,
          xs: 6,
        }}
      >
        <Stack
          rowGap={"1rem"}
          width={{
            md: "50%",
            xs: "100%",
          }}
          position={{
            md: "sticky",
            xs: "initial",
          }}
          top={{
            md: "15px",
            xs: "0",
          }}
          sx={{
            height: "fit-content",
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              borderRadius: "7px",
            }}
          >
            <img
              style={{
                maxWidth: "100%",
                minHeight: "100%",
              }}
              src={data[`${item}`]?.src[activeImg]}
              alt="IMAGE"
            />
          </Box>
          <Box width={"90%"} mx={"auto"}>
            <Slider
              focusOnSelect={true}
              infinite={true}
              speed={500}
              slidesToShow={5}
              slidesToScroll={1}
              useTransform={false}
              arrows={true}
              prevArrow={<PrevArrow />}
              nextArrow={<NextArrow />}
              afterChange={(index) => setActiveImg(index)}
            >
              {data[`${item}`]?.src?.map((src, index) => (
                <Box
                  key={src}
                  sx={{
                    px: 0.7,
                    cursor: "pointer",
                  }}
                >
                  <img
                    style={{
                      borderRadius: "7px",
                      border: index === activeImg ? "2px solid #f2f2f261" : "",
                      maxWidth: "100%",
                    }}
                    src={src}
                    alt="item"
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Stack>
        <Stack
          width={{
            md: "50%",
            xs: "100%",
          }}
          gap={{
            xs: "1.3rem",
          }}
        >
          <Stack gap={"0.5rem"}>
            <Typography
              variant="h6"
              fontWeight={400}
              fontSize={"1.2rem"}
              color={"text.secondary"}
            >
              {data[`${item}`]?.brand.toUpperCase()}
            </Typography>
            <Typography variant="h5">{item}</Typography>
          </Stack>
          <Stack justifyContent={"center"}>
            <Typography variant="h6" color={"text.secondary"}>
              ${data[`${item}`]?.price}
            </Typography>
            <Stack
              alignItems={"center"}
              direction={"row"}
              sx={{
                "& a": {
                  textDecoration: "none",
                  color: "text.secondary",
                  borderRadius: "10px",
                  "&:hover": {
                    bgcolor: "primary.main",
                  },
                },
              }}
            >
              <NavLink to={"/shipping-Policy"}>
                <Typography variant="body1" color={"text.secondary"}>
                  SHIPPING
                </Typography>
              </NavLink>
              <Typography
                variant="body2"
                color={"text.secondary"}
                sx={{
                  ml: "2px",
                }}
              >
                calculated at checkout.
              </Typography>
            </Stack>
          </Stack>
          <Stack rowGap={"0.5rem"}>
            <Typography variant="body2" color={"text.secondary"}>
              Size
            </Typography>
            <Stack
              direction={"row"}
              gap={"0.5rem"}
              sx={{
                width: "30%",
                "&> div": {
                  bgcolor: "#22222291",
                  px: 2.3,
                  py: 1,
                  borderRadius: "7px",
                  "&:hover": {
                    border: "1.8px solid",
                    borderColor: "#a2a2a23d",
                  },
                },
              }}
            >
              <Box
                onClick={() => setSize("S")}
                sx={{
                  cursor: "pointer",
                  border: size === "S" ? "1.8px solid" : "",
                  borderColor: size === "S" ? "#e8a86e !important" : "",
                }}
              >
                S
              </Box>
              <Box
                onClick={() => setSize("M")}
                sx={{
                  cursor: "pointer",
                  border: size === "M" ? "1.8px solid" : "",
                  borderColor: size === "M" ? "#e8a86e !important" : "",
                }}
              >
                M
              </Box>
              <Box
                onClick={() => setSize("L")}
                sx={{
                  cursor: "pointer",
                  border: size === "L" ? "1.8px solid" : "",
                  borderColor: size === "L" ? "#e8a86e !important" : "",
                }}
              >
                L
              </Box>
            </Stack>
          </Stack>
          <Stack width={"30%"} rowGap={"0.5rem"}>
            <Typography variant="body2" color={"text.secondary"}>
              Quantity
            </Typography>
            <Stack
              direction={"row"}
              sx={{
                border: "1px solid",
                borderColor: "#8a8a8a8a",
                p: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <RemoveOutlinedIcon
                onClick={() =>
                  count > 1 && setCount((prev: number) => prev - 1)
                }
                sx={{
                  cursor: "pointer",
                  color: "text.secondary",
                }}
              />
              <Box>{count}</Box>
              <AddOutlinedIcon
                sx={{
                  cursor: "pointer",
                  color: "text.secondary",
                }}
                onClick={() => setCount((prev: number) => prev + 1)}
              />
            </Stack>
          </Stack>
          <LoadingButton
            loading={isAddingItem}
            disableElevation
            fullWidth
            variant="contained"
            onClick={onClickHandler}
          >
            {!isInCart ? (
              "Add to cart"
            ) : (
              <Fragment>
                <CheckCircleOutlineIcon
                  sx={{
                    mr: "1rem",
                  }}
                />
                Added
              </Fragment>
            )}
          </LoadingButton>
          <Typography variant="body1" color={"text.secondary"}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text.
          </Typography>
          <Stack
            mt={2}
            sx={{
              "& .MuiPaper-root.MuiAccordion-root": {
                backgroundImage: "none",
                boxShadow: "none",
                borderTop: "1px solid rgba(255, 255, 255, 0.09)",
                "&:before": {
                  display: "none",
                },
              },
            }}
          >
            <Accordion>
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    gap: "0.5rem",
                    alignItems: "center",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <BeachAccessOutlinedIcon
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography fontSize={"1.1rem"} color={"text.secondary"}>
                  Materials
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color={"text.secondary"}>
                  Built of Titanium
                  <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    gap: "0.5rem",
                    alignItems: "center",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <LocalShippingOutlinedIcon
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography fontSize={"1.1rem"} color={"text.secondary"}>
                  Shipping & Returns
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color={"text.secondary"}>
                  Free Shipping Outside Egypt <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    gap: "0.5rem",
                    alignItems: "center",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <StraightenOutlinedIcon
                  sx={{
                    color: "text.secondary",
                    rotate: "-45deg",
                  }}
                />
                <Typography fontSize={"1.1rem"} color={"text.secondary"}>
                  Dimensions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color={"text.secondary"}>
                  5 x 3.5 ( inches ) <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{
                  "& .MuiAccordionSummary-content": {
                    gap: "0.5rem",
                    alignItems: "center",
                  },
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <FavoriteBorderOutlinedIcon
                  sx={{
                    color: "text.secondary",
                  }}
                />
                <Typography fontSize={"1.1rem"} color={"text.secondary"}>
                  Care Instructions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color={"text.secondary"}>
                  Must not be placed in high tempratures.
                  <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </Stack>
      <Box
        sx={{
          mt: {
            md: 13,
            xs: 7,
          },
          mx: 1,
        }}
      >
        <Title title={"You may also like"} />
        <Box
          sx={{
            position: "relative",
          }}
        >
          <FirstSubSlider />
        </Box>
      </Box>
    </Stack>
  );
};

export default ItemDetails;

const NextArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <KeyboardArrowRightOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(10px, -50%)",
      fontSize: "2rem",
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
  <KeyboardArrowLeftOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(-10px, -50%)",
      fontSize: "2rem",
      zIndex: "50",
      "&:hover": {
        color: "text.primary",
      },
    }}
  />
);
