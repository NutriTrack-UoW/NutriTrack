import React, { useState, FormEvent} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, VStack, Input, Button, Heading, Select, FormControl, FormLabel } from "@chakra-ui/react";


const ProfileSetup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | string>('');
  const [gender, setGender] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [height, setHeight] = useState<number | string>('');
  const [weight, setWeight] = useState<number | string>('');
  const navigate = useNavigate();



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const data = { name, age, gender, activityLevel, height, weight };
      console.log('Sending data:', data);
      await axios.post('http://localhost:7000/profile/setup', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl id="activityLevel" isRequired>
            <FormLabel>Activity Level</FormLabel>
            <Select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
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
  );
};

export default ProfileSetup;