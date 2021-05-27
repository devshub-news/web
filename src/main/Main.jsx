import { AppBar, IconButton, Menu, MenuItem, Paper, Switch, Toolbar, Typography } from "@material-ui/core"
import React, { useEffect } from "react";
import NotificationsIcon from '@material-ui/icons/Notifications';

import './Main.css'
import { Redirect, Route, HashRouter as Router, Switch as RouterSwitch } from 'react-router-dom';
import NotificationsAPI from "../common/notificationsAPI";
import NotificationsManager from "../common/notificationsManager";

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
                <a href="#/games" style={{ display: "flex" }}>
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
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }}>
                                    Web Development
                                </span>
                                <Switch size="small" color="primary" checked={categories['web'] || false} onChange={(e) => toggleChecked(e, 'web')} />
                            </MenuItem>
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }}>
                                    APIs and DBs
                                </span>
                                <Switch size="small" color="primary" checked={categories['apis'] || false} onChange={(e) => toggleChecked(e, 'apis')} />
                            </MenuItem>
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }}>
                                    AI and Python
                                </span>
                                <Switch size="small" color="primary" checked={categories['py'] || false} onChange={(e) => toggleChecked(e, 'py')} />
                            </MenuItem>
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }}>
                                    DevOps
                                </span>
                                <Switch size="small" color="primary" checked={categories['devops'] || false} onChange={(e) => toggleChecked(e, 'devops')} />
                            </MenuItem>
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }}>
                                    Career
                                </span>
                                <Switch size="small" color="primary" checked={categories['career'] || false} onChange={(e) => toggleChecked(e, 'career')} />
                            </MenuItem>
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }} >
                                    Hardware and OS
                                </span>
                                <Switch size="small" color="primary" checked={categories['so'] || false} onChange={(e) => toggleChecked(e, 'so')} />
                            </MenuItem>
                            <MenuItem className="main-notications-menu-item">
                                <span style={{ marginRight: "10px" }}>
                                    Others
                                </span>
                                <Switch size="small" color="primary" checked={categories['others'] || false} onChange={(e) => toggleChecked(e, 'others')} />
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
        <div style={{ display: "flex", height: "min-content", backgroundColor: "#f5f5f5", paddingBottom: '50px' }}>

            <Paper style={{ width: "95%", margin: "10px auto", height: "min-content" }} elevation={3}>
                <Router>
                    <RouterSwitch>
                        <Route path="/" exact={true}>
                            Todas
                        </Route>
                        <Route path="/topic/:category" exact={true}>
                            De una categoría
                        </Route>
                        <Route path="/hub/:id" exact={true}>
                            Una específica
                        </Route>
                        <Redirect path="" to="/" />
                    </RouterSwitch>
                </Router>
            </Paper>
        </div>
    </div>
}

export default Main