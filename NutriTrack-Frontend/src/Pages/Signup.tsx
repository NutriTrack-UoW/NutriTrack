import axios from 'axios';
import { Container, VStack, Button, Input, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      console.log("Signup successful", response.data);
    } catch (error) {
      console.error("Error during signup", error);
    }
  };

  return (
    <Container>
      <VStack gap={4} align="center">
        <Text fontSize="4xl" className="main-heading">
          Signup
        </Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" onClick={handleSignup}>
          Signup
        </Button>
      </VStack>
    </Container>
  );
};

export default Signup;