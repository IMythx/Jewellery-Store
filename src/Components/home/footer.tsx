import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fragment } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import RedditIcon from "@mui/icons-material/Reddit";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import image from "../../assets/payments.webp";

const Footer = (): JSX.Element => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Fragment>
      <Stack
        direction={{
          md: "row",
          xs: "column",
        }}
        mt={{
          md: 10,
          xs: 6,
        }}
        alignItems={"center"}
        px={2}
        gap={{
          between: "1rem",
          xs: "2rem",
        }}
      >
        <Stack
          direction={{
            between: "row",
            xs: "column",
          }}
          width={{
            md: "65%",
            xs: "85%",
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={{
            between: "1rem",
            xs: "2rem",
          }}
        >
          <Typography
            variant="body1"
            color={"text.secondary"}
            width={{
              between: "40%",
              xs: "100%",
            }}
          >
            chunks as necessary, making this the first true generator on the
            internet. it uses a dictionary of over 200 latin words, combined
            with a handful of model sentence
          </Typography>
          <Box width={"60%"}>
            <img
              style={{
                maxWidth: "100%",
              }}
              src={image}
              alt="payment methods"
            />
          </Box>
        </Stack>
        <Stack
          width={"35%"}
          direction={"row"}
          justifyContent={"center"}
          gap={"1rem"}
          sx={{
            "& svg": {
              fontSize: "2rem",
              color: "text.secondary",
              cursor: "pointer",
              "&:hover": {
                color: "#bab7b7",
              },
            },
          }}
        >
          <FacebookIcon />
          <TwitterIcon />
          <PinterestIcon />
          <InstagramIcon />
          <RedditIcon />
          <LinkedInIcon />
          <YouTubeIcon />
        </Stack>
      </Stack>
      <Box>
        {!isMobile ? (
          <Stack
            direction={"row"}
            mt={{
              md: 10,
              xs: 6,
            }}
            alignItems={"start"}
            sx={{
              pt: 4,
              borderTop: "1px solid",
              borderBottom: "1px solid",
              borderColor: "#8a8a8a2b",
            }}
          >
            {Object.keys(data).map((key, index) => (
              <List
                key={key}
                sx={{
                  width: index === 0 ? "30%" : "25%",

                  "& a": {
                    textDecoration: "none",
                  },
                }}
              >
                <ListItem>
                  <ListItemText>
                    <Typography variant="h4" fontSize={"1.8rem"}>
                      {key}
                    </Typography>
                  </ListItemText>
                </ListItem>
                {data[`${key}`].map((value) => (
                  <ListItem
                    key={value}
                    disablePadding
                    sx={{
                      pl: 2.5,
                      pb: index === 0 ? "1rem" : "0",
                    }}
                  >
                    <ListItemText
                      sx={{
                        "& a": {
                          color: "text.secondary",
                          "&:hover, & li:hover": {
                            color: "text.primary",
                          },
                          ml: 0.3,
                        },
                      }}
                    >
                      <NavLink to={`/`}>{value}</NavLink>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            ))}
          </Stack>
        ) : (
          <Box
            mt={6}
            sx={{
              pt: 4,
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
            {Object.keys(data).map((key) => (
              <Accordion key={key}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="subtitle1" fontWeight={400}>
                    {key}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {data[`${key}`].map((value) => (
                      <ListItem
                        key={value}
                        disablePadding
                        sx={{
                          py: 0,
                        }}
                      >
                        <ListItemText
                          sx={{
                            "& a": {
                              textDecoration: "none",
                              color: "text.secondary",
                              "&:hover, & li:hover": {
                                color: "text.primary",
                              },
                              ml: 0.3,
                            },
                          }}
                        >
                          <NavLink to={`/`}>{value}</NavLink>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
        <Box my={3}>
          <Typography
            variant="body1"
            fontSize={"1.1rem"}
            color={"text.secondary"}
            textAlign={"center"}
          >
            © 2022 - Ecommerce software by IMythx
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Footer;

const data: {
  [key: string]: string[];
} = {
  Contact: [
    "Warehouse & Offices 12345 Street name, Cairo, EGYPT",
    "0123 456 789 / 0123 456 788",
    "demo@prestashop.com",
  ],
  Information: [
    "Privacy Policy",
    "Refund Policy",
    "Shipping Policy",
    "Terms of Service",
    "Contact Information",
  ],
  "Our Company": ["Contact", "Search", "Blog", "Home page", "Terms of Service"],
  "Quick links": [
    "Belber",
    "Sports",
    "Square",
    "Travel Accessories",
    "Weekend",
    "Wristlet",
  ],
};
