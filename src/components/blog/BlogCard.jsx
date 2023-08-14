
  import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toastWarnNotify } from '../../helper/ToastNotify';
import useBlogContext from '../../hooks/useBlogContext';





const BlogCard=({blog})=> {
  const {currentUser}=useSelector(state=>state.auth)

  const{postLike}=useBlogContext()



  const [currentDate, setCurrentDate] = useState(""); // Boş bir tarih durumu oluşturun
  useEffect(() => {
    // Bileşen yüklendiğinde güncel tarihi al
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []); // Boş dizi, sadece bileşen yüklendiğinde çalışır


const navigate=useNavigate()

const handleClickRM=(id)=>{
  if(!currentUser){
    navigate('/login')
    toastWarnNotify('Sie müssen anmelden!')
  }else{
    navigate(`blog/detail/${id}`)
  }
}


const [isClicked,setClicked]=useState(false)

const handleClickLike=()=>{
  postLike(blog?.id);
 (!currentUser? navigate('/login'): setClicked(!isClicked))
}


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="130"
        image={blog.image}
        alt="image"
        sx={{ objectFit: "content" }}
      />
      <CardHeader title={blog.title} align="center" />

      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {blog.content}
        </Typography>
        <Typography sx={{ paddingTop: 2 }}>{currentDate}</Typography>
        <Grid sx={{ display: "flex", gap: 2, marginTop: "2rem" }}>
          <AccountCircleIcon sx={{ color: "grey" }} />
          {currentUser ? <span>{currentUser}</span> : <span>admin</span>}
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          color={isClicked ? "error" : "default"}
          onClick={handleClickLike}
        >
          <FavoriteIcon />
          <Typography variant="h4">{blog?.likes}</Typography>
        </IconButton>

        <IconButton aria-label="share">
          <ChatBubbleIcon />
          <Typography variant="h4">{blog?.comment_count}</Typography>
        </IconButton>

        <IconButton aria-label="share">
          <VisibilityIcon />
          <Typography variant="h4">{blog?.post_views}</Typography>
        </IconButton>
        <Button
          sx={{
            width: "18rem",
            height: "4vh",
            // marginLeft: "3rem",
            color: "white",
            bgcolor: "grey",
            "&:hover": {
              bgcolor: "lightgrey",
              color: "grey",
            },
            marginLeft: "5rem",
          }}
          onClick={() => handleClickRM(blog.id)}
        >
          READ MORE
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;

  
