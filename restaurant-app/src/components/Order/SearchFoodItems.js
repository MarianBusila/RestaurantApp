import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";

export default function SearchFoodItems() {
  const [foodItemList, setFoodItemList] = useState([]);

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((response) => {
        setFoodItemList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <List>
      {foodItemList.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item.foodItemName} secondary={item.price} />
        </ListItem>
      ))}
    </List>
  );
}
