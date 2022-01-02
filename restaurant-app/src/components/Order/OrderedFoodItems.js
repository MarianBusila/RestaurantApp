import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { DeleteTwoTone } from "@material-ui/icons";
import React from "react";

export default function OrderedFoodItems(props) {
  const { values, setValues } = props;
  let orderedFoodItems = values.orderDetails;

  const removeFoodItem = (index, id) => {
    let x = { ...values };
    x.orderDetails = x.orderDetails.filter((_, i) => i !== index);
    setValues({ ...x });
  };
  const updateQuantity = (index, value) => {
    let x = { ...values };
    let foodItem = x.orderDetails[index];
    if (foodItem.quantity + value > 0) {
      foodItem.quantity += value;
      setValues({ ...x });
    }
  };

  return (
    <List>
      {orderedFoodItems.map((item, index) => (
        <Paper key={index}>
          <ListItem>
            <ListItemText
              primary={item.foodItemName}
              primaryTypographyProps={{
                component: "h1",
                style: {
                  fontWeight: "500",
                  fontSize: "1.2em",
                },
              }}
              secondary={
                <>
                  <ButtonGroup size="small">
                    <Button onClick={(e) => updateQuantity(index, -1)}>
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={(e) => updateQuantity(index, 1)}>+</Button>
                  </ButtonGroup>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                disableRipple
                onClick={(e) => removeFoodItem(index, item.orderDetailsId)}
              >
                <DeleteTwoTone />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
