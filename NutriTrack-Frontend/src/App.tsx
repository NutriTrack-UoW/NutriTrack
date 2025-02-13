// import './App.css'
// import { Route, Routes } from "react-router-dom";
// import { Box } from "@chakra-ui/react";

// import HomePage from "./Pages/HomePage";
// import Navbar from "./Components/Sections/Navbar";

// function App() {

//   return (
//     <>
//       <Box minH={"100vh"}>
// 			<Navbar />
// 			<Routes>
// 				<Route path='/' element={<HomePage />} />
// 			</Routes>
// 		</Box>
//     </>
    
//   )
// }

// export default App

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import './App.css';
//import { Box } from "@chakra-ui/react";

//import Login from './Pages/Login';
//import Signup from './Pages/Signup';
//import ProfileSetup from './Pages/ProfileSetup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/profile-setup" element={<ProfileSetup />} /> */}
      </Routes>
    </Router>

  );
};

export default App;
