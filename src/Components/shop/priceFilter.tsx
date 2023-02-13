import {
  Slider,
  Typography,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState, useLayoutEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  onChange: (filters: number[]) => void;
  children?: React.ReactNode;
}

const PriceFilter = ({ onChange }: Props): JSX.Element => {
  const [filters, setFilters] = useState<number[]>(
    new URLSearchParams(location.search).get("PRICE")
      ? [
          +new URLSearchParams(location.search).get("PRICE")!.split("-")[0],
          +new URLSearchParams(location.search).get("PRICE")!.split("-")[1],
        ]
      : [500, 950]
  );
  const handleChange = (_: Event, newValue: number | number[]) => {
    setFilters(newValue as number[]);
  };
  const onClickHandler = () => {
    onChange(filters);
  };
  useLayoutEffect(() => {
    (filters[0] !== 500 || filters[1] !== 950) && onChange(filters);
  }, []);
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          "& .MuiAccordionSummary-content": {
            gap: "0.5rem",
            alignItems: "center",
          },
        }}
        expandIcon={
          <ExpandMoreIcon
            sx={{
              fontSize: "1.1rem",
            }}
          />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body1"
          sx={{
            ml: 2,
          }}
        >
          Price
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack alignItems={"center"} rowGap={"1rem"} py={4} px={2}>
          <Typography variant="subtitle2" fontSize={"0.90rem"} fontWeight={600}>
            PRICE
          </Typography>
          <Slider
            getAriaLabel={() => "Price range"}
            value={filters}
            onChange={handleChange}
            min={500}
            max={950}
            valueLabelDisplay="auto"
          />
          <Typography variant={"body2"} textAlign={"center"}>
            {filters.join(" - ")}
          </Typography>
          <Button
            disableRipple
            variant={"outlined"}
            sx={{
              width: "90%",
            }}
            onClick={onClickHandler}
          >
            FILTER
          </Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
export default PriceFilter;
