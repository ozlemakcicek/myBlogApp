import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";


const useAuthContext = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // .env dosyasinda url i sifreledik.ve URL i kullandigimiz alan olan bu custom hook da asagidaki sekilde cagirdik.token bilgisini de authSlice dan getiriyoruz.sonra burdan da axios instance kullanarak tasiyacagiz.
  const {token} = useSelector(state=>state.auth)
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const {axiosWithToken}=useAxios()




  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}users/register/`, userInfo);
      console.log(data);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Anmeldung durchgeführt");
      navigate("/login");
    } catch (error) {
      dispatch(fetchFail());
    
      toastErrorNotify("Anmeldung nicht durchgeführt"); 
       console.log(error);
    }
  };





  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/auth/login/`,
        userInfo
      );
      console.log(data);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Anmeldung durchgeführt");
      navigate("/");
    } catch (error) { 
      toastErrorNotify("Anmeldung nicht durchgeführt")
      console.log(error);
      dispatch(fetchFail());
     
    }
  };

// logout yaparken postmande headers altinda Authorization ve token giriyoruz buraya da ekleyecegiz.onun disinda hicbir body ye gerek yok.o nedenle async icine birsey yazmiyoruz bize dondurecegi bir payload yok yani
  const logout=async()=>{
    dispatch(fetchStart())
    try {
      await axios.post(`${BASE_URL}users/auth/logout/`, null, {
        headers:{
          Authorization:`Token ${token}`
        }
      });
      
      dispatch(logoutSuccess())
      toastSuccessNotify("Abmeldung durchgeführt");
      navigate("/")
    } catch (error) {
      console.log(error);
      dispatch(fetchFail())
      toastErrorNotify("Die Abmeldung ist nicht möglich");
    }
    
  }







  return { register, login, logout };
};

export default useAuthContext;
