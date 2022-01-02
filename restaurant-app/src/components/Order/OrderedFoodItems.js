import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Paper } from '@material-ui/core';
import { DeleteTwoTone } from '@material-ui/icons';
import React from 'react'

export default function OrderedFoodItems(props) {
    const {orderedFoodItems, removeFoodItem} = props;

    return (
        <List>
            {
                orderedFoodItems.map( (item, index) => (
                    <Paper key={index}>
                        <ListItem>
                            <ListItemText primary={item.foodItemName}
                            primaryTypographyProps= {{
                                component: 'h1',
                                style: {
                                    fontWeight: '500',
                                    fontSize: '1.2em'
                                }
                            }} />
                            <ListItemSecondaryAction>
                                <IconButton disableRipple onClick={e => removeFoodItem(index, item.orderDetailsId)}>
                                    <DeleteTwoTone />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Paper>
                ))
            }
        </List>
    )
}
