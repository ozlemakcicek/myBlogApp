import React from 'react'
import * as Yup from "yup";
import { Form } from "formik";
import {
  Box,
  Button,
  TextField,

} from "@mui/material";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("erforderlich"),
  password: Yup.string()
    
    .required("erforderlich"),
});
//callback deki degerleri ...props ile buraya gondermistik burda da karsiladik
const LoginForm = ({values,handleBlur,handleChange,touched,errors}) => {
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          // defaultValue="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email && errors.email}
          error={touched.email && Boolean(errors.email)}
          required
        />

        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          // defaultValue="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
          required
        />

        <Button type="submit" variant="contained" size="large">
         Anmeldung
        </Button>
      </Box>
    </Form>
  );
}

export default LoginForm