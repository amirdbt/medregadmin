import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Hidden,
  Chip,
} from "@material-ui/core";
import {
  Dashboard,
  AccountCircle,
  LocalHospital,
  PowerSettingsNew,
  Group,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import Notifications from "./Notifications";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#000051",
    color: "#fff",
  },
  header: {
    fontSize: "22px",
    textAlign: "center",
    lineHeight: "50px",
    userSelect: "none",
    backgroundColor: "#18227c",
  },
  listItems: {
    padding: "15px",
  },
  iconColor: {
    color: "#bcbcbc",
    fontSize: "20px",
  },
  topBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#ffffff",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    flexGrow: 1,
  },
  searchIcon: {
    marginRight: "10px",
  },
  appIcons: {
    display: "flex",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  link1: {
    textDecoration: "none",
    color: "#000000",
  },
}));

const SideBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");

    history.push("/signin");
  };

  // console.log(activate);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <header className={classes.header}>
        MedRecords <br />
        <Chip label="Admin" style={{ marginTop: "-15px" }} />
      </header>

      <Divider />
      <List>
        <Link className={classes.link} to="/">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <Dashboard />
            </ListItemIcon>
            <Typography variant="h5">Dashboard</Typography>
          </ListItem>
        </Link>

        <Link className={classes.link} to="#">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <AccountCircle />
            </ListItemIcon>
            <Typography variant="h5">Profile</Typography>
          </ListItem>
        </Link>
        <Link className={classes.link} to="#">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <Group />
            </ListItemIcon>
            <Typography variant="h5">People</Typography>
          </ListItem>
        </Link>
        <Link className={classes.link} to="/providers">
          <ListItem button className={classes.listItems}>
            <ListItemIcon className={classes.iconColor}>
              <LocalHospital />
            </ListItemIcon>
            <Typography variant="h5">Hospitals</Typography>
          </ListItem>
        </Link>
      </List>
    </>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <AppBar className={classes.topBar} color="default" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>{/* <Search /> */}</div>
            <InputBase />
          </div>
          <div />
          <div className={classes.appIcons}>
            <Notifications />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <PowerSettingsNew />
            </IconButton>
            <Menu
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              elevation={0}
            >
              <Link to="#" className={classes.link1}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>

              <Link to="/signin" className={classes.link1}>
                <MenuItem onClick={logout}>Log out</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            className={classes.drawer}
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default SideBar;
