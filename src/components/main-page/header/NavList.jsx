import React from 'react';
import {

     List,
     ListItem,
     ListItemIcon,
     ListItemText,
     Divider,

   } from "@material-ui/core";

const NavList = () => {
  return (
    <div>

      <List component="nav" aria-label="cicle">

        <ListItem button>
          <ListItemText primary="Link1" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Link1" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Link1" />
        </ListItem>

      </List>

      <Divider />
    </div>
  )
}

export default NavList