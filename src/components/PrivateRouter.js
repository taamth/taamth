import React, { Component } from 'react'; 
import { Navigate } from 'react-router-dom';
import { useSelector} from 'react-redux';


/* children se hien thi neu currentUser ton tai, err lay dc loi  */

const PrivateRouter = ({ children, ...rest  }) => {
    const { currentUser, err } = useSelector(state => state.user)
    console.log("$$currentUser", currentUser);
    return currentUser ? children : <Navigate to = "/login" />;
}


export default PrivateRouter;
