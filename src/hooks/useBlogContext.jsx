import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFail, fetchStart, getSuccess} from '../features/blogSlice'
import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';
import useAxios from './useAxios';



const useBlogContext = () => {

    const {token}=useSelector((state)=>state.auth)
    const BASE_URL = process.env.REACT_APP_BASE_URL; 
    const {axiosWithToken}=useAxios()
    const { axiosWithPublic } = useAxios();
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


 //?dinamik olarak yaziyoruz birden fazla yerde kullanilacaksa.endpointi de dinamik yaziyoruz ve o zaman async icinde bir parametre alacak.bu endpoint ile ayni olur.headers kullanmadik burda cunku tokena gerek olmada(yani login olmaya gerek kalmadan) acilir acilmaz veriler gozuksun diyorz.bir veri donuyor const {data} diye belirtiyorz

const  getBlogData=async(url)=>{
    dispatch(fetchStart())

    try {
      const {data}= await axios.get(`${BASE_URL}api/${url}/`)
       
        console.log(data);
   
    
      dispatch(getSuccess({data,url})) 
    } catch (error) {
        console.log(error);
        dispatch(fetchFail())
        
    }
   
}

// DELETE islemi; APi ye gore url in sonunda bir id no var.ekliyoruz bunu url in sonuna.backend birde id den sonra / istemis.postmande headers da token bilgisini istedi yani login olunca silme yetkisi lazim ve  delete yaptiktan sonra gordukki bize donen bir veri yok.sadece 204 no content status kodu geliyor.o yuzden const {data} ya gerek yok.backendden sildikten sonra frontend den de silsin diye tekrar bir get islemi yapiyoruz.yoksa ancak refresch yapinca silindigi belli olurdu.bu sekilde hemen ekrandan da gidecek.bunun icin getBlogData yi cagiracagiz

const deleteBlogData = async (url,id) => {
  dispatch(fetchStart());

  try {
    //  await axios.get(`${BASE_URL}api/${url}/${id}/`, {
    //     headers:{Authorization:`Token ${token}`}
    //  });
    await axiosWithToken.delete(`api/${url}/${id}/`, {
    
     });

    getBlogData(url);
    toastSuccessNotify(`${url} successfuly deleted!`);
  } catch (error) {
    console.log(error);
    dispatch(fetchFail());
    toastErrorNotify(`${url} not successfuly deleted!`)
  }
};









return{getBlogData,deleteBlogData}
}

export default useBlogContext