//!authSlice dan kopyaladik ve auth isimlerini blog yapip, initialState leri api deki endpointlere gore ayni isimle yazdik.Authentication reducerlarini silip burda lazim olanlari yaziyoruz.ve sonra store a bildiriyoruz.en altta reducer ini export yapmis zaten store da da blogReduceri import ediyoruz

import { createSlice } from "@reduxjs/toolkit";

// initialState leri Api deki endpoint isimleri ile ayni verdik ve bos array yaptik baslangic degerlerini

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    loading: false,
    error: false,
    comments:[],
    likes:[],
    categories:[],
    blogs:[]
    
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
   //  her bir api yapisi icin tek tek reducer yazmak yerine tek bir reducer ile isi halledeblrz.veri getirmek icin getSuccess reduceri yaziyoruz.initialState ler bir obje o.i. objelerde key ler 2 yolla cagrilir.1- . notation 2- [] notation. FAKAT burda string olarak gelecek veriler ve . notation olmaz(state."likes" diye bir yazim yok cunku) .o nedenle [ ]icinde yazacagiz.su url den gelen veriyi data ya esitle diyoruz.ve bunu store a bildirelim
  getSuccess:(state,{payload})=>{
    state.loading=false;
    state[payload.url]=payload.data;
   },


    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getSuccess,
  fetchFail,
} = blogSlice.actions;
export default blogSlice.reducer; // burasi karsilarken blogReducer oluyor
