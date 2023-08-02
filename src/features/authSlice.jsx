//!dispatch leri yayinladigimiz sayfa.yine redux-toolkit sayfasindan yapiyi aliyoruz.name istedihin seyi ver.initialState olarak ise authentication da ne lazimsa bize ve ne olmasi lazimsa ilk etapta onlari yaziyoruz.reducer kismina ise kendi reducerlarimizi yazip sonra dispatch ile bunlari yayinlayacagiz ilgili yerlerde.reducerlarin icerisini ise initialState leri state den cagirarak dolduruyoruz

import { createSlice } from "@reduxjs/toolkit";

//* sayffayi refresch yapinca daschboard da sayfayi asagidaki initiallvalue lara donusturuyor.ve state bilgimiz bosaliyor ve tekrar ana sayfaya atiyor bizi.bu istemedigimiz bisey.bunun cozumu redux da ozel bir paket.redux persist.boylece verilerimiz arka planda tutulur sifirlanmaz refresch yapinca.google dan sitesinden bakablrsn
const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    currentUserId: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
    image: null,

    id: 0,
    email: null,
    bio: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerSuccess:(state, {payload})=>{
      state.loading = false;
      state.currentUser=payload?.username
      state.error = false;
      state.token=payload?.token;
      state.currentUserId=payload?.id

    },

    loginSuccess:(state, {payload})=>{
       state.loading = false;
       state.error = false;
       state.currentUser = payload?.user?.username;
       state.isAdmin=payload?.user?.is_superuser;   
       state.token = payload?.key;
       state.currentUserId = payload?.user?.id;
    },
    logoutSuccess:(state )=>{
      state.loading=false;
      state.error=false;
      state.currentUser=null;
      state.token=null
      
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
