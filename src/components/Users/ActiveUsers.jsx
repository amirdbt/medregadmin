import React, { useState } from "react";
import {
  Typography,
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
  CircularProgress,
  IconButton,
  useTheme,
  Grid,
  Chip,
  Snackbar,
  Button,
  Slide,
} from "@material-ui/core";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";

import axios from "axios";
import SearchBox from "../Utility/SearchBox";

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: "#1a237e",
  },
  text: {
    color: "#fff",
  },
}));
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.0),
  },
}));

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

const ActiveUsers = ({ users }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //   const [users, setusers] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [al, setAl] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");

  const deactivateUser = (userName) => {
    axios
      .patch(
        `https://polar-dusk-61658.herokuapp.com/admin/deactivate/user/${userName}`,
        "",
        { headers: { Authorization: `${token}` } }
      )
      .then((res) => {
        console.log(res.data);
        setMessage("User Deactivated Successfully");
        setAl(true);
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setMessage("User  Deactivation Failed");
        setAl(true);
        setSeverity("error");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const searchChange = (e) => {
    setSearchField(e.target.value);
  };
  const filteredUsers = users.length
    ? users.filter((user) => {
        return user.lastName.toLowerCase().includes(searchField.toLowerCase());
      })
    : "";
  return (
    <div>
      <SearchBox searchChange={searchChange} place="Search By Last Name..." />
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
      {/* <div style={{ marginBottom: "10px" }}></div> */}
      <Grid container>
        {filteredUsers.length ? (
          <Grid item xs={12} sm={12}>
            <TableContainer component={Paper} elevation={0}>
              <Table aria-label="customized table">
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell className={classes.text}>First Name</TableCell>
                    <TableCell className={classes.text}>Last Name</TableCell>
                    <TableCell className={classes.text}>User Name</TableCell>
                    <TableCell className={classes.text}>Gender</TableCell>
                    <TableCell className={classes.text}>Nationality</TableCell>
                    <TableCell className={classes.text}>State</TableCell>

                    <TableCell className={classes.text}>Status</TableCell>
                    <TableCell className={classes.text}>Actions</TableCell>
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
                        {user.stateOfOrigin ? user.stateOfOrigin : "Not set"}
                      </TableCell>
                      <TableCell>
                        {user.deactivate === false && (
                          <Chip label="Active" style={{ color: "#2e7d32" }} />
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to Deactivate this User?"
                              )
                            )
                              deactivateUser(user.userName);
                          }}
                        >
                          Deactivate
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
    </div>
  );
};

export default ActiveUsers;
