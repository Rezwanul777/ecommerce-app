import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Register from "./pages/auth/Register";
import Login from './pages/auth/Login';
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="" element={<Dashboard/>}/>
      </Route>
      
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/policy" element={<Policy/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    
    </>
  );
}

export default App;
