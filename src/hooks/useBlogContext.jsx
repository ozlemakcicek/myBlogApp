import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFail, fetchStart, getCategorySuccess, getCommentSuccess, getDetSuccess, getNewBlogSuccess, getSuccess, getUserSuccess, postLikeSuccess} from '../features/blogSlice'
import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';
import useAxios from './useAxios';
import { useNavigate } from 'react-router-dom';



const useBlogContext = () => {

    const {token}=useSelector((state)=>state.auth)
    const BASE_URL = process.env.REACT_APP_BASE_URL; 
    const {axiosWithToken}=useAxios()
    const { axiosWithPublic } = useAxios();
    const dispatch =useDispatch() 
    const navigate=useNavigate()


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
       dispatch(getSuccess({ data, url }));
     
       
        console.log(data);
   
    
      dispatch(getSuccess({data,url})) 
    } catch (error) {
        console.log(error);
        dispatch(fetchFail())
        navigate("/notfound");
        
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

 const putBlogData = async (formValues, idNo) => {
   dispatch(fetchStart);

   try {
     await axiosWithToken.put(`api/blogs/${idNo}/`, formValues);
     getBlogData(idNo);
     toastSuccessNotify(`successfuly updated!`);
   } catch (error) {
     toastErrorNotify(`not successfuly updated!`);
     dispatch(fetchFail());
   }
 };



const postNewBlog=async(values)=>{
  dispatch(fetchStart())
  console.log(values);
  try {
   const {data}= await axiosWithToken.post(`api/blogs/`, values )
   dispatch(getNewBlogSuccess(data))
  

  } catch (error) {
    dispatch(fetchFail())
    
  }
}

const postLike=async(idl)=>{
  console.log(token);
  dispatch(fetchStart())
  try {
     
  await axiosWithToken.post(`api/likes/${idl}/`, null,)

  dispatch(postLikeSuccess())

  } catch (error) {
    console.log(error);
    dispatch(fetchFail())
    
  }
}



const postComment=async(comm, idd)=>{
    dispatch(fetchStart())
    try {
         await axiosWithToken.post(`api/comments/${idd}/`, comm)
         getComment(idd)
         toastSuccessNotify(`successfuly performed!`);
        
    } catch (error) {
      
      console.log(error);
      dispatch(fetchFail())
      toastErrorNotify(`not successfuly performed!`);
      
    }
 
  }

  const getComment=async(idd)=>{
    dispatch(fetchStart())
    try {
      const {data}=  await axios.get(`${BASE_URL}api/comments/${idd}/`) 
    dispatch(getCommentSuccess(data))
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
      
    }
  }

  const getCategoryData = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.get(`${BASE_URL}api/categories/`);  // API da yaninda - varsa data donuyor demek.ve bu donen datayi yayinlamak icin bir reducera ihtiyac var
      dispatch(getCategorySuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };


  const getDetailData=async(id)=>{
    dispatch(fetchStart())
    try {
      
     const {data}= await axiosWithToken.get(`api/blogs/${id}/`)
     dispatch(getDetSuccess(data))
    } catch (error) {
      dispatch(fetchFail())
    }
  }

   const getUserData = async (authorId) => {
     dispatch(fetchStart());
     try {
       const { data } = await axiosWithToken.get(
         `api/blogs/?author=${authorId}`
       );
       console.log(data);
       dispatch(getUserSuccess(data));
     } catch (error) {
       console.log(error);
       dispatch(fetchFail);
     }
   };





 
 return {
   getBlogData,
   deleteBlogData,
   postNewBlog,
   postLike,
   postComment,
   getComment,
   getDetailData,
   getCategoryData,
   putBlogData,
   getUserData
 }; 
}





export default useBlogContext