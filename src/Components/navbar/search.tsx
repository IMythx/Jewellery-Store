import { Stack, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { data } from "../../modules/data";
import { dataSelector } from "../../store/dataSlice";
import { useAppSelector } from "../../hooks/hooks";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

interface Props {
  toggleSearchBar: () => void;
  children?: React.ReactNode;
}
const Search = ({ toggleSearchBar }: Props): JSX.Element => {
  const data = useAppSelector(dataSelector) as data;

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.trim().length > 0 && !isSearching && setIsSearching(true);

    e.target.value.trim().length === 0 && isSearching && setIsSearching(false);

    setSearchKeyWord(e.target.value);
  };

  return (
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Stack
        width={"fit-content"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          position: "relative",
          "& label.Mui-focused": {
            color: "#5f5f5f",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#000000",
              py: 2.3,
            },
            "&:hover fieldset": {
              borderColor: "#5f5f5f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#5f5f5f",
            },
          },
        }}
      >
        <TextField
          sx={{
            width: {
              sm: "500px",
              xs: "300px",
            },
          }}
          size="small"
          label={"Search"}
          InputProps={{
            endAdornment: (
              <SearchIcon
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "#fff !important",
                  },
                }}
              />
            ),
          }}
          onChange={onChangeHandler}
          defaultValue={searchKeyWord}
        />
        <IconButton onClick={toggleSearchBar}>
          <CloseIcon
            sx={{
              color: "#fff !important",
              "&:hover": {
                color: "text.secondary",
              },
            }}
          />
        </IconButton>
        {isSearching && (
          <Stack
            width={{
              sm: "500px",
              xs: "300px",
            }}
            sx={{
              position: "absolute",
              top: "109%",
              zIndex: "modal",
              left: 0,
              overflow: "auto",
              height: "fit-content",
              maxHeight: "50vh",
            }}
            gap={"1rem"}
            bgcolor={"background.default"}
            pl={1}
            pt={1}
          >
            {Object.keys(data).map(
              (item, index) =>
                item.toLowerCase().includes(searchKeyWord.toLowerCase()) && (
                  <NavLink
                    key={index}
                    to={`/shop/${item}`}
                    onClick={toggleSearchBar}
                  >
                    <Typography variant="body1" mb={"2px"}>
                      {item}
                    </Typography>
                    <Typography variant="body1" color={"text.secondary"}>
                      {data[`${item}`]?.brand} | ${data[`${item}`]?.price}
                    </Typography>
                  </NavLink>
                )
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Search;
