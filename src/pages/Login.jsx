import { Avatar, Box,  Container, Grid,  Typography } from '@mui/material';
import React from 'react'
import myImage2 from "../assets/20944201.jpg"
import {  Formik } from 'formik';
import LockIcon from "@mui/icons-material/Lock";

import useAuthContext from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import LoginForm, { LoginSchema } from '../components/auth/LoginForm';




const Login = () => {
  const {login}=useAuthContext()
  return (
    
    
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          direction="row-reverse"
          rowSpacing={{ sm: 3 }}
          sx={{ height: "85vh", paddingTop: "1rem",  }}
        >
          <Grid item xs={12} sm={10} md={6}>
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
              Anmeldung
            </Typography>
            <Formik
              initialValues={{
                email: "",

                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, actions) => {
                // same shape as initial values
                console.log(values);
                login(values);
                actions.resetForm(); //submit islemi yapincaform u resetler
              }}
              component={(props) => <LoginForm {...props} />}
            ></Formik>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/register">Sie haben kein Konto?</Link>
            </Box>
            <Grid item xs={2} sm={10} md={6}>
            <Container>  
             <img
                src={myImage2}
                alt='myImage'
                style={{
                  width: "500px",
                  
                  // paddingTop: "1rem",
                  // paddingLeft: "12rem",
                }}
                xs={2}
              /></Container>
           
            </Grid>
          </Grid>
        </Grid>
      </Container>
 
  );  
}

export default Login