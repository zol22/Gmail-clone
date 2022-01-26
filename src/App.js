import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, logout, selectUser } from './features/userSlice';
import Login from './Login';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function App() {

  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen)
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  /* Persistence login page (when refresh)*/
  useEffect(()=> {
    onAuthStateChanged(auth, (userAuth) => {
      if( userAuth) {
        dispatch(login({
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoUrl: userAuth.photoURL,
        }))
      } else {
        dispatch(logout())
      }

    })

  }, [])
  return (
    <Router>

    {!user ? (
      <Login />
    ): (
      <div className="app">
        <Header />
        <div className="app_body">
           <Sidebar />

           <Routes>
             <Route path="/mail" element={<Mail />} />
             <Route path="/" element={<EmailList />}/>
           </Routes>
        </div>
        {sendMessageIsOpen && <SendMail />}
      </div>
    )}
    </Router>
  );
}

export default App;
