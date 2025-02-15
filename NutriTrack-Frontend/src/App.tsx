import './App.css'
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Sections/Navbar";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
//import ProfileSetup from './Pages/ProfileSetup';
import ProfileSetup from './Pages/ProfileSetup.tsx'; // Import ProfileSetup component
import Dashboard from './Pages/Dashboard';

function App() {

  return (
    <>
      <Box minH={"100vh"}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
			</Routes>
		</Box>
    </>
    
  )
}

export default App

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Route, Routes } from "react-router-dom";
// import HomePage from './Pages/HomePage';
// import './App.css';
// import { Box } from "@chakra-ui/react";

// //import Login from './Pages/Login';
// //import Signup from './Pages/Signup';
// //import ProfileSetup from './Pages/ProfileSetup';

// const App = () => {
//   return (
//   <Box minH={"100vh"}>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         {/* <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} /> */}
//         {/* <Route path="/profile-setup" element={<ProfileSetup />} /> */}
//       </Routes>
//   </Box>

//   );
// };

// export default App;
