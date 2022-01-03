import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  ButtonGroup,
  Button,
  makeStyles,
} from "@material-ui/core";
import { DeleteTwoTone } from "@material-ui/icons";
import React from "react";
import { roundTo2DecimalPoints } from "../../utils";

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    margin: "15px 0px",
    "&:hover": {
      cursor: "pointer",
    },
    "&:hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#E3E3E3",
    borderRadius: 8,
    "& .MuiButtonBase-root ": {
      border: "none",
      minWidth: "25px",
      padding: "1px",
    },
    "& button:nth-child(2)": {
      fontSize: "1.2em",
      color: "#000",
    },
  },
  deleteButton: {
    display: "none",
    "& .MuiButtonBase-root": {
      color: "#E81719",
    },
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "0px 10px",
  },
}));

export default function OrderedFoodItems(props) {
  const { values, setValues } = props;
  let orderedFoodItems = values.orderDetails;
  const classes = useStyles();

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
        <Paper className={classes.paperRoot} key={index}>
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
                  <ButtonGroup className={classes.buttonGroup} size="small">
                    <Button onClick={(e) => updateQuantity(index, -1)}>
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={(e) => updateQuantity(index, 1)}>+</Button>
                  </ButtonGroup>
                  <span className={classes.totalPerItem}>
                    {"$" +
                      roundTo2DecimalPoints(item.quantity * item.foodItemPrice)}
                  </span>
                </>
              }
              secondaryTypographyProps={{
                component: "div",
              }}
            />
            <ListItemSecondaryAction className={classes.deleteButton}>
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
