import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, VStack, Text, Heading } from "@chakra-ui/react";

interface Profile {
  height: number;
  weight: number;
  age: number;
  //activityLevel: string;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Profile>('http://localhost:7000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
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
        <Text>Height: {profile.height}</Text>
        <Text>Weight: {profile.weight}</Text>
        <Text>Age: {profile.age}</Text>
        {/* <Text>Activity Level: {profile.activityLevel}</Text> */}
      </VStack>
    </Container>
  );
};

export default Dashboard;