import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Paper,
  makeStyles,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { ArrowForwardIos, PlusOne, SearchTwoTone } from "@material-ui/icons";
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
  listRoot: {
      marginTop: theme.spacing(1),
      maxHeight: 450,
      overflow: 'auto',
      '& li:hover': {
          cursor: 'pointer',
          backgroundColor: '#E3E3E3'
      },
      '& li:hover .MuiButtonBase-root': {
          display: 'block',
          color: '#000',
      },
      '& .MuiButtonBase-root': {
          display: 'none'
      },
      '& .MuiButtonBase-root:hover': {
          backgroundColor: 'transparent'
      }
  }
}));

export default function SearchFoodItems(props) {

  const {orderedFoodItems, addFoodItem} = props;

  const [foodItemList, setFoodItemList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
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
        return y.foodItemName.toLowerCase().includes(searchKey.toLowerCase()) && orderedFoodItems.every( item => item.foodItemId !== y.foodItemId)
      });
      setSearchList(x);
  }, [searchKey, orderedFoodItems]);

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
      <List className={classes.listRoot}>
        {searchList.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.foodItemName} secondary={item.price} />
            <ListItemSecondaryAction > 
                <IconButton onClick={e => addFoodItem(item)}>
                    <PlusOne />
                    <ArrowForwardIos />
                </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
}
