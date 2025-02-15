// import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
// import { Link } from "react-router-dom";

import Hero from "../Components/Sections/Hero";
import HomeLayout from "../Components/Layouts/HomeLayout"; 


// const HomePage = () => {
	
// 	return (
// 		<div className="main-heading">
//         Welcome to NutriTrack!
//       </div>

// 	);
// };  
// export default HomePage;

import { Container, SimpleGrid, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container>
      <VStack gap={4} align="center">
        <Text fontSize="4xl" className="main-heading">
          Welcome to NutriTrack!
        </Text>
        <SimpleGrid columns={2} gap={10}>
          <Link to="/signup">
            <Button colorScheme="teal" size="lg">
              Signup
            </Button>
          </Link>
          <Link to="/login">
            <Button colorScheme="teal" size="lg">
              Login
            </Button>
          </Link>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;