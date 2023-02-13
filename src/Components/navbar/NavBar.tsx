import {
  AppBar,
  Toolbar,
  Stack,
  Typography,
  useMediaQuery,
  TextField,
  IconButton,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Fragment, useEffect, useState } from "react";
import Menu from "./Menu";
import SideBar from "./SideBar";
import Cart from "./cart";
import { useAppSelector } from "../../hooks/hooks";
import { cartItemsSelector } from "../../store/cartSlice";
const NavBar = (): JSX.Element => {
  const isTablet = useMediaQuery("(max-width:992px)");

  const cartItems = useAppSelector(cartItemsSelector);

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);

  const [toggleCart, setToggleCart] = useState<boolean>(false);

  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const { search, pathname } = useLocation();

  useEffect(() => {
    showMenu && setShowMenu((prev: boolean) => !prev);
    toggleSideBar && setToggleSideBar((prev: boolean) => !prev);
  }, [search, pathname]);

  return (
    <AppBar
      sx={{ position: "relative", py: 2, backgroundImage: "none" }}
      elevation={toggleSideBar ? 2 : 0}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          "& a,li": {
            textDecoration: "none",
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
            },
          },
          "& svg:hover": {
            scale: "1.1",
            color: "primary.main",
          },
        }}
      >
        {showSearchBar && (
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
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
                width: "500px",
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
            />
            <IconButton>
              <CloseIcon
                sx={{
                  color: "#fff !important",
                  "&:hover": {
                    color: "text.secondary",
                  },
                }}
                onClick={() => setShowSearchBar((prev: boolean) => !prev)}
              />
            </IconButton>
          </Stack>
        )}
        {!showSearchBar && (
          <Fragment>
            {" "}
            {isTablet && !toggleSideBar && (
              <MenuIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setToggleSideBar((prev: boolean) => !prev)}
              />
            )}
            {isTablet && toggleSideBar && (
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setToggleSideBar((prev: boolean) => !prev)}
              />
            )}
            <NavLink to="/">
              {!isTablet ? (
                <img
                  src="https://cdn.shopify.com/s/files/1/0658/5116/2929/files/jewellery-store-logo-1630986930.png"
                  alt="Logo"
                />
              ) : (
                <img
                  src="https://cdn.shopify.com/s/files/1/0658/5116/2929/files/jewellery-store-logo-1630986930.png?width=120"
                  alt="Logo"
                />
              )}
            </NavLink>
            {!isTablet && (
              <Stack
                component={"ul"}
                direction="row"
                gap={"2.5rem"}
                alignItems={"center"}
              >
                <li>
                  <Stack
                    direction="row"
                    gap={"0.4rem"}
                    alignItems={"center"}
                    sx={{
                      cursor: "pointer",
                      color: showMenu ? "primary.main" : "",
                    }}
                    onClick={() => setShowMenu((prev: boolean) => !prev)}
                  >
                    <Typography variant="body1">Type</Typography>
                    <KeyboardArrowDownIcon />
                  </Stack>
                  {showMenu && <Menu />}
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={"/shop"}
                  >
                    Best Selling
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={"/shop"}
                  >
                    New
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={"/shop"}
                  >
                    Popular
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={"/shop"}
                  >
                    Sale
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to={"/shop"}
                  >
                    Viewall
                  </NavLink>
                </li>
              </Stack>
            )}
            <Stack gap={"0.7rem"} direction="row">
              <SearchIcon
                sx={{
                  cursor: "pointer",
                  fontSize: "1.7rem",
                  "&:hover": { color: "primary.main", scale: "1.1" },
                }}
                onClick={() => setShowSearchBar((prev: boolean) => !prev)}
              />
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to={"/login"}
              >
                <PermIdentityIcon sx={{ fontSize: "1.7rem" }} />
              </NavLink>

              <Badge
                badgeContent={cartItems.length > 0 ? cartItems.length : 0}
                color={"primary"}
              >
                <LocalMallOutlinedIcon
                  sx={{ fontSize: "1.7rem", cursor: "pointer" }}
                  onClick={() => setToggleCart((prev: boolean) => !prev)}
                />
              </Badge>
            </Stack>
          </Fragment>
        )}
      </Toolbar>
      <SideBar
        openDrawer={toggleSideBar}
        toggleDrawer={() => setToggleSideBar((prev: boolean) => !prev)}
      />
      <Cart
        toggleCart={() => setToggleCart((prev: boolean) => !prev)}
        openCart={toggleCart}
      />
    </AppBar>
  );
};

export default NavBar;
