//! Formik degilde manuel state ler ile yapalim bu sayfayi

// import React, { useEffect } from "react";
// import { Form, Formik } from "formik";

// import { object, string, ref } from "yup";

// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";

// import {
//   Button,
//   Card,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import { useSelector } from "react-redux";

// import useBlogContext from "../hooks/useBlogContext";
// import { toastSuccessNotify } from "../helper/ToastNotify";
// import { useLocation, useNavigate } from "react-router-dom";
// import MyBlog from "./MyBlog";
// import MyBlogCard from "../components/blog/MyBlogCard";

// export const newBlogSchema = object().shape({
//   title: string()
//     .min(1, "Too Short!")
//     .max(150, "Too Long!")
//     .required("Title is required"),

//   image: string().max(400, "Too Long!").required("Image URL is required"),

//   content: string()
//     .matches(/\d+/, "content bir sayı içermelidir") //regex.\d(decimal)+ ile sayi icermesini belrtyrz.- ile istemediklerimizi belirtirz
//     .matches(/[a-z]/, "content bir küçük harf içermelidir")
//     .matches(/[A-Z]/, "content bir büyük harf içermelidir")
//     .matches(/[!,?{}><%&$#£+-.]+/, "content bir özel karakter içermelidir")
//     .required("Content is required"),
// });

// const NewBlog = () => {
//   const { postNewBlog, getBlogData } = useBlogContext();
//   const navigate = useNavigate();

//   const { categories } = useSelector((state) => state.blog);

//   useEffect(() => {
//     getBlogData("categories");
//   }, []);
//   console.log(categories);

//   return (
//     <Container maxWidth="lg">
//       <Grid
//         container
//         justifyContent="center"
//         direction="row-reverse"
//         sx={{
//           p: 2,
//           m: 1,
//         }}
//       >
//         <Grid item xs={10} sm={8} md={6} lg={4}>
//           <Card
//             sx={{
//               width: 400,
//               height: 580,

//               marginBottom: "8rem",
//               boxShadow: "4px 4px 8px rgba(0, 0, 0, 50)",
//             }}
//           >
//             <Grid item xs={10} sm={10} md={6} lg={10}>
//               <Formik
//                 initialValues={{
//                   title: "",
//                   content: "",
//                   image: "",
//                   category: "",
//                   status: "",
//                   slug: "",
//                 }}
//                 validationSchema={newBlogSchema}
//                 onSubmit={(values, actions) => {
//                   console.log(values);
//                   postNewBlog(values);
//                   actions.resetForm(); // submit bitince resetle
//                   toastSuccessNotify("Succesfuly created");
//                   navigate("/");
//                 }}
//               >
//                 {({
//                   values,
//                   errors,
//                   touched,
//                   handleChange,
//                   handleBlur,
//                   handleSubmit,
//                   setFieldValue,
//                 }) => (
//                   <Form>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: "column",

//                         gap: 2,
//                         marginTop: "3rem",
//                         color: "orange",
//                         marginLeft: "3rem",
//                       }}
//                     >
//                       <Typography
//                         sx={{ fontFamily: "fantasy", align: "left" }}
//                         variant="h5"
//                       >
//                         New Blog
//                       </Typography>

//                       <TextField
//                         id="title"
//                         label="Title"
//                         name="title" // name e gore yaziyorz bunlari
//                         type="text"
//                         color="warning"
//                         variant="outlined"
//                         value={values.title}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         helperText={touched.title && errors.title}
//                         error={touched.title && Boolean(errors.title)}
//                         required
//                       />

//                       <TextField
//                         id="image"
//                         label="Image URL"
//                         name="image"
//                         type="img"
//                         color="warning"
//                         value={values.image}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         helperText={touched.image && errors.image}
//                         error={touched.image && Boolean(errors.image)}
//                         required
//                       />

//                       <Box sx={{ minWidth: 120 }}>
//                         <FormControl fullWidth>
//                           <InputLabel
//                             id="demo-simple-select-label"
//                             required
//                             color="warning"
//                           >
//                             Category
//                           </InputLabel>

//                           <Select
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             name="category"
//                             value={values.category}
//                             label="Category"
//                             onBlur={handleBlur}
//                             color="warning"
//                             onChange={(e) => {
//                               setFieldValue("category", e.target.value);
//                             }}
//                           >
//                             {categories?.map((category) => (
//                               <MenuItem value={category.id}>
//                                 {category.name}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                         </FormControl>
//                       </Box>

//                       <Box sx={{ minWidth: 120 }}>
//                         <FormControl fullWidth>
//                           <InputLabel
//                             id="demo-simple-select-label"
//                             required
//                             color="warning"
//                           >
//                             Status
//                           </InputLabel>

//                           <Select
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             name="status"
//                             value={values.status}
//                             label="Status"
//                             color="warning"
//                             onChange={(e) => {
//                               setFieldValue("status", e.target.value);
//                             }}
//                             onBlur={handleBlur}
//                             required
//                           >
//                             <MenuItem>Please choose...</MenuItem>

//                             <MenuItem value="d">Draft</MenuItem>

//                             <MenuItem value="p">Published</MenuItem>
//                           </Select>
//                         </FormControl>
//                       </Box>

//                       <TextField
//                         id="content"
//                         label="Content"
//                         name="content"
//                         type="content"
//                         variant="outlined"
//                         value={values.content}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         helperText={touched.content && errors.content}
//                         error={touched.content && Boolean(errors.content)}
//                         required
//                         color="warning"
//                         multiline
//                         rows={2}
//                       />

//                       <Button
//                         variant="contained"
//                         type="submit"
//                         sx={{
//                           bgcolor: "orange",
//                           color: "black",
//                           fontWeight: "600",
//                           ":hover": { bgcolor: "orange" },
//                         }}
//                       >
//                         New Blog
//                       </Button>
//                     </Box>
//                   </Form>
//                 )}
//               </Formik>
//               <Box sx={{ textAlign: "center", mt: 2 }}></Box>
//             </Grid>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
// export default NewBlog;

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Form } from "formik";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewBlog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const[info,setInfo]=React.useState({
    title:"",
    content:"",
    image:"",
    category:"",
    status:"",
    slug:""
  })

  const handleChange=(e)=>{
    console.log(e.target);
    console.log(e.target.name);  //neye yaziyorsak onun adi yazsin(contente yaziyorsak content gelir.backende gonderirken tiklananin adi lazim )
    console.log(e.target.value); // ne yaziyorsan o dgere value dur

    setInfo({...info, [e.target.name]: e.target.value})
    //butun infoyu al sonra key:value ekliyoruz.infonun icinde bu key varsa guncelleyecek, yoksa yeni olusturacak.inputun degerleri hep string o.i.[] icine yazdik
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginLeft: "3rem",
            }}
            required
          >
            <TextField
              id="title"
              name="title"
              type="text"
              label="Title"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              id="content"
              name="content"
              type="text"
              label="Content"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              id="image"
              name="image"
              type="text"
              label="Image"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              id="category"
              name="category"
              type="text"
              label="Category"
              variant="outlined"
              onChange={handleChange}
              required
            />
            <TextField
              id="status"
              name="status"
              type="text"
              label="Status"
              variant="outlined"
              onChange={handleChange}
              required
            />

            <Button>NEW BLOG</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
