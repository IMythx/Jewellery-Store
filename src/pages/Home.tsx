import MainSlider from "../Components/home/mainSlider/Mainslider";
import {
  Stack,
  Grid,
  Box,
  Typography,
  Button,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Service from "../Components/home/service";
import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";
import image5 from "../assets/img5.jpg";
import FirstSubSlider from "../Components/home/firstSubSlider/firstSubSlider";
import Title from "../Components/home/headTitle";
import ImageSlide from "../Components/home/mainSlider/slide";
import { useState } from "react";
import SecondSubSlider from "../Components/home/secondSubSlider/secondSubSlider";
import Brands from "../Components/home/brands";

const Home = (): JSX.Element => {
  const isTablet = useMediaQuery("(max-width:950px)");

  const isMobile = useMediaQuery("(max-width:768px)");

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const onSlideChange = (index?: number) => setCurrentSlide(index!);

  return (
    <main>
      {/* MAIN SLIDER */}
      <Box
        sx={{
          "& .slick-dots li button:before": {
            color: "#e8a86e",
          },
        }}
      >
        <MainSlider type="main" onChange={onSlideChange}>
          {Object.keys(imageData).map((key, index) => (
            <ImageSlide
              key={key}
              currentSlide={currentSlide}
              title={imageData[key].title}
              desc={imageData[key].desc}
              index={index}
            />
          ))}
        </MainSlider>
      </Box>

      {/* SERVICES */}
      <Grid container py={10} justifyContent={"center"} rowGap={"1.5rem"}>
        <Grid item md={3} sm={6} xs={12}>
          <Service
            Icon={
              <LocalShippingOutlinedIcon
                sx={{
                  fontSize: "3rem",
                  color: "text.secondary",
                }}
              />
            }
            Name={"Free shipping"}
            details={"on order over 100$"}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Service
            Icon={
              <SupportAgentOutlinedIcon
                sx={{
                  fontSize: "3rem",
                  color: "text.secondary",
                }}
              />
            }
            Name={"Support online"}
            details={"call:(123) 123 444 555"}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Service
            Icon={
              <CardGiftcardIcon
                sx={{
                  fontSize: "3rem",
                  color: "text.secondary",
                }}
              />
            }
            Name={"Special Gift"}
            details={"Special gift for Members"}
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Service
            Icon={
              <CardGiftcardIcon
                sx={{
                  fontSize: "3rem",
                  color: "text.secondary",
                }}
              />
            }
            Name={"security payment"}
            details={"Venaim consequeter frenk furtre"}
          />
        </Grid>
      </Grid>

      {/* CHECK OUT COLLECTIONS */}
      <Stack
        px={"2rem"}
        gap={{
          lg: "3.5rem",
          xs: "1.5rem",
        }}
        direction={{
          md: "row",
          xs: "column",
        }}
      >
        <Box borderRadius={"5px"} overflow={"hidden"}>
          <img
            style={{
              width: "100%",
            }}
            src={image1}
            alt="image"
          />
        </Box>
        <Stack
          width={{
            md: "40%",
            xs: "auto",
          }}
          gap={"0.8rem"}
        >
          <Box borderRadius={"5px"} overflow={"hidden"} width={"100%"}>
            <img
              style={{
                width: "100%",
              }}
              src={image2}
              alt="image"
            />
          </Box>
          <Typography
            variant={isTablet ? "h6" : "h4"}
            fontSize={isTablet ? "auto" : "1.9rem"}
          >
            Check Out Our Collections
          </Typography>
          <Typography variant={isTablet ? "body2" : "body1"}>
            Many desktop publishing packages and web page editors now use Lorem
            Ipsum as their default model text, and a search for 'lorem ipsum'
            still in their infancy.Many desktop publishing packages and web page
            editors now use Lorem Ipsum as their
          </Typography>
          {!isTablet && (
            <Button
              component={NavLink}
              sx={{
                width: "fit-content",
                fontWeight: "400",
                "&:hover": {
                  bgcolor: "text.primary",
                },
                "& a": {
                  textDecoration: "none",
                  color: "background.paper",
                  "&:hover": {
                    color: "primary.main",
                  },
                },
              }}
              variant="contained"
              to={"/shop"}
            >
              SHOP NOW
            </Button>
          )}
        </Stack>
      </Stack>

      {/* BEST SELLERS SLIDER */}
      <Stack
        direction={"row"}
        px={2}
        mt={{
          md: 18,
          xs: 12,
        }}
        gap={"0.5rem"}
      >
        <Stack
          width={{
            md: "20%",
            sm: "30%",
            xs: "40%",
          }}
          gap={{
            md: "1rem",
            sm: "0.3rem",
            xs: "1rem",
          }}
          alignItems={"flex-start"}
        >
          <Typography variant={isMobile ? "h6" : "h4"}>Best Sellers</Typography>
          <Typography variant="body2" color={"text.secondary"}>
            many desktop publishing packages and web page editors now use lorem
            ipsum as their default model text, and a search for 'lorem ipsum'
            still in their infancy.
          </Typography>
          <Button
            component={NavLink}
            sx={{
              width: "fit-content",
              fontWeight: "400",
              "&:hover": {
                bgcolor: "text.primary",
              },
              "& a": {
                textDecoration: "none",
                color: "background.paper",
                textTransform: "capitalize",
                "&:hover": {
                  color: "primary.main",
                },
              },
            }}
            size={isMobile ? "medium" : "large"}
            variant="contained"
            to={"/shop"}
          >
            View all
          </Button>
        </Stack>
        <Box
          sx={{
            width: {
              md: "80%",
              sm: "70%",
              xs: "60%",
            },
            position: "relative",
          }}
        >
          <FirstSubSlider />
        </Box>
      </Stack>

      {/* BANNER */}
      <Stack
        mt={{
          md: 15,
          xs: 8,
        }}
        sx={{
          backgroundImage: `url(${image3})`,
          backgroundPosition: "50% 40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          py: {
            lg: 20,
            md: 15,
            xs: 10,
          },
        }}
        alignItems={"center"}
        gap={"1rem"}
      >
        <Typography
          textAlign={"center"}
          variant={isTablet ? (isMobile ? "h6" : "h4") : "h3"}
        >
          Gold & Diamond Jewellery Shopping
        </Typography>
        <Typography
          variant="body1"
          textAlign={"center"}
          sx={{
            width: {
              md: "75%",
              xs: "90%",
            },
          }}
        >
          many desktop publishing packages and web page editors now use lorem
          ipsum as their default model text, and a search for lorem ipsum will
          uncover many web sites still in their infancy. various versions have
          evolved over the years, sometimes by accident, sometimes on purpose
          injected humour and the like
        </Typography>
      </Stack>

      {/* FEATURE PRODUCTS */}
      <Box
        sx={{
          mt: {
            md: 10,
            xs: 6,
          },
          mx: 1,
        }}
      >
        <Title title={"Feature Products"} />
        <Box
          sx={{
            position: "relative",
          }}
        >
          <FirstSubSlider />
        </Box>
      </Box>

      {/* TESTIMONIALS */}
      <Box
        mt={{
          md: 10,
          xs: 6,
        }}
        sx={{
          backgroundImage:
            "url('https://cdn.shopify.com/s/files/1/0658/5116/2929/files/testi_bg_1920x.png')",
          backgroundColor: "#e8a86e",
          "& .slick-dots": {
            bottom: "0",
          },
        }}
      >
        <MainSlider onChange={() => {}} type="sub">
          <Box
            sx={{
              py: 7,
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sureisnt
              <br /> anything embarrassing hidden in the middle of text. All the
              Lorem Ipsum
            </Typography>
            <Typography variant="h6" textAlign={"center"} mt={1}>
              Martin Flank - Manager
            </Typography>
          </Box>
          <Box
            sx={{
              py: 7,
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sureisnt anything embarrassing hidden in the middle of text. All
              the Lorem Ipsum
            </Typography>
            <Typography variant="h6" textAlign={"center"} mt={1}>
              Sam Daniel - Salesman
            </Typography>
          </Box>
          <Box
            sx={{
              py: 7,
            }}
          >
            <Typography variant="h6" textAlign={"center"}>
              If you are going to use a passage of Lorem Ipsum, you need to be
              sureisnt anything embarrassing hidden in the middle of text. All
              the Lorem Ipsum
            </Typography>
            <Typography variant="h6" textAlign={"center"} mt={1}>
              Claudia - Designer
            </Typography>
          </Box>
        </MainSlider>
      </Box>

      {/* NEW ARRIVALS */}
      <Box
        sx={{
          mt: {
            md: 13,
            xs: 7,
          },
          mx: 1,
        }}
      >
        <Title title={"New arrivals"} />
        <Box
          sx={{
            position: "relative",
          }}
        >
          <FirstSubSlider />
        </Box>
      </Box>

      {/* SMALL BANNERS */}
      <Stack
        direction={{
          md: "row",
          xs: "column",
        }}
        px={2}
        mt={{
          md: 9,
          xs: 8,
        }}
        gap={"2rem"}
      >
        <Box
          position={"relative"}
          sx={{
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <img
            style={{
              width: "100%",
            }}
            src={image4}
            alt="banner"
          />
          <Stack
            justifyContent={"center"}
            alignItems={"start"}
            sx={{
              position: "absolute",
              right: "10%",
              top: "30%",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              fontSize={{
                sm: "2rem",
                xs: "1.2rem",
              }}
            >
              Silver Earings
            </Typography>
            <Typography
              fontSize={{
                sm: "1rem",
                xs: "0.8rem",
              }}
              color={"#fb9300"}
            >
              Get 10 instant Discount
            </Typography>
          </Stack>
        </Box>
        <Box
          position={"relative"}
          sx={{
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <img
            style={{
              width: "100%",
            }}
            src={image5}
            alt="banner"
          />
          <Stack
            justifyContent={"center"}
            alignItems={"start"}
            sx={{
              position: "absolute",
              right: "10%",
              top: "20%",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={600}
              fontSize={{
                sm: "2rem",
                xs: "1.2rem",
              }}
            >
              Handmage Pure
              <br /> Jewellry
            </Typography>
            <Typography
              fontSize={{
                sm: "1rem",
                xs: "0.8rem",
              }}
            >
              Huge Discount - See Products
            </Typography>
          </Stack>
        </Box>
      </Stack>

      {/* BLOG POSTS */}
      <Box
        sx={{
          mt: {
            md: 10,
            xs: 6,
          },
          mx: 1,
        }}
      >
        <Title title={"Blog posts"} />
        <Box
          sx={{
            position: "relative",
          }}
        >
          <SecondSubSlider />
        </Box>
      </Box>

      {/* PARTNERS */}
      <Box
        sx={{
          mt: {
            md: 10,
            xs: 6,
          },
        }}
      >
        <Brands />
      </Box>

      {/* SUBSCRIBE */}
      <Stack
        direction={{
          between: "row",
          xs: "column",
        }}
        bgcolor={"#434343"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={2}
        mt={{
          md: 10,
          xs: 6,
        }}
        gap={{
          between: "0",
          xs: "1rem",
        }}
      >
        <Typography
          variant="h4"
          fontSize={{
            between: "35px",
            xs: "28px",
          }}
          fontWeight={500}
          letterSpacing={1}
        >
          Subscribe to our emails
        </Typography>
        <Stack
          direction={"row"}
          width={{
            between: "45%",
            xs: "100%",
          }}
          gap={"0.5rem"}
          sx={{
            "& label.Mui-focused": {
              color: "text.secondary",
            },
            "& input": {
              bgcolor: "#fff",
              color: "text.secondary",
              borderRadius: "5px",
              p: "1.1rem 1rem",
              "&::placeholder": {
                color: "#000 ",
              },
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                zIndex: "-10",
              },
            },
          }}
        >
          <TextField placeholder="Email" fullWidth />
          <Button variant="contained">Subscribe</Button>
        </Stack>
      </Stack>
    </main>
  );
};

export default Home;

const imageData: {
  [key: string]: { title: string; desc: string };
} = {
  image1: {
    title: "Diamond Rings Designs",
    desc: "Browse gorgeous earings , bangles, neckwears and rings",
  },
  image2: {
    title: "Jewellry Summer Sale",
    desc: "All jewellry upto 80% Off",
  },
  image3: {
    title: "End of Summer Sale",
    desc: "9 Days ! Free Shipping on everything on Classic",
  },
};
