import {
    fetchMealsByName,
    fetchMealsByFilter,
    fetchRecipeDetails,
    fetchCategoriesByName,
    fetchArea,
  } from "../../Services/recipeAPI"; 
 
  global.fetch = jest.fn(); 
  
  describe('API Functions', () => {
    beforeEach(() => {
      jest.clearAllMocks(); 
    });
  
    test('fetchMealsByName fetches meals successfully', async () => {
      const mockResponse = { meals: [{ idMeal: '123', strMeal: 'Test Meal' }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const result = await fetchMealsByName('test');
      expect(result).toEqual(mockResponse.meals);
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=test'
      );
    });
  
    test('fetchMealsByName returns empty array on failure', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
  
      const result = await fetchMealsByName('test');
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalled();
    });
  
    test('fetchMealsByFilter fetches meals by category', async () => {
      const mockResponse = { meals: [{ idMeal: '123', strMeal: 'Filtered Meal' }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const result = await fetchMealsByFilter('category', 'Seafood');
      expect(result).toEqual(mockResponse.meals);
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
      );
    });
  
    test('fetchMealsByFilter fetches meals by area', async () => {
      const mockResponse = { meals: [{ idMeal: '456', strMeal: 'Area Meal' }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const result = await fetchMealsByFilter('area', 'Italian');
      expect(result).toEqual(mockResponse.meals);
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian'
      );
    });
  
    test('fetchRecipeDetails fetches recipe details', async () => {
      const mockResponse = { meals: [{ idMeal: '123', strMeal: 'Recipe Meal' }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });
  
      const result = await fetchRecipeDetails('123');
      expect(result).toEqual(mockResponse.meals[0]);
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/lookup.php?i=123'
      );
    });
  
    test('fetchRecipeDetails returns null on failure', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
  
      const result = await fetchRecipeDetails('123');
      expect(result).toBeNull();
      expect(fetch).toHaveBeenCalled();
    });
  
    // test('fetchCategoriesByName fetches categories', async () => {
    //   const mockResponse = { meals: [{ strCategory: 'Category1' }, { strCategory: 'Category2' }] };
    //   (fetch as jest.Mock).mockResolvedValueOnce({
    //     json: jest.fn().mockResolvedValueOnce(mockResponse),
    //   });
  
    //   const result = await fetchCategoriesByName();
    //   expect(result).toEqual(['Category1', 'Category2']);
    //   expect(fetch).toHaveBeenCalledWith(
    //     'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    //   );
    // });
  
    // test('fetchArea fetches area names', async () => {
    //   const mockResponse = { meals: [{ strArea: 'Area1' }, { strArea: 'Area2' }] };
    //   (fetch as jest.Mock).mockResolvedValueOnce({
    //     json: jest.fn().mockResolvedValueOnce(mockResponse),
    //   });
  
    //   const result = await fetchArea();
    //   expect(result).toEqual(['Area1', 'Area2']);
    //   expect(fetch).toHaveBeenCalledWith(
    //     'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
    //   );
    // });
  
    test('fetchCategoriesByName returns empty array on failure', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
  
      const result = await fetchCategoriesByName();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalled();
    });
  
    test('fetchArea returns empty array on failure', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));
  
      const result = await fetchArea();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalled();
    });
  });
  