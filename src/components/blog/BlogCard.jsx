
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





const BlogCard=({blog})=> {
  const {currentUser}=useSelector(state=>state.auth)
  const [currentDate, setCurrentDate] = useState(""); // Boş bir tarih durumu oluşturun

  useEffect(() => {
    // Bileşen yüklendiğinde güncel tarihi al
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
  }, []); // Boş dizi, sadece bileşen yüklendiğinde çalışır

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="130"
        image={blog.image}
        alt="image"
        sx={{objectFit:"content"}}
      />
      <CardHeader title={blog.title} align="center" />

      <CardContent >
        <Typography variant="body2" color="text.secondary" sx={{overflow:"hidden",
        textOverflow:"ellipsis",
        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
          {blog.content}
        </Typography>
        <Typography sx={{paddingTop:2}}>{currentDate}</Typography>
<Grid sx={{display:"flex",gap:2,marginTop:"2rem"}}>
<AccountCircleIcon sx={{color:"grey"}}/>
<span>admin</span>
</Grid>
        
      
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ChatBubbleIcon />
        </IconButton>
        <IconButton aria-label="share">
          <VisibilityIcon />
        </IconButton>
        <Button
          sx={{
            width: "7rem",
            height: "4vh",
            color:"white",
            bgcolor: "grey",
            "&:hover": {
              bgcolor: "lightgrey",
              color:"grey"
            },
            marginLeft:"5rem"
          }}
        >
          READ MORE
        </Button>
      </CardActions>
    </Card>
  );
}

export default BlogCard;

  
