import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from './components/Home/HomePage';
import PublicNavbar from './components/Navbar/PublicNavbar';
import LoginForm from './components/Users/Login';
import RegistrationForm from './components/Users/Register';
import PrivateNavbar from './components/Navbar/PrivateNavbar';
import { useSelector } from 'react-redux';
import AddCategory from './components/Category/AddCategory';
import CategoriesList from './components/Category/CategoryList';
import UpdateCategory from './components/Category/UpdateCategory';
import TransactionForm from './components/Transactions/TransactionForm';
import Dashboard from './components/Users/Dashboard';
import UserProfile from './components/Users/UserProfile';

const App = () => {
  const user = useSelector((state)=> state?.auth?.user)


  return (
    <BrowserRouter>
      {/* Show only one navbar based on token */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-category" element={<AddCategory/>} />
        <Route path="/categories" element={<CategoriesList/>} />
        <Route path="/update-category/:id" element={<UpdateCategory/>} />
        <Route path="/add-transaction" element={<TransactionForm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
