import { Typography, Grid, TextField, Button } from "@mui/material";
import { Fragment } from "react";

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
}

const AddressForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
}: Props): JSX.Element => {
  return (
    <Fragment>
      <Typography variant="h6" mt={5} mb={"1rem"}>
        Billing Information
      </Typography>
      <Grid container spacing={"1rem"}>
        <Grid item sm={6} xs={12}>
          <TextField
            label={"First Name"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.firstName}
            name={"firstName"}
            error={touched["firstName"] && !!errors["firstName"]}
            helperText={!!touched["firstName"] && errors["firstName"]}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            label={"Last Name"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.lastName}
            name={"lastName"}
            error={touched["lastName"] && !!errors["lastName"]}
            helperText={!!touched["lastName"] && errors["lastName"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={"Country"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.country}
            name={"country"}
            error={touched["country"] && !!errors["country"]}
            helperText={!!touched["country"] && errors["country"]}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            label={"Street Address"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street1}
            name={"street1"}
            error={touched["street1"] && !!errors["street1"]}
            helperText={!!touched["street1"] && errors["street1"]}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            label={"Street Address 2 (optional)"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.street2}
            name={"street2"}
            error={touched["street2"] && !!errors["street2"]}
            helperText={!!touched["street2"] && errors["street2"]}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            label={"City"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.city}
            name={"city"}
            error={touched["city"] && !!errors["city"]}
            helperText={!!touched["city"] && errors["city"]}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <TextField
            label={"State"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.state}
            name={"state"}
            error={touched["state"] && !!errors["state"]}
            helperText={!!touched["state"] && errors["state"]}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <TextField
            label={"Zip Code"}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.zipCode}
            name={"zipCode"}
            error={touched["zipCode"] && !!errors["zipCode"]}
            helperText={!!touched["zipCode"] && errors["zipCode"]}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={handleSubmit}>
            NEXT
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AddressForm;
