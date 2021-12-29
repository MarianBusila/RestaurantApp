import {
  ButtonGroup,
  Grid,
  InputAdornment,
  Button as MuiButton,
  makeStyles,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { Input, Select, Button } from "../../controls";
import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";
import Form from "../../layouts/Form";
import {createApiEndpoint, ENDPOINTS} from "../../api";

const paymentMethods = [
  { id: "None", title: "None" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const useStyles = makeStyles((theme) => ({
  adornmentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#f3b33d",
    color: "#000",
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "#f3b33d",
    },
  },
}));

export default function OrderForm(props) {
  const { values, errors, handleInputChange } = props;
  const classes = useStyles();

  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
      createApiEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
      .then(response => {
          let customerList = response.data.map(item => ({
              id: item.customerId,
              title: item.customerName
          }));
          customerList = [{ id: 0, title: "Select" }].concat(customerList);
          setCustomerList(customerList);
      })
      .catch(err => console.log(err))
  }, []) // since last array is empty this is equivalent of componentDidMount from react class components

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
                <InputAdornment
                  className={classes.adornmentText}
                  position="start"
                >
                  #
                </InputAdornment>
              ),
            }}
          />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handleInputChange}
            options={customerList}
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
                <InputAdornment
                  className={classes.adornmentText}
                  position="start"
                >
                  $
                </InputAdornment>
              ),
            }}
          />
          <ButtonGroup className={classes.submitButtonGroup}>
            <MuiButton
              size="large"
              type="submit"
              endIcon={<RestaurantMenuIcon />}
            >
              Submit
            </MuiButton>
            <MuiButton size="small" startIcon={<ReplayIcon />}></MuiButton>
          </ButtonGroup>
          <Button size="large" startIcon={<ReorderIcon />}>
            Orders
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}
