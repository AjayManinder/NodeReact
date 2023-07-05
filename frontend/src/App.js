import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Header from './header/header';
import Contact_Us from './pages/contactUs';
import Admin from './pages/Admin';
import Footer from './footer/footer';
function App() {
  return (
   <>
     <Header/>
     <Routes>
      
        <Route exact path="/" element=<Home /> />
        <Route path="/about" element=<About/> />
        <Route path="/contactUs" element=<Contact_Us/> />
        <Route path="/admin" element=<Admin/> />

 
    </Routes>
    <Footer/>
    </>
   
  );
}

export default App;
