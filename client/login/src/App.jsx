import { Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import DasgBoard from "./pages/DashBoard";
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Navbar />{" "}
      {/*Nav Bar not wrapper inside Routes because it needs to display in every page */}
      <Toaster position="bottom-right" toastOptions={{ durarion: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DasgBoard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
