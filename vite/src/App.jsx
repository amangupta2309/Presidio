import React from 'react';
import Nav from './components/nav';
import LandingPage from './pages/landing';
import Login from './pages/loginPage'
import { Routes, Route, useNavigate, redirect, Navigate } from 'react-router-dom';
import SalesPage from './pages/salePage';
import Profile from './pages/profile';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App() {
  
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log(isAuth);
  return (
    <div className="App">
      <Nav />
      <div className='min-h-screen pt-16 pb-5 bg-red-100'>
        <Routes>
            <Route path='/' element= {<LandingPage />} exact />
            <Route path='/login' element={isAuth ? <Navigate to="/"/> : <Login />} exact/>
            <Route path='/profile' element={ isAuth ? <Profile /> : <Navigate to="/login" />} exact />
            {/* <Route path='/createform/:formId' element = {isAuth ? <CreateForm /> : <Navigate to="/login" />} /> */}
            <Route path='/sell' element={isAuth ? <SalesPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
