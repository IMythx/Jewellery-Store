import { Stack, Breadcrumbs, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import image from "../assets/img6.jpg";
import BrandsFilter from "../Components/shop/BrandsFilter";
import ItemsList from "../Components/shop/itemsList";
import { useAppDispatch, useStableNavigate } from "../hooks/hooks";
import { useState, useEffect } from "react";
import PriceFilter from "../Components/shop/priceFilter";
import ColorsFilter from "../Components/shop/colorsFilter";
import { filter } from "../store/dataSlice";

interface Filters {
  BRAND: string[];
  PRICE: number[];
  COLOR: string[];
}
const Shop = (): JSX.Element => {
  const [filters, setFilters] = useState<Filters>({
    BRAND: [],
    PRICE: [],
    COLOR: [],
  });
  const dispatch = useAppDispatch();
  const navigate = useStableNavigate();

  const onBrandsChange = (brandsFilter: string[]) => {
    setFilters(
      (prev) =>
        (prev = {
          ...prev,
          BRAND: brandsFilter,
        })
    );
  };

  const onPriceChange = (priceFilters: number[]) => {
    setFilters(
      (prev) =>
        (prev = {
          ...prev,
          PRICE: priceFilters,
        })
    );
  };

  const onColorChange = (colorsFilter: string[]) => {
    setFilters(
      (prev) =>
        (prev = {
          ...prev,
          COLOR: colorsFilter,
        })
    );
  };

  useEffect(() => {
    const brandsQueries =
      filters.BRAND.length &&
      filters.BRAND.reduce((accu, curr) => accu + `&BRAND=${curr}`);

    const PriceQueries = filters.PRICE.length && filters.PRICE.join("-");
    const colorsQueries =
      filters.COLOR.length &&
      filters.COLOR.reduce((accu, curr) => accu + `&COLOR=${curr}`);

    navigate({
      pathname: location.pathname,
      search: `${PriceQueries ? `PRICE=${PriceQueries}` : ""}${
        brandsQueries
          ? PriceQueries
            ? `&BRAND=${brandsQueries}`
            : `BRAND=${brandsQueries}`
          : ""
      }${
        colorsQueries
          ? PriceQueries || brandsQueries
            ? `&COLOR=${colorsQueries}`
            : `COLOR=${colorsQueries}`
          : ""
      }`,
    });
    dispatch(filter());
  }, [filters]);

  return (
    <Stack gap={"3rem"}>
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
          Shop
        </Typography>
      </Breadcrumbs>
      <Box>
        <img
          style={{
            maxWidth: "100%",
          }}
          src={image}
          alt="bannar"
        />
      </Box>
      <Typography
        variant="body1"
        color={"text.secondary"}
        textAlign={"center"}
        width={"90%"}
        sx={{
          mx: "auto",
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Typography>
      <Stack
        direction={{
          between: "row",
          xs: "column",
        }}
      >
        <Stack
          width={{
            between: "23%",
            xs: "100%",
          }}
          sx={{
            height: "fit-content",
            position: {
              between: "sticky",
              xs: "initial",
            },
            top: {
              between: "10px",
              xs: "0",
            },
            "& .MuiPaper-root.MuiAccordion-root": {
              backgroundImage: "none",
              boxShadow: "none",
              "&:before": {
                display: "none",
              },
            },
            "& .MuiAccordionSummary-content.Mui-expanded": {
              m: 0,
            },
            "& .MuiButtonBase-root.MuiAccordionSummary-root": {
              minHeight: "40px",
              "&.Mui-expanded": {
                minHeight: "40px",
              },
            },
          }}
        >
          <Typography
            variant="h6"
            color={"primary.main"}
            fontWeight={400}
            sx={{
              ml: 2,
              mb: 1,
            }}
          >
            Filter:
          </Typography>
          <BrandsFilter onChange={onBrandsChange} />
          <PriceFilter onChange={onPriceChange} />
          <ColorsFilter onChange={onColorChange} />
        </Stack>
        <Stack
          width={{
            between: "77%",
            xs: "100%",
          }}
          px={1}
          sx={{
            height: "fit-content",
          }}
        >
          <ItemsList />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Shop;
