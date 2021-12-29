import React from "react";
import { useForm } from "../../hooks/useForm";
import OrderForm from "./OrderForm";

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

export default function Order() {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

  return <OrderForm {...{values, errors, handleInputChange}} />;
}
