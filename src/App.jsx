import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
// class component
import { useDispatch } from 'react-redux';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { auth } from './firebase';
import { setUser } from './components/redux/actions';
import PrivateRouter from './components/PrivateRouter';
// import { logoutInit, loginInit, registerInit} from './components/redux/actions';


function App() {

  const token = localStorage.getItem('myCat');
  const dispatch = useDispatch();
  React.useEffect(() => {
  
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else dispatch(setUser(null));
    })
  }, [dispatch])

  return (
    <>
      <BrowserRouter>
        
          <Routes>
            <Route path="/" element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            } />
            <Route path='/login' element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>
        
      </BrowserRouter>,
    </>
  );
}
export default App;