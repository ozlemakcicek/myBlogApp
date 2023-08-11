import {  Grid } from "@mui/material";



import { useSelector } from "react-redux";
import useBlogContext from "../hooks/useBlogContext";
import { useEffect } from "react";
import BlogCard from "../components/blog/BlogCard";
import NewBlog from "./NewBlog";


const Dashboard = () => {
  const { getBlogData } = useBlogContext();
  

  useEffect(() => {
    getBlogData("blogs");
  }, []);

const { blogs } = useSelector(state => state.blog);
  console.log(blogs);
  return (
    <>
      <Grid container sx={{display:"flex",justifyContent:"center",alignItems:"center", gap:4, mt:6}}>
        {blogs?.map((blog) => (
          <Grid item key={blog.id}>
         <BlogCard blog={blog}/>
          </Grid>
        ))}
      </Grid>

      
    </>
  );
};

export default Dashboard;
