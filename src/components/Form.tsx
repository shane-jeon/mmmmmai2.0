import React, { useState } from "react";

// Define the API response structure
interface RecipeResponse {
  recipe?: string;
  error?: string;
}

// Define the props for the Form component
interface FormProps {
  setRecipe: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ setRecipe, setError, setLoading }: FormProps) => {
  const [ingredients, setIngredients] = useState<string>("");

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors and recipe
    setError("");
    setRecipe("");
    setLoading(true);

    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: ingredients }), // Send the ingredients
      });

      // Explicitly type the data as RecipeResponse
      const data: RecipeResponse = await response.json();

      if (response.ok) {
        setRecipe(data.recipe || "No recipe generated.");
      } else {
        setError(data.error || "Failed to generate recipe.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="ingredients">Ingredients:</label>
      <input
        type="text"
        id="ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients separated by commas"
      />
      <button type="submit">Generate Recipe</button>
    </form>
  );
};

export default Form;
