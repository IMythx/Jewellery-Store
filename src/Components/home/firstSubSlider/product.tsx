import {
  Box,
  Stack,
  Typography,
  Modal,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState, Fragment } from "react";
import Slider from "react-slick";
import { CustomArrowProps } from "react-slick";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  useAppDispatch,
  useAppSelector,
  useStableNavigate,
} from "../../../hooks/hooks";
import { dataSelector } from "../../../store/dataSlice";
import {
  isItemInCartSelector,
  itemIsBeingAddedSelector,
} from "../../../store/cartSlice";
import { data } from "../../../modules/data";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import { addItem } from "../../../store/cartSlice";

interface Props {
  src: string[];
  brand: string;
  name: string;
  price: number;
  priceId: string;
}

const Product = ({ src, brand, name, price, priceId }: Props): JSX.Element => {
  const data = useAppSelector(dataSelector) as data;

  const isTablet = useMediaQuery("(max-width:992px)");

  const isInCart = useAppSelector((state) => isItemInCartSelector(state, name));

  const isLoggedIn = useAppSelector((state) => state.logIn.isLoggedIn);

  const isAddingItem = useAppSelector((state) =>
    itemIsBeingAddedSelector(state, name)
  );

  const navigate = useStableNavigate();

  const dispatch = useAppDispatch();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [activeModalImg, setActiveModalImg] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

  const [openToolTip, setOpenToolTip] = useState<boolean>(false);

  const [size, setSize] = useState<string>("");

  const [count, setCount] = useState<number>(1);

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
  };

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    !isInCart &&
      dispatch(
        addItem({
          name,
          imgSrc: src[0],
          price,
          quantity: 1,
          brand,
          priceId,
        })
      );
  };
  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenToolTip = () => !isLoggedIn && setOpenToolTip(true);

  const handleCloseToolTip = () => setOpenToolTip(false);

  return (
    <Fragment>
      <Stack
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onClick={() => navigate(`/shop/${name}`)}
        sx={{
          cursor: "pointer",
          px: 1,
        }}
        rowGap={0.5}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "3px",
          }}
        >
          {!isHovered ? (
            <img
              style={{
                maxWidth: "100%",
              }}
              src={src[0]}
              alt="product"
            />
          ) : (
            <img
              style={{
                maxWidth: "100%",
                scale: "1.1",
                transition: "all 300ms",
              }}
              src={src[1]}
              alt="product"
            />
          )}

          {(isHovered || isTablet) && (
            <Stack
              sx={{
                position: "absolute",
                inset: "0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  flexBasis: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: isTablet ? "0.5rem" : "1.5rem",
                }}
              >
                <RemoveRedEyeOutlinedIcon
                  sx={{
                    fontSize: "2.3rem",
                    p: "0.4rem",
                    bgcolor: "background.paper",
                    borderRadius: "5px",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "background.paper",
                    },
                  }}
                  onClick={handleOpen}
                />
                <Tooltip
                  open={openToolTip}
                  onClose={handleCloseToolTip}
                  onOpen={handleOpenToolTip}
                  title="please login first"
                  arrow
                  placement="top"
                >
                  <Box
                    component={"span"}
                    sx={{
                      cursor: "default !important",
                    }}
                  >
                    <LoadingButton
                      loading={isAddingItem}
                      variant="outlined"
                      sx={{
                        minWidth: "auto",
                        p: 0,
                        border: "none !important",
                      }}
                      color={"primary"}
                      disabled={!isLoggedIn}
                    >
                      <LocalMallOutlinedIcon
                        sx={{
                          fontSize: "2.3rem",
                          p: "0.4rem",
                          bgcolor: isInCart
                            ? "primary.main"
                            : "background.paper",
                          color: !isLoggedIn
                            ? "text.secondary"
                            : isInCart
                            ? "background.paper"
                            : isAddingItem
                            ? ""
                            : "text.primary",
                          borderRadius: "5px",
                          cursor:
                            isInCart || !isLoggedIn ? "default" : "pointer",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "background.paper",
                          },
                        }}
                        onClick={onClickHandler}
                      />
                    </LoadingButton>
                  </Box>
                </Tooltip>
              </Stack>
            </Stack>
          )}
        </Box>
        <Typography fontSize={"0.90rem"} color={"text.secondary"}>
          {brand.toUpperCase()}
        </Typography>
        <Typography
          fontSize={"0.90rem"}
          color={isHovered ? "primary.main" : "text.secondary"}
        >
          {name}
        </Typography>
        <Typography fontSize={"1.15rem"} color={"primary.main"}>
          From ${price}
        </Typography>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            top: {
              md: "40%",
              xs: "52%",
            },
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "7px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "900px",
            width: "90%",
            maxHeight: {
              md: "auto",
              xs: "100%",
            },
            overflow: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              minWidth: "40px",
              px: "12px",
              position: "absolute",
              top: "0%",
              right: "0%",
              zIndex: 100000,
            }}
          >
            <CloseOutlinedIcon />
          </Button>
          <Stack
            direction={{
              md: "row",
              xs: "column",
            }}
            p={"1rem"}
            gap={"2rem"}
          >
            <Stack
              rowGap={"1rem"}
              width={{
                md: "40%",
                xs: "100%",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  borderRadius: "7px",
                }}
              >
                <img
                  style={{
                    maxWidth: "100%",
                    minHeight: "100%",
                  }}
                  src={src[activeModalImg]}
                  alt="IMAGE"
                />
              </Box>
              <Box width={"95%"}>
                <Slider
                  focusOnSelect={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={4}
                  slidesToScroll={1}
                  useTransform={false}
                  arrows={true}
                  prevArrow={<PrevArrow />}
                  nextArrow={<NextArrow />}
                  beforeChange={(index, newIndex) => setActiveModalImg(newIndex)}
                >
                  {data[`${name}`].src.map((src) => (
                    <Box
                      key={src}
                      sx={{
                        px: 0.7,
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{
                          maxWidth: "100%",
                          border: "1px solid #fff",
                          borderRadius: "7px",
                        }}
                        src={src}
                        alt="item"
                      />
                    </Box>
                  ))}
                </Slider>
              </Box>
            </Stack>
            <Stack
              width={{
                md: "60%",
                xs: "100%",
              }}
              gap={{
                md: "1.5rem",
                xs: "1rem",
              }}
            >
              <Typography variant="h5">{name}</Typography>
              <Typography variant="h5">${price}</Typography>
              <Typography variant="body2" color={"text.secondary"}>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text.
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select value={size} label="size" onChange={handleChange}>
                  <MenuItem value={"small"}>S</MenuItem>
                  <MenuItem value={"medium"}>M</MenuItem>
                  <MenuItem value={"large"}>L</MenuItem>
                </Select>
              </FormControl>
              <Stack
                width={"30%"}
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
                  onClick={() =>
                    count > 1 && setCount((prev: number) => prev - 1)
                  }
                  sx={{
                    cursor: "pointer",
                    color: "text.secondary",
                  }}
                />
                <Box>{count}</Box>
                <AddOutlinedIcon
                  sx={{
                    cursor: "pointer",
                    color: "text.secondary",
                  }}
                  onClick={() => setCount((prev: number) => prev + 1)}
                />
              </Stack>
              <Tooltip
                open={openToolTip}
                onClose={handleCloseToolTip}
                onOpen={handleOpenToolTip}
                title="please login first"
                arrow
                placement="top"
              >
                <Box component={"span"}>
                  <LoadingButton
                    loading={isAddingItem}
                    disableElevation
                    sx={{
                      bgcolor: "#434343",
                      color: "text.primary",
                    }}
                    fullWidth
                    variant="contained"
                    onClick={onClickHandler}
                    disabled={!isLoggedIn}
                  >
                    {!isInCart ? (
                      "Add to cart"
                    ) : (
                      <Fragment>
                        <CheckCircleOutlineIcon
                          sx={{
                            mr: "1rem",
                          }}
                        />
                        Added
                      </Fragment>
                    )}
                  </LoadingButton>
                </Box>
              </Tooltip>
            </Stack>
          </Stack>
        </Paper>
      </Modal>
    </Fragment>
  );
};

export default Product;

const NextArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <KeyboardArrowRightOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(10px, -50%)",
      fontSize: "2rem",
      "&:hover": {
        color: "text.primary",
      },
    }}
  />
);
const PrevArrow = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => (
  <KeyboardArrowLeftOutlinedIcon
    {...props}
    sx={{
      color: "text.secondary",
      transform: "translate(-10px, -50%)",
      fontSize: "2rem",
      zIndex: "50",
      "&:hover": {
        color: "text.primary",
      },
    }}
  />
);
