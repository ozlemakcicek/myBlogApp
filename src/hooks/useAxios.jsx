import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';

const useAxios = () => {
  const {token}=useSelector(state=>state.auth)

  //Token gerektiren islemler icin;
 const axiosWithToken = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   //  timeout: 1000,
   headers: { Authorization: `Token ${token}` },
 });

 //token olmadan yapilacak islemler icin
 const axiosWithPublic = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
 });
 return(axiosWithToken,axiosWithPublic)
}

export default useAxios
