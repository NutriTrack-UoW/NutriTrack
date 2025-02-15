import axios from 'axios';
import { Container, VStack, Button, Input, Text } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  profileCompleted: boolean;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:7000/login', { email, password });
      console.log("Login successful", response.data);
      localStorage.setItem('token', response.data.token);
      if (response.data.profileCompleted) {
        navigate("/dashboard");
      } else {
        navigate("/profile-setup");
      }

    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <Container>
      <VStack gap={4} align="center">
        <Text fontSize="4xl" className="main-heading">
          Login
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
        <Button colorScheme="teal" size="lg" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default Login;