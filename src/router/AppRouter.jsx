import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRouter from "./PrivateRouter";
import Detail from "../pages/Detail";
import MyBlog from "../pages/MyBlog";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import NavBars from "../components/NavBars";
import Footers from "../components/Footers";

const AppRouter = () => {
  return (
    <BrowserRouter>
    <NavBars/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="notfound" element={<NotFound />} />

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />

        <Route path="profile" element={<Profile />} />

        <Route path="myBlog" element={<MyBlog />} />
        {/* NESTED ROOT YAPISI.privateRouter da kurdugumuz yapiya gora curreentUser varsa PrivateRouter devreye girer */}
        {/* login olduktan sonra artik url in sonuna PrivateRouter path ine verdigimiz blog eklenecek.login olduktan sonra ise kontrolden gecince PrivateRouterin Outletine(childina .kim o ?asagidaki yapiya gore Dashboard olacak ama currentuser ile gelinebilinen Dashboard bu) yonlendiriir,currenUser yoksa baslkangic sayfasina gir dedik Privaterouter da.evet icinde Navbar Footer in oldugu kapsayici yapi Dashboard, karsilama alani(bu index olarak yazilir path yerine) ve diger currentUsera bagli alanlari yaziyoruz*/}

        <Route path="blog" element={<PrivateRouter />}>
         
            
            <Route path="detail/:id" element={<Detail />} />
            <Route path="newblog" element={<NewBlog />} />
         
        </Route>

      </Routes>
      <Footers/>
    </BrowserRouter>
  );
};

export default AppRouter;
