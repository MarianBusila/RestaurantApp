import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import React from 'react'

export default function OrderedFoodItems(props) {
    const {orderedFoodItems} = props;

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
                        </ListItem>
                    </Paper>
                ))
            }
        </List>
    )
}
