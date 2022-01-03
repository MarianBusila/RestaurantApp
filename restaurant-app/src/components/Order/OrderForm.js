import {
  ButtonGroup,
  Grid,
  InputAdornment,
  Button as MuiButton,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Input, Select, Button } from "../../controls";
import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";
import Form from "../../layouts/Form";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import { AirlineSeatIndividualSuiteSharp } from "@material-ui/icons";
import { roundTo2DecimalPoints } from "../../utils";
import Popup from "../../layouts/Popup";
import OrderList from "./OrderList";

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
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControls,
  } = props;
  const classes = useStyles();

  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((response) => {
        let customerList = response.data.map((item) => ({
          id: item.customerId,
          title: item.customerName,
        }));
        customerList = [{ id: 0, title: "Select" }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch((err) => console.log(err));
  }, []); // since last array is empty this is equivalent of componentDidMount from react class components

  useEffect(() => {
    let gTotal = values.orderDetails.reduce((tempTotal, item) => {
      return tempTotal + item.quantity * item.foodItemPrice;
    }, 0);
    setValues({
      ...values,
      total: roundTo2DecimalPoints(gTotal),
    });
  }, [JSON.stringify(values.orderDetails)]);

  const validateForm = () => {
    let temp = {};
    temp.customerId = values.customerId !== 0 ? "" : "This field is required.";
    temp.paymentMethod =
      values.paymentMethod !== "None" ? "" : "This field is required.";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "This field is required.";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      createApiEndpoint(ENDPOINTS.ORDER)
        .create(values)
        .then((res) => {
          resetFormControls();
        })
        .catch((err) => console.log(err));
    }
  };

  const openListOfOrders = () => {
    setOrderListVisibility(true);
  };
  return (
    <>
      <Form onSubmit={submitOrder}>
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
              error={errors.customerId}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Payment Method"
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={handleInputChange}
              options={paymentMethods}
              error={errors.paymentMethod}
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
            <Button
              size="large"
              startIcon={<ReorderIcon />}
              onClick={openListOfOrders}
            >
              Orders
            </Button>
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="List of Orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderListVisibility}
      >
        <OrderList />
      </Popup>
    </>
  );
}
