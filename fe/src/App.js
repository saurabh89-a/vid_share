import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login  from "./pages/login/Login";
import Register  from "./pages/register/Register";
import Main from "./Main";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Video from "./pages/Video/Video";




function App() {
  return(
  <BrowserRouter>
  <ToastContainer />
    <Routes>
        <Route exact path="*" element={<Main/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="signup" element={<Register/>}></Route>
        {/* <Route path="/video/:id" element={<Video/>}></Route> */}

      </Routes>
  </BrowserRouter>
  );
}





export default App;
