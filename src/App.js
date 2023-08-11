import React from "react"
import AppRouter from "./router/AppRouter";
import store, { persistor } from "./app/store";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import { PersistGate } from "redux-persist/integration/react";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { lime, purple } from "@mui/material/colors";

function App() {

  //?istedigin rengi tanimlamak icin;
  // const theme = createTheme({
  //   palette: {
  //     primary: lime,
  //     secondary: purple,
  //   },
  // });
  return (
    <>
  {/* <ThemeProvider theme={theme}> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
  {/* </ThemeProvider> */}

  <ToastContainer/>
    </>
  );
}

export default App;
   //! bu sayfayi tamamen redux-persist sitesinden getiriyoruz.neyi sarmallamak istiyorsak onu yaziyoruz araya */
   //!App.js de de Redux Provider ile butun sayfalarimizi yani AppRouter i sarmalladikki store daki herseye ulasablsn sayfalar.
   //!verilerimizin her refresh de kaybolmamasi,localde kalici hale  gelmesi icin persist redux yukleyip sitesinden yapiyi alip duzenlyrz


   //? renk icin mui den palette den bir theme create edebiliriz App.js de.ve nerde kullanacaksan orda once cagir const{theme}=useTheme() diye ve importunu yap