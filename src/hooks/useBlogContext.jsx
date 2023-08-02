import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFail, fetchStart, getSuccess} from '../features/blogSlice'
import axios from "axios"


const useBlogContext = () => {

    const {token}=useSelector((state)=>state.auth)
    const BASE_URL = process.env.REACT_APP_BASE_URL; 
    const dispatch =useDispatch() 


// const  getBlogData=async()=>{
//     dispatch(fetchStart())

//     try {
//       const {data}= await axios.get(`${BASE_URL}api/blogs/`)

//       console.log(data); 
//       const url="blogs"
//       dispatch(getSuccess({data,url}))  //data:data, url:"blogs" demek
//     } catch (error) {
//         console.log(error);
//         dispatch(fetchFail())
        
//     }
   
// }


 //?dinamik olarak yaziyoruz birden fazla yerde kullanilacaksa.endpointi de dinamik yaziyoruz ve o zaman async icinde bir parametre alacak.bu endpoint ile ayni olur

const  getBlogData=async(url)=>{
    dispatch(fetchStart())

    try {
      const {data}= await axios.get(`${BASE_URL}api/${url}/`)
   
    
      dispatch(getSuccess({data,url})) 
    } catch (error) {
        console.log(error);
        dispatch(fetchFail())
        
    }
   
}










return{getBlogData}
}

export default useBlogContext