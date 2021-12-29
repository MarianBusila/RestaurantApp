import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { Input, Select, Button } from "../../controls";
import Form from "../../layouts/Form";

const paymentMethods = [
    {id: "None", title:"None" },
    {id: "Cash", title:"Cash" },
    {id: "Card", title:"Card" },

]

const generateOrderNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const getFreshModelObject = () => ({
    orderMasterId: 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    paymentMethod: "None",
    total: 0,
    deletetdOrderItemsIds: [],
    orderDetails: []
})

export default function OrderForm() {
    const [values, setValues] = useState(getFreshModelObject());

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const resetFormControls = () => {
        setValues(getFreshModelObject());
    }

  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input disabled label="Order Number" name="orderNumber" value={values.orderNumber} />
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange ={handleInputChange}
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
            onChange ={handleInputChange}
            options={paymentMethods}
          />
          <Input disabled label="Total" name="total" value={values.total} />
        </Grid>
      </Grid>
    </Form>
  );
}
