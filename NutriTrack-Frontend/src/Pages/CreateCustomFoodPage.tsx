import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
  List,
  ListItem,
  Heading,
  Text,
} from "@chakra-ui/react";

const CreateCustomFoodPage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [storedFoodItems, setStoredFoodItems] = useState([]);
  const [formData, setFormData] = useState({
    foodName: "",
    servingUnit: "",
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
    fiber: "",
  });

  useEffect(() => {
    fetch("http://localhost:7001/getCustomFood")
      .then((response) => response.json())
      .then((data) => setStoredFoodItems(data))
      .catch((error) => console.error("Error fetching custom foods:", error));
  }, []);

  const allFoodItems = [...storedFoodItems, ...foodItems];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.foodName || !formData.servingUnit || !formData.calories) {
      alert("Food name, serving unit, and calories are required!");
      return;
    }

    const requestBody = {
      userId: "6792c1e74bfde7cb9da062de",
      foodName: formData.foodName,
      details: {
        calories: Number(formData.calories),
        protein: Number(formData.protein) || 0,
        carbohydrates: Number(formData.carbohydrates) || 0,
        fat: Number(formData.fat) || 0,
        fiber: Number(formData.fiber) || 0,
      },
      servingUnit: formData.servingUnit,
    };

    try {
      const response = await fetch("http://localhost:7001/customFood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to add food item");

      const responseData = await response.json();
      if (responseData.success && responseData.data) {
        setFoodItems((prevFoodItems) => [...prevFoodItems, responseData.data]);
      }

      onClose();
      setFormData({ foodName: "", servingUnit: "", calories: "", protein: "", carbohydrates: "", fat: "", fiber: "" });
    } catch (error) {
      console.error(error);
      alert("Error adding food item.");
    }
  };

  return (
    <Box textAlign="center" p={6}>
      <Text fontSize="2xl" fontWeight="bold">Create Your Own Meal</Text>
      <Button colorScheme="blue" onClick={onOpen} mt={4}>
        Create a Meal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Food Item</ModalHeader>
          <ModalBody>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <FormControl key={key} isRequired={key === "foodName" || key === "servingUnit" || key === "calories"}>
                  <FormLabel textTransform="capitalize">{key.replace(/([A-Z])/g, " $1")}</FormLabel>
                  <Input
                    type={key === "calories" || key === "protein" || key === "carbohydrates" || key === "fat" || key === "fiber" ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </FormControl>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
              Add Food Item
            </Button>
            <Button onClick={onClose} ml={3} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      
      {/* Display Added Food Items */}
      <Heading size="md" mt={5}>Added Food Items</Heading>
      <List spacing={3} mt={3}>
        {allFoodItems.length === 0 ? (
          <Box>No food items added yet.</Box>
        ) : (
          allFoodItems.map((food, index) => (
            <ListItem
              key={index}
              p={3}
              borderWidth={1}
              borderRadius="md"
              cursor="pointer"
              onClick={() => navigate(`/track-food/${food._id}`)}
              _hover={{ bg: "gray.100" }}
            >
              <strong>{food.foodName}</strong> - {food.details.calories} cal per {food.servingUnit}
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default CreateCustomFoodPage;