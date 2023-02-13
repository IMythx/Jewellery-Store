import { Stack, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

const Menu = (): JSX.Element => {
  return (
    <Stack
      direction={"row"}
      sx={{
        position: "absolute",
        top: "100%",
        left: "0",
        zIndex: "tooltip",
        bgcolor: "#2b2b2b",
        width: "100%",
        borderTop: "1px solid",
        borderColor: "#8a8a8a2b",
      }}
      justifyContent={"space-around"}
    >
      {Object.keys(data).map((key) => (
        <List
          key={key}
          sx={{
            "& a": {
              textDecoration: "none",
            },
          }}
        >
          <ListItem
            sx={{
              "&:hover, & li:hover": {
                color: "primary.main",
              },
            }}
          >
            <ListItemText>
              <NavLink to={"/shop"}>{key}</NavLink>
            </ListItemText>
          </ListItem>
          {data[`${key}`].map((value) => (
            <ListItem
              key={value}
              disablePadding
              sx={{
                pl: 2.5,
              }}
            >
              <ListItemText
                sx={{
                  "& a": {
                    color: "text.secondary",
                    "&:hover, & li:hover": {
                      color: "primary.main",
                    },
                    ml: 0.3,
                  },
                }}
              >
                <NavLink to={`/shop`}>- {value}</NavLink>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      ))}
    </Stack>
  );
};

export default Menu;

export const data: {
  [key: string]: string[];
} = {
  Category: ["Bracelets", "Earings", "Jewelry Organizers", "Necklaces"],
  Finish: ["Black", "Rose gold", "Silver", "Gold"],
  Color: ["Blue", "Purple", "Gray", "Green"],
  Style: ["Adjustable", "Beaded", "Bangle", "Bracelets"],
  Material: ["18K Yellow Gold", "Black Ion", "Black Plated Brace", "Aluminium"],
  Size: ["L/XL", "S/M", "12", "13"],
};
