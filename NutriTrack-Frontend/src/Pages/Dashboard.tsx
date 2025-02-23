import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, VStack, Heading, Text, Box } from "@chakra-ui/react";

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:7000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data.userProfile);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <VStack gap={4} align="center">
        <Heading>Dashboard</Heading>
        <Box>
          <Text><strong>Name:</strong> {profile.name}</Text>
          <Text><strong>Age:</strong> {profile.age}</Text>
          <Text><strong>Gender:</strong> {profile.gender}</Text>
          <Text><strong>Activity Level:</strong> {profile.activityLevel}</Text>
          <Text><strong>Height:</strong> {profile.height} cm</Text>
          <Text><strong>Weight:</strong> {profile.weight} kg</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;