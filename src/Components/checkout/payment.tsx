import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useAppSelector } from "../../hooks/hooks";
import { FormikErrors, FormikHandlers, FormikTouched } from "formik";
import { cartItemsSelector } from "../../store/cartSlice";
import { LoadingButton } from "@mui/lab";
interface Props {
  values: {
    [key: string]: string;
  };
  errors: FormikErrors<{
    [key: string]: string;
  }>;
  touched: FormikTouched<{
    [key: string]: boolean;
  }>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
  onBackHandler: () => void;
  isSubmitting: boolean;
}

const Payment = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  onBackHandler,
  isSubmitting,
}: Props): JSX.Element => {
  const cartItems = useAppSelector(cartItemsSelector);

  return (
    <Stack gap={"1rem"} mt={5}>
      <Typography variant="h6">Contact Info</Typography>
      <TextField
        label={"Email"}
        fullWidth
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name={"email"}
        error={touched["email"] && !!errors["email"]}
        helperText={touched["email"] && errors["email"]}
      />
      <TextField
        label={"Phone Number"}
        fullWidth
        type="text"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name={"phoneNumber"}
        error={touched["phoneNumber"] && !!errors["phoneNumber"]}
        helperText={touched["phoneNumber"] && errors["phoneNumber"]}
      />
      <Stack direction={"row"} gap={"3rem"}>
        <Button variant="contained" fullWidth onClick={onBackHandler}>
          BACK
        </Button>
        <LoadingButton
          disabled={cartItems.length === 0}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          loading={isSubmitting}
        >
          PLACE ORDER
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default Payment;
