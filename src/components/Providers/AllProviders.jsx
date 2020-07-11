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
  Snackbar,
  Slide,
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import axios from "axios";
import { Alert, AlertTitle } from "@material-ui/lab";
import ActivatedProviders from "./ActivatedProviders";
import NonActivatedProviders from "./NonActivatedProviders";
import BlockedHospitals from "./BlockedHospitals";
import SearchBox from "../Utility/SearchBox";

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

const AllProviders = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [al, setAl] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const token = localStorage.getItem("token");
  const divRef = React.useRef();
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, hospitals.length - page * rowsPerPage);

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
          console.log(res.data.providers);
          setHospitals(res.data.providers);
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

  let notBlockedHospital = hospitals.filter(
    (hospital) => hospital.deactivated === false
  );
  const filteredHospitals = notBlockedHospital.length
    ? notBlockedHospital.filter((hospital) => {
        return hospital.providerName
          .toLowerCase()
          .includes(searchField.toLowerCase());
      })
    : "";
  let activatedHospital = hospitals.filter(
    (hospital) => hospital.activated === true
  );
  let deactivatedHospital = hospitals.filter(
    (hospital) => hospital.activated === false
  );
  let blockedHospital = hospitals.filter(
    (hospital) => hospital.deactivated === true
  );

  const blockProvider = (providerName) => {
    axios
      .delete(
        `https://polar-dusk-61658.herokuapp.com/admin/block/${providerName}`,
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        setMessage("Hospital Blocked Successfully");
        setAl(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Hospital Block Failed");
        setAl(true);
        setSeverity("error");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  };

  return (
    <div className="content" ref={divRef}>
      {err && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          There is an error with the server. Please refresh the page.
        </Alert>
      )}
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Hospitals (Providers)
      </Typography>

      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          {al ? (
            <>
              <Alert severity={severity}>
                <AlertTitle>{severity}</AlertTitle>
                {message}
              </Alert>
              <Snackbar
                open={open}
                // autoHideDuration={3000}
                TransitionComponent={Slide}
                onClose={handleClose}
              >
                <Alert severity={severity}>{message}</Alert>
              </Snackbar>
            </>
          ) : (
            <div></div>
          )}
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
              <Tab label="All Hospitals" {...a11yProps(0)} />
              <Tab label="Activated Hospitals" {...a11yProps(1)} />
              <Tab label="Non Activated Hospitals" {...a11yProps(2)} />
              <Tab label="Blocked Hospitals" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <SearchBox
              place="Search By Hospital Name..."
              searchChange={searchChange}
            />
            <Grid container>
              {filteredHospitals.length ? (
                <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper} elevation={0}>
                    <Table aria-label="customized table">
                      <TableHead className={classes.head}>
                        <TableRow>
                          <TableCell className={classes.text}>Name</TableCell>

                          <TableCell className={classes.text}>State</TableCell>
                          <TableCell className={classes.text}>
                            Phone Number
                          </TableCell>
                          <TableCell className={classes.text}>Status</TableCell>
                          <TableCell className={classes.text}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? filteredHospitals.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : filteredHospitals
                        ).map((hospital, index) => (
                          <TableRow key={index}>
                            <TableCell>{hospital.providerName}</TableCell>

                            <TableCell>{hospital.state}</TableCell>
                            <TableCell>{hospital.phone_number_main}</TableCell>
                            <TableCell>
                              {hospital.activated === true ? (
                                <Chip
                                  label="Activated"
                                  style={{ color: "#2e7d32" }}
                                />
                              ) : (
                                <Chip
                                  label="Deactivated"
                                  style={{ color: "#c62828" }}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="text"
                                color="secondary"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to Block this Hospital?"
                                    )
                                  )
                                    blockProvider(hospital.providerName);
                                }}
                              >
                                Block
                              </Button>
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
                            count={filteredHospitals.length}
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
                  <Typography variant="h5">No Hospitals</Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ActivatedProviders hospitals={activatedHospital} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <NonActivatedProviders hospitals={deactivatedHospital} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <BlockedHospitals hospitals={blockedHospital} />
          </TabPanel>
        </>
      )}
    </div>
  );
};

export default AllProviders;
