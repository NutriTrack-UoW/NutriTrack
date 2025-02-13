// import React, { useState } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';

// const ProfileSetup = () => {
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [age, setAge] = useState('');
//   const [activityLevel, setActivityLevel] = useState('');
//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put('/api/profile', { height, weight, age, activityLevel }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       history.push('/dashboard');
//     } catch (error) {
//       console.error('Error updating profile', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Height:</label>
//         <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
//       </div>
//       <div>
//         <label>Weight:</label>
//         <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
//       </div>
//       <div>
//         <label>Age:</label>
//         <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
//       </div>
//       <div>
//         <label>Activity Level:</label>
//         <input type="text" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} required />
//       </div>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default ProfileSetup;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, VStack, Input, Button, FormControl, FormLabel, Heading } from "@chakra-ui/react";

const ProfileSetup = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:7000/profile', { height, weight, age, activityLevel }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  return (
    <Container>
      <VStack spacing={4} align="center">
        <Heading>Profile Setup</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="height" isRequired>
            <FormLabel>Height</FormLabel>
            <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          </FormControl>
          <FormControl id="weight" isRequired>
            <FormLabel>Weight</FormLabel>
            <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </FormControl>
          <FormControl id="activityLevel" isRequired>
            <FormLabel>Activity Level</FormLabel>
            <Input type="text" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} />
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