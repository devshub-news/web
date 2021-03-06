import { AppBar, IconButton, Menu, MenuItem, Switch, Toolbar, Typography } from "@material-ui/core"
import React, { useEffect } from "react";
import NotificationsIcon from '@material-ui/icons/Notifications';

import './Main.css'
import { Redirect, Route, HashRouter as Router, Switch as RouterSwitch } from 'react-router-dom';
import NotificationsAPI from "../common/notificationsAPI";
import NotificationsManager from "../common/notificationsManager";
import News from "../news/News";
import Topic from "../topic/Topic";
import {categories as categoriesNames} from "../common/categories";

const Main = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [categories, setCategories] = React.useState({});

    useEffect(() => {
        const getSubscriptionCategories = async () => {
            let sub = await NotificationsManager.subscription
            if (sub) {
                setCategories(sub.categories || {})
            }
        }
        getSubscriptionCategories();
    }, [])

    // useEffect(() => {
    //     sendSubscription()
    // }, [categories])


    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sendSubscription = async () => {
        const newCategories = Object.fromEntries(Object.entries(categories).filter(([, checked]) => checked))
        console.log(newCategories)
        const subscription = await NotificationsManager.subscription
        if (subscription) {
            subscription.categories = newCategories
            await NotificationsAPI.sendSubscription(subscription)
        }
        else {
            await NotificationsManager.subscribe(newCategories)
        }

    }

    async function toggleChecked(e, category) {
        console.log(e.target.checked)
        if (e.target.checked) {
            setCategories(prev => {
                prev[category] = true
                sendSubscription()
                return { ...prev }
            })
        }
        else {
            setCategories(prev => {
                prev[category] = false
                sendSubscription()
                return { ...prev }
            })
        }

    }


    return <div className="main-container">
        <AppBar position="static" className="appbar">
            <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                <a href="#/" style={{ display: "flex" }}>
                    <img src="assets/images/devshub-white.png" alt="" className="toolbar-icon" srcSet="assets/images/devshub-white.svg" />
                    <Typography variant="h6" className="main-title" >
                        DevsHub
                    </Typography>
                </a>
                <div style={{ display: "flex" }}>
                    <div>
                        <IconButton aria-haspopup="true" onClick={handleMenuClick} color="secondary">
                            <NotificationsIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {Object.entries(categoriesNames).map(([category, categoryName]) => (
                                <MenuItem className="main-notications-menu-item" key={category}>
                                    <span style={{ marginRight: "10px" }}>
                                        {categoryName}
                                    </span>
                                    <Switch size="small" color="primary" checked={categories[category] || false} onChange={(e) => toggleChecked(e, category)} />
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        <div style={{ display: "flex", height: "min-content", backgroundColor: "inherit", paddingBottom: '50px' }}>
                <Router>
                    <RouterSwitch>
                        <Route path="/" exact={true}>
                            <News></News>
                        </Route>
                        <Route path="/topic/:category" exact={true} component={Topic}>
                        </Route>
                        <Route path="/hub/:id" exact={true}>
                            Una espec??fica
                        </Route>
                        <Redirect path="" to="/" />
                    </RouterSwitch>
                </Router>
        </div>
    </div>
}

export default Main