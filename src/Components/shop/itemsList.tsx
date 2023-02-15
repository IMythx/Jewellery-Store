import { Grid, Stack, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";
import { productsSelector } from "../../store/dataSlice";
import { data } from "../../modules/data";
import Product from "../home/firstSubSlider/product";
import Columns from "./columns";
import { useState } from "react";

const ItemsList = (): JSX.Element => {
  const isTablet = useMediaQuery("(max-width:992px)");

  const isMobile = useMediaQuery("(max-width:768px)");

  const [columnsNumber, setColumnsNumber] = useState<number>(
    isTablet ? (isMobile ? 2 : 3) : 4
  );

  const data = useAppSelector(productsSelector) as data;

  return (
    <Stack gap={"2rem"}>
      <Columns
        onChange={(value: number) => setColumnsNumber(value)}
        activeColumns={columnsNumber}
        isTablet={isTablet}
        isMobile={isMobile}
      />
      <Grid container rowGap={"1rem"}>
        {Object.keys(data).map((key, index) => (
          <Grid item xs={12 / columnsNumber} key={index}>
            <Product
              key={index}
              src={data[`${key}`]?.src}
              name={key}
              brand={data[`${key}`]?.brand}
              price={data[`${key}`]?.price}
              priceId={data[`${key}`]?.priceId}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default ItemsList;
