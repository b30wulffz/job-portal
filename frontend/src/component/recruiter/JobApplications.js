import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Avatar,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../App";

import apiList, { server } from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper
        style={{
          padding: "50px",
          outline: "none",
          minWidth: "50%",
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Application Status
            </Grid>
            <Grid
              container
              item
              xs={9}
              justify="space-around"
              // alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rejected"
                      checked={searchOptions.status.rejected}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          status: {
                            ...searchOptions.status,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Rejected"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="applied"
                      checked={searchOptions.status.applied}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          status: {
                            ...searchOptions.status,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Applied"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="shortlisted"
                      checked={searchOptions.status.shortlisted}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          status: {
                            ...searchOptions.status,
                            [event.target.name]: event.target.checked,
                          },
                        });
                      }}
                    />
                  }
                  label="Shortlisted"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Sort
            </Grid>
            <Grid item container direction="row" xs={9}>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="name"
                    checked={searchOptions.sort["jobApplicant.name"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.name": {
                            ...searchOptions.sort["jobApplicant.name"],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="name"
                  />
                </Grid>
                <Grid item>
                  <label for="name">
                    <Typography>Name</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort["jobApplicant.name"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.name": {
                            ...searchOptions.sort["jobApplicant.name"],
                            desc: !searchOptions.sort["jobApplicant.name"].desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort["jobApplicant.name"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="dateOfApplication"
                    checked={searchOptions.sort.dateOfApplication.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfApplication: {
                            ...searchOptions.sort.dateOfApplication,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="dateOfApplication"
                  />
                </Grid>
                <Grid item>
                  <label for="dateOfApplication">
                    <Typography>Date of Application</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.dateOfApplication.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          dateOfApplication: {
                            ...searchOptions.sort.dateOfApplication,
                            desc: !searchOptions.sort.dateOfApplication.desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort.dateOfApplication.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
              >
                <Grid item>
                  <Checkbox
                    name="rating"
                    checked={searchOptions.sort["jobApplicant.rating"].status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.rating": {
                            ...searchOptions.sort[["jobApplicant.rating"]],
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                  />
                </Grid>
                <Grid item>
                  <label for="rating">
                    <Typography>Rating</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort["jobApplicant.rating"].status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          "jobApplicant.rating": {
                            ...searchOptions.sort["jobApplicant.rating"],
                            desc: !searchOptions.sort["jobApplicant.rating"]
                              .desc,
                          },
                        },
                      });
                    }}
                  >
                    {searchOptions.sort["jobApplicant.rating"].desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px" }}
              onClick={() => getData()}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);

  const appliedOn = new Date(application.dateOfApplication);

  const handleClose = () => {
    setOpen(false);
  };

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const getResume = () => {
    if (
      application.jobApplicant.resume &&
      application.jobApplicant.resume !== ""
    ) {
      const address = `${server}${application.jobApplicant.resume}`;
      console.log(address);
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          console.log(error);
          setPopup({
            open: true,
            severity: "error",
            message: "Error",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume found",
      });
    }
  };

  const updateStatus = (status) => {
    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  const buttonSet = {
    applied: (
      <>
        <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("shortlisted")}
          >
            Shortlist
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </Button>
        </Grid>
      </>
    ),
    shortlisted: (
      <>
        <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("accepted")}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </Button>
        </Grid>
      </>
    ),
    rejected: (
      <>
        <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
          >
            Rejected
          </Paper>
        </Grid>
      </>
    ),
    accepted: (
      <>
        <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
          >
            Accepted
          </Paper>
        </Grid>
      </>
    ),
    cancelled: (
      <>
        <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["cancelled"],
              color: "#ffffff",
            }}
          >
            Cancelled
          </Paper>
        </Grid>
      </>
    ),
    finished: (
      <>
        <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
            }}
          >
            Finished
          </Paper>
        </Grid>
      </>
    ),
  };

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={`${server}${application.jobApplicant.profile}`}
            className={classes.avatar}
          />
        </Grid>
        <Grid container item xs={7} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">
              {application.jobApplicant.name}
            </Typography>
          </Grid>
          <Grid item>
            <Rating
              value={
                application.jobApplicant.rating !== -1
                  ? application.jobApplicant.rating
                  : null
              }
              readOnly
            />
          </Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
          <Grid item>
            Education:{" "}
            {application.jobApplicant.education
              .map((edu) => {
                return `${edu.institutionName} (${edu.startYear}-${
                  edu.endYear ? edu.endYear : "Ongoing"
                })`;
              })
              .join(", ")}
          </Grid>
          <Grid item>
            SOP: {application.sop !== "" ? application.sop : "Not Submitted"}
          </Grid>
          <Grid item>
            {application.jobApplicant.skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={3}>
          <Grid item>
            <Button
              variant="contained"
              className={classes.statusBlock}
              color="primary"
              onClick={() => getResume()}
            >
              Download Resume
            </Button>
          </Grid>
          <Grid item container xs>
            {buttonSet[application.status]}
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            // onClick={() => changeRating()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const JobApplications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [];

    if (searchOptions.status.rejected) {
      searchParams = [...searchParams, `status=rejected`];
    }
    if (searchOptions.status.applied) {
      searchParams = [...searchParams, `status=applied`];
    }
    if (searchOptions.status.shortlisted) {
      searchParams = [...searchParams, `status=shortlisted`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    console.log(queryString);
    let address = `${apiList.applicants}?jobId=${jobId}`;
    if (queryString !== "") {
      address = `${address}&${queryString}`;
    }

    console.log(address);

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        // console.log(err.response.data);
        setApplications([]);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Applications</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setFilterOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          item
          xs
          direction="column"
          style={{ width: "100%" }}
          alignItems="stretch"
          justify="center"
        >
          {applications.length > 0 ? (
            applications.map((obj) => (
              <Grid item>
                {/* {console.log(obj)} */}
                <ApplicationTile application={obj} getData={getData} />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No Applications Found
            </Typography>
          )}
        </Grid>
      </Grid>
      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </>
  );
};

export default JobApplications;
