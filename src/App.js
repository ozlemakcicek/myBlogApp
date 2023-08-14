import React from "react";
import AppRouter from "./router/AppRouter";
import store,{persistor} from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";


import { PersistGate } from "redux-persist/integration/react";

function App() {
 
  
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>

      <ToastContainer />
    </>
  );
}

export default App;
