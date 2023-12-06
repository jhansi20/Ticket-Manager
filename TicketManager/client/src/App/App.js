import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Ticket/Dashboard';
import Login from '../components/Login/Login';
import TicketDetails from '../components/Ticket/TicketDetails';
import SignUp from '../components/SignUp/signup';
function App() {
  // const [userid, setUserId] = useState('');
  // let userid 
  // userid= sessionStorage.getItem('userid');
  //   if (!userid) {
      return (
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ticket/" element={<TicketDetails />} />
      </Routes>
      )
}

export default App;


