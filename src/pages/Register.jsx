import { Avatar, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import myImage from "../assets/20943790.jpg";
import LockIcon from "@mui/icons-material/Lock";
import RegisterForm, { RegisterSchema } from "../components/auth/RegisterForm";

import { Formik } from "formik";

import { Link } from "react-router-dom";

import useAuthContext from "../hooks/useAuthContext";

const Register = () => {
  const { register } = useAuthContext();

  return (
    <>
      {/* <Typography
        variant="h2"
        color="primary"
        align="center"
        sx={{ marginBottom: 1, marginTop: 4 }}
      >
        BLOG APP
      </Typography> */}
      {/* <Grid
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      > */}

      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          direction="row-reverse"
          rowSpacing={{ sm: 3 }}
          sx={{ height: "85vh", paddingTop: "1rem" }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Avatar
              sx={{
                backgroundColor: "primary.dark",
                m: "auto",
                width: 40,
                height: 40,
                marginTop: 2,
                marginBottom: 4,
              }}
            >
              <LockIcon size="30" />
            </Avatar>
            <Typography
              variant="h3"
              color="primary"
              align="center"
              sx={{ marginBottom: 4 }}
            >
              Register
            </Typography>
            <Formik
              initialValues={{
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                //   image: "",
                bio: "",
                password: "",
                password2: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values, actions) => {
                // same shape as initial values

                register({ ...values, password2: values.password });
                console.log(values);
                actions.resetForm(); //submit islemi yapincaform u resetler
              }}
              component={(props) => <RegisterForm {...props} />}
            ></Formik>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Link to="/login">Haben Sie einen Account?</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Container>
            
              <img
                src={myImage}
                alt="" // eslint-disable-next-line
                style={{
                  width: "600px",
                }}
                
              />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Register;
