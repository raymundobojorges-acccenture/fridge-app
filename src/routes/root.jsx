import React, { useState } from 'react';
import { Outlet, useLoaderData, Link,  Form, redirect, NavLink, useNavigation }from "react-router-dom";
import { AppBar, Toolbar, Drawer, List, ListItem, makeStyles } from '@material-ui/core';
import { getIngredients, createIngredient } from "../ingredients";

export async function loader() {
    const contacts = await getIngredients();
    return { contacts };
  }

  export async function action() {
    const contact = await createIngredient();
    // return redirect(`/contacts/${contact.id}/edit`);
  }

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    marginLeft: 240,
    marginTop: 64,
  },
}));

const Root = () => {
  const classes = useStyles();
  // const [ingredients, setIngredients] = useState();
  const { ingredients } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <h2>Refrigerador Dashboard</h2>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/availables">
            Disponibles
          </ListItem>
          <ListItem button component={Link} to="/unavailables">
            No disponibles
          </ListItem>
        </List>
      </Drawer>

      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Root;
