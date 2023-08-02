import {  Grid } from "@mui/material";



import { useSelector } from "react-redux";
import useBlogContext from "../hooks/useBlogContext";
import { useEffect } from "react";
import BlogCard from "../components/blog/BlogCard";


const Dashboard = () => {
  const { getBlogData } = useBlogContext();
  

  useEffect(() => {
    getBlogData("blogs");
  }, []);

const { blogs } = useSelector(state => state.blog);
  console.log(blogs);
  return (
    <>
      <Grid container>
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
