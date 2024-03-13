import './App.css';
import Dashboard from './modules/Dashboard';
import Form from './modules/Form/index';
import {  Navigate, Route, Routes, redirect } from 'react-router-dom';

function App() {

  const ProtectedRoute = ({children, auth=false})=>{
    const isLoggedIn = localStorage.getItem('user:token')!==null || false
    if(!isLoggedIn && auth) {
      return <Navigate to= {'/users/sign_in'}/>
    }
    else if(isLoggedIn && ['/users/sign_in', '/users/sign_up'].includes(window.location.pathname)){
      return <Navigate to = {'/'}/>
    } 
    return children;
  }
 

  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute auth = {true}>
          <Dashboard/>
        </ProtectedRoute>
      }></Route>
      <Route path='/users/sign_in' element={
        <ProtectedRoute>
          <Form isSignPage={true}/>
        </ProtectedRoute>
      }></Route>
      <Route path='/users/sign_up' element={
        <ProtectedRoute>
          <Form isSignPage={false}/>
        </ProtectedRoute>
      }></Route>
    </Routes>
  );
}

export default App;
