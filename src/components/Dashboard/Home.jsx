import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import CountUp from "react-countup";

const Home = () => {
  const token = localStorage.getItem("token");
  const [records, setRecords] = useState("");
  const [totalusers, setTotalUsers] = useState("");
  const [hospitals, setHospitals] = useState("");

  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = () => {
    setLoading(true);
    axios
      .get(`https://polar-dusk-61658.herokuapp.com/admin/info`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setRecords(res.data.records);
        setTotalUsers(res.data.totalUsers);
        setHospitals(res.data.providers.length);
        setUsers(res.data.users);
        setProviders(res.data.providers);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
      });
  };
  let nonActiveUsers = users.filter((user) => user.deactivate === false);
  let aUsers = users.filter((user) => user.deactivate === true);
  let activeProviders = providers.filter(
    (provider) => provider.activated === true
  );
  let nonactiveProviders = providers.filter(
    (provider) => provider.activated === false
  );
  return (
    <div className="content">
      {loading ? (
        <CircularProgress style={{ marginLeft: "50%" }} />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Card elevation={0}>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography> Total Records</Typography>
                  <Typography variant="h4">
                    {
                      <CountUp
                        start={0}
                        end={records}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Users </Typography>
                  <Typography variant="h4">
                    {
                      <CountUp
                        start={0}
                        end={totalusers}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Active Users</Typography>
                  <Typography variant="h4" style={{ color: "#2e7d32" }}>
                    {
                      <CountUp
                        start={0}
                        end={aUsers.length}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Non-Active Users</Typography>
                  <Typography variant="h4" style={{ color: "#c62828" }}>
                    {
                      <CountUp
                        start={0}
                        end={nonActiveUsers.length}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Hospitals</Typography>
                  <Typography variant="h4">
                    {
                      <CountUp
                        start={0}
                        end={hospitals}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Active Hospitals</Typography>
                  <Typography variant="h4" style={{ color: "#2e7d32" }}>
                    {
                      <CountUp
                        start={0}
                        end={activeProviders.length}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={0}>
                <CardContent>
                  <Typography>Total Non-Active Hospitals</Typography>
                  <Typography variant="h4" style={{ color: "#c62828" }}>
                    {
                      <CountUp
                        start={0}
                        end={nonactiveProviders.length}
                        duration={2.5}
                        separator=","
                      />
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Home;
