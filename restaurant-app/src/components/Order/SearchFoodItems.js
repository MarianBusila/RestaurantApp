import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { SearchTwoTone } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { createApiEndpoint, ENDPOINTS } from "../../api";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
}));

export default function SearchFoodItems() {
  const [foodItemList, setFoodItemList] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const [searchList, setSearchList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    createApiEndpoint(ENDPOINTS.FOODITEM)
      .fetchAll()
      .then((response) => {
        setFoodItemList(response.data);
        setSearchList(response.data)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
      let x = [...foodItemList];
      x = x.filter((y) => {
        return y.foodItemName.toLowerCase().includes(searchKey.toLowerCase())
      });
      setSearchList(x);
  }, [searchKey]);

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          className={classes.searchInput}
          placeholder="Search food items"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <IconButton>
          <SearchTwoTone />
        </IconButton>
      </Paper>
      <List>
        {searchList.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.foodItemName} secondary={item.price} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
