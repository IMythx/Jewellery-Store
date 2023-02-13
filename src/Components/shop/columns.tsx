import { Stack, Tooltip } from "@mui/material";
interface Props {
  onChange: (value: number) => void;
  activeColumns: number;
  isTablet: boolean;
  isMobile: boolean;
  children?: React.ReactNode;
}
const Columns = ({
  onChange,
  activeColumns,
  isTablet,
  isMobile,
}: Props): JSX.Element => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"0.4rem"}
      sx={{
        "& .MuiTooltip-tooltip": { p: "8px 10px !important" },
        "& >div": {
          cursor: "pointer",
          justifyContent: "center",
          height: "23px",
          borderRadius: "5px",
          py: "2px",
          "& span": {
            borderRadius: "5px",
            height: "100%",
            width: "5px",
          },
          "&:hover": {
            borderColor: "primary.main",
            "& span": {
              bgcolor: "primary.main",
            },
          },
        },
      }}
    >
      <Tooltip title={"2 columns"} arrow placement="top">
        <Stack
          onClick={() => onChange(2)}
          direction={"row"}
          gap={"2px"}
          sx={{
            width: "22px",
            border: "1px solid",
            borderColor:
              activeColumns === 2 ? "primary.main" : "#8a8a8a !important",
            "& span": {
              bgcolor: activeColumns === 2 ? "primary.main" : "#8a8a8a",
            },
          }}
        >
          <span />
          <span />
        </Stack>
      </Tooltip>
      <Tooltip title={"3 columns"} arrow placement="top">
        <Stack
          onClick={() => onChange(3)}
          direction={"row"}
          gap={"2px"}
          sx={{
            width: "29px",
            border: "1px solid",
            borderColor: activeColumns === 3 ? "primary.main" : "#8a8a8a",
            "& span": {
              bgcolor: activeColumns === 3 ? "primary.main" : "#8a8a8a",
            },
          }}
        >
          <span />
          <span />
          <span />
        </Stack>
      </Tooltip>
      {!isMobile && (
        <Tooltip title={"4 columns"} arrow placement="top">
          <Stack
            onClick={() => onChange(4)}
            direction={"row"}
            gap={"2px"}
            sx={{
              width: "36px",
              border: "1px solid",
              borderColor: activeColumns === 4 ? "primary.main" : "#8a8a8a",
              "& span": {
                bgcolor: activeColumns === 4 ? "primary.main" : "#8a8a8a",
              },
            }}
          >
            <span />
            <span />
            <span />
            <span />
          </Stack>
        </Tooltip>
      )}
      {!isTablet && !isMobile && (
        <Tooltip title={"5 columns"} arrow placement="top">
          <Stack
            onClick={() => onChange(5)}
            direction={"row"}
            gap={"2px"}
            sx={{
              width: "43px",
              border: "1px solid",
              borderColor: activeColumns === 5 ? "primary.main" : "#8a8a8a",
              "& span": {
                bgcolor: activeColumns === 5 ? "primary.main" : "#8a8a8a",
              },
            }}
          >
            <span />
            <span />
            <span />
            <span />
            <span />
          </Stack>
        </Tooltip>
      )}
    </Stack>
  );
};

export default Columns;
