import { BrowserRouter} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import MainNavBar from './pages/MainNavBar';
import AdminNavBar from './admin/AdminNavBar';
import ManagerNavBar from './manager/ManagerNavBar';
import CustomerNavBar from './customer/CustomerNavBar';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    // Check sessionStorage for user role
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';
    const managerStatus = sessionStorage.getItem('isManager') === 'true';
    const customerStatus = sessionStorage.getItem('isCustomer') === 'true';

    setIsAdmin(adminStatus);
    setIsManager(managerStatus);
    setIsCustomer(customerStatus);
  }, []);

  return (
     <BrowserRouter>
         {isAdmin && <AdminNavBar/>}
         {isManager && <ManagerNavBar/>}
         {isCustomer && <CustomerNavBar/>}
         {!isAdmin && !isManager && !isCustomer && <MainNavBar/>}
     </BrowserRouter>
  );
}

export default App;
