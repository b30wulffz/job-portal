import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editDetails = () => {
    setOpen(true);
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
          <Typography variant="h2">Profile</Typography>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          xs
          spacing={2}
        >
          <Grid item container justify="center">
            <Grid item xs={2}>
              Name:{" "}
            </Grid>
            <Grid item>Something</Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                editDetails();
              }}
            >
              Edit Details
            </Button>
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
          {/* <Grid container>
            <Grid item>
              <TextField
                label="Name"
                value={signupDetails.name}
                onChange={(event) => handleInput("name", event.target.value)}
                className={classes.inputBox}
                error={inputErrorHandler.name.error}
                helperText={inputErrorHandler.name.message}
                onBlur={(event) => {
                  if (event.target.value === "") {
                    handleInputError("name", true, "Name is required");
                  } else {
                    handleInputError("name", false, "");
                  }
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <PasswordInput
                label="Password"
                value={signupDetails.password}
                onChange={(event) =>
                  handleInput("password", event.target.value)
                }
                className={classes.inputBox}
                error={inputErrorHandler.password.error}
                helperText={inputErrorHandler.password.message}
                onBlur={(event) => {
                  if (event.target.value === "") {
                    handleInputError("password", true, "Password is required");
                  } else {
                    handleInputError("password", false, "");
                  }
                }}
              />
            </Grid>
            <MultifieldInput
              education={education}
              setEducation={setEducation}
            />
            <Grid item>
              <ChipInput
                className={classes.inputBox}
                label="Skills"
                variant="outlined"
                helperText="Press enter to add skills"
                onChange={(chips) =>
                  setSignupDetails({ ...signupDetails, skills: chips })
                }
              />
            </Grid>
            <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Resume (.pdf)"
                icon={<DescriptionIcon />}
                // value={files.resume}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     resume: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadResume}
                handleInput={handleInput}
                identifier={"resume"}
              />
            </Grid>
            <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Profile Photo (.jpg/.png)"
                icon={<FaceIcon />}
                // value={files.profileImage}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     profileImage: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadProfileImage}
                handleInput={handleInput}
                identifier={"profile"}
              />
            </Grid>
          </Grid> */}
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
    </>
  );
};

export default Profile;
