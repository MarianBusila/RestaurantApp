import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { DeleteOutlineTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";

export default function OrderList() {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    createApiEndpoint(ENDPOINTS.ORDER)
      .fetchAll()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
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
            <TableCell>{item.orderNumber}</TableCell>
            <TableCell>{item.customer.customerName}</TableCell>
            <TableCell>{item.paymentMethod}</TableCell>
            <TableCell>{item.total}</TableCell>
            <TableCell>
              <DeleteOutlineTwoTone color="secondary" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
