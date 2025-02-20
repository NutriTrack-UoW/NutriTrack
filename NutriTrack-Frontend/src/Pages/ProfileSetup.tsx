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






import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, VStack, Input, Button, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";


// const ProfileSetup = () => {
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [age, setAge] = useState('');
//   const [activityLevel, setActivityLevel] = useState('');
//   const navigate = useNavigate();

const ProfileSetup: React.FC = () => {
  const [height, setHeight] = useState<number | string>('');
  const [weight, setWeight] = useState<number | string>('');
  const [age, setAge] = useState<number | string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('token');
  //     const data = { height, weight, age};
  //     console.log('Sending data:', data);
  //     await axios.put('http://localhost:7000/profile-setup', { height, weight, age,}, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error('Error updating profile', error);
  //   }
  // };
      try {
      const token = localStorage.getItem('token');
      const data = { height, weight, age};
      console.log('Sending data:', data);
      await axios.put('http://localhost:7000/profile-setup', data, {
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
          <FormControl id="height" isRequired>
            <FormLabel>Height</FormLabel>
            <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          </FormControl>
          <FormControl id="weight" isRequired>
            <FormLabel>Weight</FormLabel>
            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
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