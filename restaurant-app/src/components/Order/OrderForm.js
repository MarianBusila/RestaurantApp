import { Grid } from "@material-ui/core";
import React from "react";
import Input from "../../controls/Input";
import Select from "../../controls/Select";
import Form from "../../layouts/Form";

const paymentMethods = [
    {id: "None", title:"None" },
    {id: "Cash", title:"Cash" },
    {id: "Card", title:"Card" },

]
export default function OrderForm() {
  return (
    <Form>
      <Grid container>
        <Grid item xs={6}>
          <Input disabled label="Order Number" name="orderNumber" />
          <Select
            label="Customer"
            name="customer"
            options={[
              { id: 0, title: "Select" },
              { id: 1, title: "Customer 1" },
              { id: 2, title: "Customer 2" },
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <Input disabled label="Total" name="total" />
          <Select
            label="Payment Method"
            name="paymentMethod"
            options={paymentMethods}
          />
        </Grid>
      </Grid>
    </Form>
  );
}
