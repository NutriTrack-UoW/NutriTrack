import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, VStack, Text, Heading } from "@chakra-ui/react";

interface Profile {
  height: number;
  weight: number;
  age: number;
  activityLevel: string;
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

  const dailyCalories = calculateCalories(profile.weight, profile.height, profile.age, profile.activityLevel);
  const dailyProtein = calculateProtein(profile.weight);

  return (
    <Container>
      <VStack gap={4} align="center">
        <Heading>Dashboard</Heading>
        <Text>Height: {profile.height}</Text>
        <Text>Weight: {profile.weight}</Text>
        <Text>Age: {profile.age}</Text>
        <Text>Activity Level: {profile.activityLevel}</Text>
        <Text>Daily Calorie Intake: {dailyCalories.toFixed(2)} kcal</Text>
        <Text>Daily Protein Intake: {dailyProtein.toFixed(2)} grams</Text>
        {/* <Text>Activity Level: {profile.activityLevel}</Text> */}
      </VStack>
    </Container>
  );
};

const calculateCalories = (weight: number, height: number, age: number, activityLevel: string): number => {
  // Mifflin-St Jeor Equation
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5; // for men
  // const bmr = 10 * weight + 6.25 * height - 5 * age - 161; // for women

  let activityMultiplier = 1.2; // Sedentary (little or no exercise)
  if (activityLevel === 'light') activityMultiplier = 1.375; // Lightly active (light exercise/sports 1-3 days/week)
  else if (activityLevel === 'moderate') activityMultiplier = 1.55; // Moderately active (moderate exercise/sports 3-5 days/week)
  else if (activityLevel === 'active') activityMultiplier = 1.725; // Very active (hard exercise/sports 6-7 days a week)
  else if (activityLevel === 'very active') activityMultiplier = 1.9; // Super active (very hard exercise/sports & physical job or 2x training)

  return bmr * activityMultiplier;
};

const calculateProtein = (weight: number): number => {
  return weight * 1.6; // General guideline: 1.6 grams of protein per kilogram of body weight
};

export default Dashboard;