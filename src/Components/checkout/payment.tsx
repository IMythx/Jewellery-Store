import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

interface Props {
  values: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
  touched: {
    [key: string]: boolean;
  };
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSubmit: () => void;
  onBackHandler: () => void;
}

const Payment = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  onBackHandler,
}: Props): JSX.Element => {
  return (
    <Stack gap={"1rem"} mt={5}>
      <Typography variant="h6">Contact Info</Typography>
      <TextField
        label={"Email"}
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name={"email"}
        error={touched["email"] && !!errors["email"]}
        helperText={!!touched["email"] && errors["email"]}
      />
      <TextField
        label={"Phone Number"}
        fullWidth
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name={"phoneNumber"}
        error={touched["phoneNumber"] && !!errors["phoneNumber"]}
        helperText={!!touched["phoneNumber"] && errors["phoneNumber"]}
      />
      <Stack direction={"row"} gap={"3rem"}>
        <Button variant="contained" fullWidth onClick={onBackHandler}>
          BACK
        </Button>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          PLACE ORDER
        </Button>
      </Stack>
    </Stack>
  );
};

export default Payment;
