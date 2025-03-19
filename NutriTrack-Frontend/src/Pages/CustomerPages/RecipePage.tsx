import React, { useState } from 'react';
import { Input, Select, Button, Box, Image, Text, SimpleGrid } from '@chakra-ui/react';
import { fetchMealsByName, fetchMealsByFilter, fetchRecipeDetails, fetchCategoriesByName } from '@/Services/recipeAPI';
import { Sidenav } from '@/Components/Sections';

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions?: string;
}

const RecipePage: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [filterType, setFilterType] = useState<'category' | 'area'>('category');
    const [filterValue, setFilterValue] = useState<string>('');
    const [meals, setMeals] = useState<Meal[]>([]);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [areas, setAreas] = useState<string[]>([]);

    const searchMeals = async () => {
        const meals = await fetchMealsByName(query);
        setMeals(meals);
    };

    const filterMeals = async () => {
        const meals = await fetchMealsByFilter(filterType, filterValue);
        setMeals(meals);
    };

    const getMealDetails = async (id: string) => {
        const meal = await fetchRecipeDetails(id);
        setSelectedMeal(meal);
    };

    const getCategories = async () => {
        const categories = await fetchCategoriesByName();
        setCategories(categories);
    };

    return (
        <Sidenav>
        <Box p={5}>
            <Box display="flex" gap={3} mb={5}>
                <Input placeholder="Search meal by name" value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button onClick={searchMeals} colorScheme="green">Search</Button>
            </Box>
            <Box display="flex" gap={3} mb={5}>
                <Select onChange={(e) => setFilterType(e.target.value as 'category' | 'area')}>
                    <option value="category">Category</option>
                    <option value="area">Area</option>
                </Select>
                {filterType === 'category' && (
                    <Select onChange={(e) => setFilterValue(e.target.value)} placeholder="Select Category">
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </Select>
                )}
                <Input placeholder="Enter filter value" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                <Button onClick={filterMeals} colorScheme="green">Filter</Button>
            </Box>
            <SimpleGrid columns={3} spacing={5}>
                {meals.map(meal => (
                    <Box key={meal.idMeal} onClick={() => getMealDetails(meal.idMeal)} cursor="pointer" p={3} borderWidth={1} borderRadius="lg">
                        <Image src={meal.strMealThumb} alt={meal.strMeal} />
                        <Text mt={2} fontWeight="bold">{meal.strMeal}</Text>
                    </Box>
                ))}
            </SimpleGrid>
            {selectedMeal && (
                <Box mt={5} p={5} borderWidth={1} borderRadius="lg">
                    <Text fontSize="2xl" fontWeight="bold">{selectedMeal.strMeal}</Text>
                    <Image src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
                    <Text mt={3}>{selectedMeal.strInstructions}</Text>
                </Box>
            )}
        </Box>
        </Sidenav>
    );
};

export default RecipePage;
