import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { DeleteOutlineTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";

export default function OrderList(props) {
  const { setOrderId, setOrderListVisibility, resetFormControls, setNotify } =
    props;
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.ORDER)
      .fetchAll()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const showForUpdate = (id) => {
    setOrderId(id);
    setOrderListVisibility(false);
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete the selected order?")) {
      createApiEndpoint(ENDPOINTS.ORDER)
        .delete(id)
        .then((res) => {
          setOrderListVisibility(false);
          setOrderId(0);
          resetFormControls();
          setNotify({ isOpen: true, message: "Order is deleted." });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order No.</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Payed with</TableCell>
          <TableCell>Total</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderList.map((item) => (
          <TableRow key={item.orderMasterId}>
            <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
              {item.orderNumber}
            </TableCell>
            <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
              {item.customer.customerName}
            </TableCell>
            <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
              {item.paymentMethod}
            </TableCell>
            <TableCell onClick={(e) => showForUpdate(item.orderMasterId)}>
              {item.total}
            </TableCell>
            <TableCell>
              <DeleteOutlineTwoTone
                color="secondary"
                onClick={(e) => deleteOrder(item.orderMasterId)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
