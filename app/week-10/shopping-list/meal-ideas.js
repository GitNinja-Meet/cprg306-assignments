"use client";
import { useState, useEffect } from 'react';

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Fetch meal ideas based on the ingredient
  const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  };

  // Fetch meal details based on meal ID
  const fetchMealDetails = async (idMeal) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  };

  const loadMealIdeas = async () => {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
    setSelectedMeal(null); // Reset selected meal when ingredient changes
  };

  // Load meal ideas when the ingredient changes
  useEffect(() => {
    if (ingredient) loadMealIdeas();
  }, [ingredient]);

  // Load selected meal details
  const handleMealClick = async (meal) => {
    const mealDetails = await fetchMealDetails(meal.idMeal);
    setSelectedMeal(mealDetails);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Meal Ideas for {ingredient}</h2>
      <ul className="grid grid-cols-2 gap-4">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className={`p-2 bg-gray-800 rounded-lg ${selectedMeal && selectedMeal.idMeal === meal.idMeal ? 'bg-orange-600' : ''}`}
            onClick={() => handleMealClick(meal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-24 object-cover rounded-lg mb-2" />
            <p className="text-white text-center">{meal.strMeal}</p>
          </li>
        ))}
      </ul>
      {selectedMeal && (
        <div className="mt-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-2">{selectedMeal.strMeal}</h3>
          <p className="text-white mb-2">Category: {selectedMeal.strCategory}</p>
          <p className="text-white mb-2">Area: {selectedMeal.strArea}</p>
          <h4 className="text-white font-semibold">Ingredients:</h4>
          <ul className="text-white list-disc list-inside mb-2">
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = selectedMeal[`strIngredient${i + 1}`];
              const measure = selectedMeal[`strMeasure${i + 1}`];
              return ingredient ? <li key={i}>{`${ingredient} - ${measure}`}</li> : null;
            })}
          </ul>
          <p className="text-white mt-2">{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}
