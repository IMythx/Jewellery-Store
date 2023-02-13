import { Drawer, Stack, Typography, Box, Button } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
  useStableNavigate,
} from "../../hooks/hooks";
import {
  cartItemsSelector,
  decrementByOne,
  incrementByOne,
  removeItem,
} from "../../store/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Fragment } from "react";

interface Props {
  openCart: boolean;
  toggleCart: () => void;
}
const Cart = ({ openCart, toggleCart }: Props): JSX.Element => {
  const cartItems = useAppSelector(cartItemsSelector);

  const navigate = useStableNavigate();

  const subTotal = useAppSelector((state) => state.cart.total);

  const dispatch = useAppDispatch();

  return (
    <Drawer
      anchor="right"
      open={openCart}
      onClose={() => toggleCart()}
      sx={{
        zIndex: "5000",
        "& .MuiDrawer-paper": {
          gap: "2rem",
          py: "2rem",
          px: 2,
          backgroundImage: "none",
          boxSizing: "border-box",
          width: {
            sm: "400px",
            xs: "300px",
          },
        },
      }}
    >
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Typography variant="h6">SHOPPING BAG({cartItems.length})</Typography>
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
          onClick={() => toggleCart()}
        />
      </Stack>
      {cartItems.length === 0 ? (
        <Typography variant="h6" textAlign={"center"}>
          cart is empty
        </Typography>
      ) : (
        <Fragment>
          <Stack gap={"1.5rem"}>
            {cartItems.map((item, index) => (
              <Stack
                key={index}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  borderBottom: "1px solid #ffffff63",
                  pb: 2,
                }}
              >
                <Stack direction={"row"} gap={"1rem"}>
                  <Box width={"41%"}>
                    <img
                      style={{
                        maxWidth: "100%",
                      }}
                      src={item.imgSrc}
                      alt="item"
                    />
                  </Box>
                  <Stack justifyContent={"center"} gap={"0.7rem"}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                      }}
                    >
                      {item.brand}
                    </Typography>
                    <Stack
                      width={"95px"}
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
                        onClick={() => dispatch(decrementByOne(item.name))}
                        sx={{
                          cursor: "pointer",
                          color: "text.secondary",
                        }}
                      />
                      <Box>{item.quantity}</Box>
                      <AddOutlinedIcon
                        sx={{
                          cursor: "pointer",
                          color: "text.secondary",
                        }}
                        onClick={() => dispatch(incrementByOne(item.name))}
                      />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack justifyContent={"space-between"} height={"100%"}>
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(removeItem(item.name))}
                  />
                  <Typography variant="body1">${item.price}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Fragment>
      )}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="body1">SUBTOTAL</Typography>
        <Typography variant="body1">${subTotal}</Typography>
      </Stack>
      <Button
        variant="contained"
        onClick={() => {
          toggleCart();
          navigate("/checkout");
        }}
      >
        CHECKOUT
      </Button>
    </Drawer>
  );
};

export default Cart;
