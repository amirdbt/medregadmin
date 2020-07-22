import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  makeStyles,
  IconButton,
  useTheme,
  Grid,
  Typography,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
  AppBar,
  Box,
  Button,
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import SearchBox from "../Utility/SearchBox";
import ActiveUsers from "./ActiveUsers";
import NonActiveUsers from "./NonActiveUsers";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#1a237e",
  },
  text: {
    color: "#fff",
  },
  appbar: {
    backgroundColor: "#fff",
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.0),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
}

const AllUsers = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const divRef = React.useRef();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchUser = () => {
      setLoading(true);
      axios
        .get(`https://polar-dusk-61658.herokuapp.com/admin/info`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          console.log(res.data.users);
          setUsers(res.data.users);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setErr(true);
        });
    };
    fetchUser();
  }, []);

  const filteredUsers = users.length
    ? users.filter((user) => {
        return user.userName.toLowerCase().includes(searchField.toLowerCase());
      })
    : "";
  let activatedUser = users.filter((user) => user.deactivate === false);
  let deactivatedUser = users.filter((user) => user.deactivate === true);

  return (
    <div className="content" ref={divRef}>
      {err && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There is an error with the server. Please refresh the page.
        </Alert>
      )}
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Users
      </Typography>

      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appbar}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              className={classes.tabs}
              aria-label="scrollable force tabs example"
            >
              <Tab label="All Users" {...a11yProps(0)} />
              <Tab label="Active Users" {...a11yProps(1)} />
              <Tab label="Non Active Users" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <SearchBox
              place="Search By Username..."
              searchChange={searchChange}
            />
            <Grid container>
              {filteredUsers.length ? (
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="customized table">
                      <TableHead className={classes.head}>
                        <TableRow>
                          <TableCell className={classes.text}>
                            First Name
                          </TableCell>
                          <TableCell className={classes.text}>
                            Last Name
                          </TableCell>
                          <TableCell className={classes.text}>
                            User Name
                          </TableCell>
                          <TableCell className={classes.text}>Gender</TableCell>
                          <TableCell className={classes.text}>
                            Nationality
                          </TableCell>
                          <TableCell className={classes.text}>State</TableCell>

                          <TableCell className={classes.text}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? filteredUsers.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : filteredUsers
                        ).map((user, index) => (
                          <TableRow key={index}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>
                              {user.nationality ? user.nationality : "Not set"}
                            </TableCell>

                            <TableCell>
                              {user.stateOfOrigin
                                ? user.stateOfOrigin
                                : "Not set"}
                            </TableCell>
                            <TableCell>
                              {user.deactivate === false ? (
                                <Chip
                                  label="Active"
                                  style={{ color: "#2e7d32" }}
                                />
                              ) : (
                                <Chip
                                  label="Not Active"
                                  style={{ color: "#c62828" }}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}

                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={3}
                            count={filteredUsers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { "aria-label": "rows per page" },
                              native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item>
                  <Typography variant="h5">No Users</Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ActiveUsers users={activatedUser} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NonActiveUsers users={deactivatedUser} />
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default AllUsers;
