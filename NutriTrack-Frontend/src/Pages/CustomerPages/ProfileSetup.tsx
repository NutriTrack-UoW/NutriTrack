import React, { useState, useContext, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, VStack, Input, Button, Heading, Select, FormControl, FormLabel } from "@chakra-ui/react";
//import '../style.css';
import {Sidenav} from "../../Components/Sections";
import { UserContext } from "../../contexts/UserContext"; 

const ProfileSetup: React.FC = () => {
  const location = useLocation();
  const profile = location.state?.profile || {};
  const [name, setName] = useState<string>(profile.name || '');
  const [age, setAge] = useState<number | string>(profile.age || '');
  const [gender, setGender] = useState<string>(profile.gender || '');
  const [activityLevel, setActivityLevel] = useState<string>(profile.activityLevel || '');
  const [height, setHeight] = useState<number | string>(profile.height || '');
  const [weight, setWeight] = useState<number | string>(profile.weight || '');
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || ""; // Ensure it's always a string
      const data = { name, age, gender, activityLevel, height, weight };

      console.log('Sending data:', data);
      const response = await axios.post('/api/user/profile/setup', data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Profile setup response:', response.data);

      // Extract updated user profile from response
      const { userProfile } = response.data;

      // Retrieve old user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");

      const updatedUser = {
        userid: storedUser.userid || userProfile.user, // Keep existing user ID
        token,
        name: userProfile.name, // Update name
        profileCompleted: userProfile.profileCompleted, // Ensure profileCompleted is updated
        userType: storedUser.userType, // Keep existing userType (fallback to "user")
        verified: storedUser.verified, // Keep existing verified status
        tokenExpiry: storedUser.tokenExpiry, // Maintain the same token expiry
      };

      // Update localStorage
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

      // Update React Context only if userContext exists
      if (userContext && userContext.setLoggedUser) {
        userContext.setLoggedUser(updatedUser);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error('Error updating profile', error);
      navigate('/dashboard');
    }
  };

  return (
    <Sidenav>
    <Container>
      <VStack gap={4} align="center">
        <Heading>Profile Setup</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel>Age (years)</FormLabel>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </FormControl>
          <FormControl id="gender" isRequired>
            <FormLabel>Gender</FormLabel>
            <Select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value=""></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl id="activityLevel" isRequired>
            <FormLabel>Activity Level</FormLabel>
            <Select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
              <option value=""></option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="very active">Very Active</option>
            </Select>
          </FormControl>
          <FormControl id="height" isRequired>
            <FormLabel>Height (cm)</FormLabel>
            <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          </FormControl>
          <FormControl id="weight" isRequired>
            <FormLabel>Weight (kg)</FormLabel>
            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" mt={4}>
            Save
          </Button>
        </form>
      </VStack>
    </Container>
    </Sidenav>
  );
};

export default ProfileSetup;