import { Grid, InputAdornment, makeStyles } from "@material-ui/core";
import React from "react";
import { Input, Select, Button } from "../../controls";
import Form from "../../layouts/Form";

const paymentMethods = [
  { id: "None", title: "None" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    }
}))

export default function OrderForm(props) {
  const { values, errors, handleInputChange } = props;
  const classes = useStyles();

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input
            disabled
            label="Order Number"
            name="orderNumber"
            value={values.orderNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.adornmentText} position="start">#</InputAdornment>
              ),
            }}
          />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handleInputChange}
            options={[
              { id: 0, title: "Select" },
              { id: 1, title: "Customer 1" },
              { id: 2, title: "Customer 2" },
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Method"
            name="paymentMethod"
            value={values.paymentMethod}
            onChange={handleInputChange}
            options={paymentMethods}
          />
          <Input
            disabled
            label="Total"
            name="total"
            value={values.total}
            InputProps={{
              startAdornment: (
                <InputAdornment className={classes.adornmentText}  position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
