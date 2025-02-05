import logo from './logo.svg';
import './App.css';


import Home from './components/layouts/Home/Home';
import { Route, Routes, useParams } from 'react-router-dom';
import Login from './screens/Auth/Login';
// Toastify imports
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './screens/Auth/Register';
import CustomerProfile from './screens/Customer/CustomerProfile';

import ViewCustomerTransactions from './screens/Customer/CustomerTransactions';

import AddBank from './screens/Admin/AddBank';
import AddBankManager from './screens/Admin/AddBankManager';
import AddCustomer from './screens/BankManager/AddCustomer';
import AddNewAdmin from './screens/Admin/AddNewAdmin';
import ViewBankManagers from './screens/Admin/ViewBankManagers';
import ViewAllBankAccounts from './screens/BankManager/ViewAllBankAccounts';
import ViewAllBankCustomers from './screens/BankManager/ViewAllBankCustomer';

import ViewBankAccount from './screens/Customer/ViewBankAccount';

import ViewAllBanks from './screens/Admin/ViewAllBanks';
import MoneyTransfer from './screens/Customer/MoneyTransfer';
import About from './screens/About/About';
import Contact from './screens/Contact/Contact'; 
import AddBankAccountForm from './screens/BankManager/AddBankAccountForm';
import ViewSpecificAccountDetails from './screens/Customer/ViewSpecificAccountDetails';
import ManageBankAccount from './screens/BankManager/ManageBankAccount';


//similar for view Statements requires a wrapper
const ViewBankAccountWrapper = () => {
  const { accountId } = useParams();
  return <ViewBankAccount accountId={accountId} />;
};

const CustomerProfileWrapper=()=>{
  const { customerId } = useParams();
  return <CustomerProfile customerId={customerId} />;
};

const ManageAccountWrapper = ()=>{
  const { accountId } = useParams();
  return <ManageBankAccount accountId={accountId} />;
}
//test commit
function App() {
  return(
    <>
    
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
           <Route path='/about' element={<About/>}/> 
           <Route path='/contact' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/customerProfile/:customerId' element={<CustomerProfileWrapper />}/>

          <Route path="/transactions/:customerId" element={<ViewCustomerTransactions/>}/>
          

          <Route path='/AddBank' element={<AddBank/>}/>
          <Route path='/AddBankManager' element={<AddBankManager/>}/>
          <Route path='/AddCustomer' element={<AddCustomer/>}/>
          <Route path='/AddNewAdmin' element={<AddNewAdmin/>}/>
          <Route path='/ViewManagers' element={<ViewBankManagers/>}/>

          <Route path='/ViewAllBankAccounts' element={<ViewAllBankAccounts/>}/>

          <Route path='/ViewAllBankCustomers' element={<ViewAllBankCustomers/>}/>
          

          <Route path='/customer/bank/account/detail/:accountId' element={<ViewBankAccountWrapper/>}/>

          <Route path='/customerProfile/:customerId' element={<CustomerProfile/>}/>
          <Route path='/ViewSpecificAccountDetails/:customerId/:accountId' element={<ViewSpecificAccountDetails/>}/>

          <Route path='/ViewAllBanks' element={<ViewAllBanks/>}/>
          <Route path='/MoneyTransfer' element={<MoneyTransfer/>}/>
          <Route path='/AddBankAccount' element={<AddBankAccountForm/>}/>
          <Route path="/ManageBankAccount/:accountId" element={<ManageAccountWrapper />} />
        </Routes>
    

       {/* toast container */}
       <ToastContainer 
       position="top-center"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      transition={Bounce}
       />
    </>
  );
}

export default App;
