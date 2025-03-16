// import React, { useEffect, useState } from 'react';
// import { Container, VStack, Heading, Box, Stat, StatLabel, StatNumber, StatGroup, Button, Spinner} from "@chakra-ui/react";
// import {Sidenav} from "../../Components/Sections";
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from "../../utils/axiosInstance";
// //import '../style.css';

     
// const Dashboard: React.FC = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axiosInstance.get('/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(response.data.userProfile);
//       } catch (error) {
//         console.error('Error fetching profile', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!profile) {
//     return <Spinner
//       thickness='4px'
//       speed='0.65s'
//       emptyColor='gray.200'
//       color='blue.500'
//       size='xl'
//     />;
//   }

//   // Calculate BMR using the Harris-Benedict equation
//   const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
//     if (gender === 'male') {
//       return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
//     } else {
//       return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
//     }
//   };

//   // Adjust BMR based on activity level to get TDEE
//   const calculateTDEE = (bmr: number, activityLevel: string) => {
//     switch (activityLevel) {
//       case 'light':
//         return bmr * 1.375;
//       case 'moderate':
//         return bmr * 1.55;
//       case 'active':
//         return bmr * 1.725;
//       case 'very active':
//         return bmr * 1.9;
//       default:
//         return bmr;
//     }
//   };

//   // Estimate daily protein needs (grams per kilogram of body weight)
//   const calculateProteinNeeds = (weight: number) => {
//     return weight * 1.6; // 1.6 grams of protein per kilogram of body weight
//   };

//   // Calculate BMI
//   const calculateBMI = (weight: number, height: number) => {
//     const heightInMeters = height / 100; // Convert height to meters
//     return weight / (heightInMeters * heightInMeters);
//   };

//   const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
//   const tdee = calculateTDEE(bmr, profile.activityLevel);
//   const proteinNeeds = calculateProteinNeeds(profile.weight);
//   const bmi = calculateBMI(profile.weight, profile.height);


  

  

//   return (
//     <Sidenav> 
//     <Container maxW="container.lg" py={6}>
//       <VStack gap={4} align="center">
//         <Heading color="var(--dark-green)">Dashboard</Heading>
//         <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="var(--soft-white)" width="100%">
//           <StatGroup>
//             <Stat>
//               <StatLabel>Name</StatLabel>
//               <StatNumber>{profile.name}</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Age</StatLabel>
//               <StatNumber>{profile.age}</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Gender</StatLabel>
//               <StatNumber>{profile.gender}</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Activity Level</StatLabel>
//               <StatNumber>{profile.activityLevel}</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Height</StatLabel>
//               <StatNumber>{profile.height} cm</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Weight</StatLabel>
//               <StatNumber>{profile.weight} kg</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Daily Calorie Needs</StatLabel>
//               <StatNumber>{Math.round(tdee)} kcal</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel>Daily Protein Needs</StatLabel>
//               <StatNumber>{Math.round(proteinNeeds)} g</StatNumber>
//             </Stat>
//             <Stat>
//                 <StatLabel>BMI</StatLabel>
//                 <StatNumber>{bmi.toFixed(2)}</StatNumber>
//               </Stat>
//           </StatGroup>
//           <Button
//             mt={4}
//             colorScheme="green"
//             onClick={() => navigate('/profile-setup', { state: { profile } })}
//           >
//             Edit Profile
//           </Button>
//         </Box>
//       </VStack>
//     </Container>
//     </Sidenav>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { 
//   Container, VStack, Heading, Box, Stat, StatLabel, StatNumber, 
//   StatGroup, Button, Spinner, Progress, Text, HStack, IconButton
// } from "@chakra-ui/react";
// import { AddIcon, MinusIcon } from "@chakra-ui/icons";
// import { Sidenav } from "../../Components/Sections";
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from "../../utils/axiosInstance";

// const Dashboard: React.FC = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [waterIntake, setWaterIntake] = useState(0); // Number of glasses
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axiosInstance.get('/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(response.data.userProfile);
//       } catch (error) {
//         console.error('Error fetching profile', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!profile) {
//     return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />;
//   }

//   // Calculate BMR using the Harris-Benedict equation
//   const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
//     return gender === 'male'
//       ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
//       : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
//   };

//   // Adjust BMR based on activity level to get TDEE
//   const calculateTDEE = (bmr: number, activityLevel: 'light' | 'moderate' | 'active' | 'very active') => {
//     const factors = { light: 1.375, moderate: 1.55, active: 1.725, "very active": 1.9 };
//     return bmr * factors[activityLevel];
//   };

//   // Estimate daily protein needs
//   const calculateProteinNeeds = (weight: number) => weight * 1.6;

//   // Calculate BMI
//   const calculateBMI = (weight: number, height: number) => {
//     const heightInMeters = height / 100;
//     return weight / (heightInMeters * heightInMeters);
//   };

//   // Calculate recommended daily water intake (35mL to 40mL per kg)
//   const calculateWaterIntake = (weight: number) => weight * 37.5; // mL

//   const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
//   const tdee = calculateTDEE(bmr, profile.activityLevel);
//   const proteinNeeds = calculateProteinNeeds(profile.weight);
//   const bmi = calculateBMI(profile.weight, profile.height);
//   const dailyWaterGoal = calculateWaterIntake(profile.weight); // in mL
//   const waterConsumed = waterIntake * 250; // Glasses (1 glass = 250mL)
//   const waterPercentage = Math.min((waterConsumed / dailyWaterGoal) * 100, 100); // Cap at 100%

//   return (
//     <Sidenav>
//       <Container maxW="container.lg" py={6}>
//         <VStack gap={4} align="center">
//           <Heading color="var(--dark-green)">Dashboard</Heading>
//           <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="var(--soft-white)" width="100%">
//             <StatGroup>
//               <Stat><StatLabel>Name</StatLabel><StatNumber>{profile.name}</StatNumber></Stat>
//               <Stat><StatLabel>Age</StatLabel><StatNumber>{profile.age}</StatNumber></Stat>
//               <Stat><StatLabel>Gender</StatLabel><StatNumber>{profile.gender}</StatNumber></Stat>
//               <Stat><StatLabel>Activity Level</StatLabel><StatNumber>{profile.activityLevel}</StatNumber></Stat>
//               <Stat><StatLabel>Height</StatLabel><StatNumber>{profile.height} cm</StatNumber></Stat>
//               <Stat><StatLabel>Weight</StatLabel><StatNumber>{profile.weight} kg</StatNumber></Stat>
//               <Stat><StatLabel>Daily Calorie Needs</StatLabel><StatNumber>{Math.round(tdee)} kcal</StatNumber></Stat>
//               <Stat><StatLabel>Daily Protein Needs</StatLabel><StatNumber>{Math.round(proteinNeeds)} g</StatNumber></Stat>
//               <Stat><StatLabel>BMI</StatLabel><StatNumber>{bmi.toFixed(2)}</StatNumber></Stat>
//             </StatGroup>

//             {/* Hydration Section */}
//             <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="blue.50">
//               <Heading size="md" mb={2}>Hydration Tracker</Heading>
//               <Text>Goal: {Math.round(dailyWaterGoal)} mL ({Math.round(dailyWaterGoal / 250)} glasses)</Text>
//               <Text>Consumed: {waterConsumed} mL ({waterIntake} glasses)</Text>
//               <Progress value={waterPercentage} size="lg" colorScheme="blue" mt={2} />
              
//               <HStack mt={3} spacing={4}>
//                 <IconButton 
//                   icon={<MinusIcon />} 
//                   aria-label="Decrease water intake" 
//                   isDisabled={waterIntake === 0} 
//                   onClick={() => setWaterIntake(prev => Math.max(prev - 1, 0))} 
//                 />
//                 <Text fontSize="xl">{waterIntake} glasses</Text>
//                 <IconButton 
//                   icon={<AddIcon />} 
//                   aria-label="Increase water intake" 
//                   onClick={() => setWaterIntake(prev => prev + 1)} 
//                 />
//               </HStack>
//             </Box>

//             <Button mt={4} colorScheme="green" onClick={() => navigate('/profile-setup', { state: { profile } })}>
//               Edit Profile
//             </Button>
//           </Box>
//         </VStack>
//       </Container>
//     </Sidenav>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from 'react';
// import { Container, VStack, Heading, Box, Stat, StatLabel, StatNumber, StatGroup, Button, Spinner, Progress, Input, Text } from "@chakra-ui/react";
// import { Sidenav } from "../../Components/Sections";
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from "../../utils/axiosInstance";

// const Dashboard: React.FC = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axiosInstance.get('/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(response.data.userProfile);
//       } catch (error) {
//         console.error('Error fetching profile', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!profile) {
//     return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />;
//   }

//   // Calculate hydration needs (liters per day)
//   const calculateHydrationNeeds = (weight: number, activityLevel: string) => {
//     let baseWater = weight * 0.033; // 33ml per kg of body weight
//     if (activityLevel === 'active' || activityLevel === 'very active') {
//       baseWater += 0.5; // Extra 500ml for active people
//     }
//     return baseWater * 1000; // Convert to milliliters
//   };

//   const hydrationNeeds = calculateHydrationNeeds(profile.weight, profile.activityLevel);
//   const waterPercentage = Math.min((waterIntake / hydrationNeeds) * 100, 120); // Cap at 120%

//   const getHydrationMessage = () => {
//     if (waterPercentage < 30) return "Need to drink more water!";
//     if (waterPercentage >= 70 && waterPercentage <= 100) return "Keep it up!";
//     if (waterPercentage > 100) return "Too much is also bad!";
//     return "";
//   };

//   return (
//     <Sidenav> 
//       <Container maxW="container.lg" py={6}>
//         <VStack gap={4} align="center">
//           <Heading color="var(--dark-green)">Dashboard</Heading>
//           <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="var(--soft-white)" width="100%">
//             <StatGroup>
//               <Stat><StatLabel>Name</StatLabel><StatNumber>{profile.name}</StatNumber></Stat>
//               <Stat><StatLabel>Age</StatLabel><StatNumber>{profile.age}</StatNumber></Stat>
//               <Stat><StatLabel>Gender</StatLabel><StatNumber>{profile.gender}</StatNumber></Stat>
//               <Stat><StatLabel>Activity Level</StatLabel><StatNumber>{profile.activityLevel}</StatNumber></Stat>
//               <Stat><StatLabel>Height</StatLabel><StatNumber>{profile.height} cm</StatNumber></Stat>
//               <Stat><StatLabel>Weight</StatLabel><StatNumber>{profile.weight} kg</StatNumber></Stat>
//             </StatGroup>

//             {/* Hydration Bar */}
//             <Box mt={6}>
//               <Heading size="md" mb={2}>Hydration Tracker</Heading>
//               <Input 
//                 placeholder="Enter glasses of water (250ml each)" 
//                 type="number"
//                 onChange={(e) => setWaterIntake(Number(e.target.value) * 250)}
//               />
//               <Progress value={waterPercentage} size="lg" colorScheme="blue" mt={2} />
//               <Text mt={2} fontSize="sm" fontWeight="bold">{getHydrationMessage()}</Text>
//             </Box>

//             <Button mt={4} colorScheme="green" onClick={() => navigate('/profile-setup', { state: { profile } })}>
//               Edit Profile
//             </Button>
//           </Box>
//         </VStack>
//       </Container>
//     </Sidenav>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Container, VStack, Heading, Box, Stat, StatLabel, StatNumber, StatGroup, Button, Spinner, Progress, Text, HStack } from "@chakra-ui/react";
import { Sidenav } from "../../Components/Sections";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance";

const Dashboard: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/api/user/profile', {
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
    return <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />;
  }

  // Calculate BMR using the Harris-Benedict equation
  const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  // Adjust BMR based on activity level to get TDEE
  const calculateTDEE = (bmr: number, activityLevel: string) => {
    switch (activityLevel) {
      case 'light':
        return bmr * 1.375;
      case 'moderate':
        return bmr * 1.55;
      case 'active':
        return bmr * 1.725;
      case 'very active':
        return bmr * 1.9;
      default:
        return bmr;
    }
  };

  // Estimate daily protein needs (grams per kilogram of body weight)
  const calculateProteinNeeds = (weight: number) => {
    return weight * 1.6; // 1.6 grams of protein per kilogram of body weight
  };

  // Calculate BMI
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100; // Convert height to meters
    return weight / (heightInMeters * heightInMeters);
  };

  // Calculate hydration needs (liters per day)
  const calculateHydrationNeeds = (weight: number, activityLevel: string) => {
    let baseWater = weight * 0.033; // 33ml per kg of body weight
    if (activityLevel === 'active' || activityLevel === 'very active') {
      baseWater += 0.5; // Extra 500ml for active people
    }
    return baseWater * 1000; // Convert to milliliters
  };

  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
  const tdee = calculateTDEE(bmr, profile.activityLevel);
  const proteinNeeds = calculateProteinNeeds(profile.weight);
  const bmi = calculateBMI(profile.weight, profile.height);
  const hydrationNeeds = calculateHydrationNeeds(profile.weight, profile.activityLevel);
  const waterPercentage = Math.min((waterIntake / hydrationNeeds) * 100, 120); // Cap at 120%

  const getHydrationMessage = () => {
    if (waterPercentage < 30) return "Need to drink more water!";
    if (waterPercentage >= 70 && waterPercentage <= 100) return "Keep it up!";
    if (waterPercentage > 100) return "Too much is also bad!";
    return "";
  };

  const handleWaterChange = (amount: number) => {
    setWaterIntake((prev) => Math.max(0, prev + amount)); // Prevent negative intake
  };

  return (
    <Sidenav> 
      <Container maxW="container.lg" py={6}>
        <VStack gap={4} align="center">
          <Heading color="var(--dark-green)">Dashboard</Heading>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="var(--soft-white)" width="100%">
            <StatGroup>
              <Stat><StatLabel>Name</StatLabel><StatNumber>{profile.name}</StatNumber></Stat>
              <Stat><StatLabel>Age</StatLabel><StatNumber>{profile.age}</StatNumber></Stat>
              <Stat><StatLabel>Gender</StatLabel><StatNumber>{profile.gender}</StatNumber></Stat>
              <Stat><StatLabel>Activity Level</StatLabel><StatNumber>{profile.activityLevel}</StatNumber></Stat>
              <Stat><StatLabel>Height</StatLabel><StatNumber>{profile.height} cm</StatNumber></Stat>
              <Stat><StatLabel>Weight</StatLabel><StatNumber>{profile.weight} kg</StatNumber></Stat>
              <Stat><StatLabel>Daily Calorie Needs</StatLabel><StatNumber>{Math.round(tdee)} kcal</StatNumber></Stat>
              <Stat><StatLabel>Daily Protein Needs</StatLabel><StatNumber>{Math.round(proteinNeeds)} g</StatNumber></Stat>
              <Stat><StatLabel>BMI</StatLabel><StatNumber>{bmi.toFixed(2)}</StatNumber></Stat>
            </StatGroup>

            {/* Hydration Bar */}
            <Box mt={6}>
              <Heading size="md" mb={2}>Hydration Tracker</Heading>
              <HStack>
                <Button colorScheme="blue" onClick={() => handleWaterChange(-250)}>-</Button>
                <Text fontSize="lg">{(waterIntake / 250)} glasses</Text>
                <Button colorScheme="blue" onClick={() => handleWaterChange(250)}>+</Button>
              </HStack>
              <Progress value={waterPercentage} size="lg" colorScheme="blue" mt={2} />
              <Text mt={2} fontSize="sm" fontWeight="bold">{getHydrationMessage()}</Text>
            </Box>

            {/* Display Daily Water Intake */}
            <Box mt={6}>
              <StatGroup>
                <Stat>
                  <StatLabel>Daily Water Intake</StatLabel>
                  <StatNumber>{Math.round(waterIntake / 1000)} L / {Math.round(hydrationNeeds / 1000)} L</StatNumber>
                </Stat>
              </StatGroup>
            </Box>

            <Button mt={4} colorScheme="green" onClick={() => navigate('/profile-setup', { state: { profile } })}>
              Edit Profile
            </Button>
          </Box>
        </VStack>
      </Container>
    </Sidenav>
  );
};

export default Dashboard;
