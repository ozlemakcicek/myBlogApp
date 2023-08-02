import { Grid } from '@mui/material'
import React from 'react'
  // import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MyLogo from "../assets/ÖZLEM (3).gif"
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { useSelector } from 'react-redux';
import { toastWarnNotify } from '../helper/ToastNotify';
import MyFoto from "../assets/OIF.jpg"
import AdbIcon from "@mui/icons-material/Adb";





const pages = [
  { title: "Dashboard", 
    path: "/" },

  { title: "About", 
    path: "/about" },

  { title: "New Blog", 
    path: "/blog/new blog" },
];
const settings = [
  {title:"Profile",
   path:"/profile"},

  { title:"My Blog",
    path:"/my blog"},

    {title:"Logout",
     path:"/"}
];

const current=[
  {title:"Register",
path:"/register"},

{title:"Login",
path:"/login"}
]






const NavBars = () => {
   const { logout } = useAuthContext();
   const {currentUser}=useSelector((state)=>state.auth)
   const { image } = useSelector((state) => state.auth);
   const navigate = useNavigate();


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
 

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };   
    
    const handleClickSettings = (e) => {
    if(e.title==="Logout"){
      logout()
    }else{
      navigate(e.path)
    }
      handleCloseNavMenu();
      handleCloseUserMenu();
    };

const handleClickPages=(pages)=>{
  if(!currentUser && pages.title==="New Blog"){
    navigate(pages.path);
    toastWarnNotify("Du musst eingeloggt sein!")
  }else{
    handleCloseNavMenu();
    navigate(pages.path)
  }
}


  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" sx={{ bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ color: "black" }}>
            <Box
              // component="a"
              href="/"
              sx={{ display: { xs: "flex" }, mr: 1 }}
            >
              <img
                src={MyLogo}
                alt='myLogo'
                style={{
                  width: "120px",
                

                  // borderRadius:"50%",
                  paddingRight: "20px",
                }}
                onClick={() => navigate("/")}
              />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              BLOG APP
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{ color: "black" }}
                  >
                    <Typography
                      textAlign="center"
                      onClick={() => handleClickPages(page)}
                    >
                      {page.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* <img
              src={MyFoto}
              alt=""
            
              style={{
                width:"130px",
                height:"12vh",}}
            />  */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
            {/* kucuk ekranlarda */}
              BLOG APP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.title}
                  // onClick={handleCloseNavMenu}
                  onClick={() => handleClickPages(page)}
                  sx={{ my: 2, color: "black", display: "block",fontWeight:"600" }}
                  
                >
                  {page.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={currentUser ? MyFoto : image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {currentUser
                  ? settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography
                          textAlign="center"
                          onClick={() => handleClickSettings(setting)}
                        >
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    ))
                  : current.map((current) => (
                      <MenuItem
                        key={current.title}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography
                          textAlign="center"
                          onClick={() => navigate(current.path)}
                        >
                          {current.title}
                        </Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        
        </Container>
      </AppBar>
    </Box>
  );

  
}

export default NavBars