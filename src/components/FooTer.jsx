import React from "react";
import Box from "@mui/material/Box";

import { Typography, Container } from "@mui/material";


const FooTer = () => {
  return (
    <Container
      maxWidth="xlg"
      sx={{
        mt: 3,
        textAlign: "center",
        width: "100%",
        //position: "absolute",
        bottom: 0,
        height: "50px",
      }}
    >
      <Box sx={{ height: "50px" }}></Box>
      <Box
        sx={{
         display:"flex",
         justifyContent:"center",
         alignItems:"center",
          // textAlign: "center",
          p:2,
          //minHeight:"5px",
           backgroundColor: "lightgrey",
          
        }}
      >
        
        <Typography
          variant="body2"
          component='h2'
          style={{
         
           
           
            textAlign: "center",
            width: "100%",
            height:'100%'
             
          }}
        >
          Copyright © Developed By Özlem {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
};

export default FooTer;
