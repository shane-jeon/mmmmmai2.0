import React, { useState } from "react";

// Define the API response structure
interface RecipeResponse {
  recipe?: string;
  error?: string;
}

// Define the props for the Form component
interface FormProps {
  setRecipe: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form = ({ setRecipe, setImage, setError, setLoading }: FormProps) => {
  const [ingredients, setIngredients] = useState<string>("");

  // Handle the form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setRecipe("");
    setImage(""); // Clear previous image
    setLoading(true);

    try {
      // Step 1: Get the recipe from /api/recipe
      const recipeResponse = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: ingredients }),
      });

      // Safely cast the response to the expected type (RecipeResponse)
      const recipeData: RecipeResponse = await recipeResponse.json();

      if (!recipeResponse.ok) {
        setError(recipeData.error || "Failed to generate recipe");
        setLoading(false);
        return;
      }

      const generatedRecipe = recipeData.recipe || "";
      setRecipe(generatedRecipe);

      // Step 2: Use the generated recipe to call /generated_image API
      const imageResponse = await fetch(`/api/generated_image?recipe=${encodeURIComponent(generatedRecipe)}`);

      if (!imageResponse.ok) {
        setError("Failed to generate image");
        setLoading(false);
        return;
      }

      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImage(imageUrl); // Set the image URL for display in Results
    } catch (error) {
      console.error("Error:", error);
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
      <button type="submit">Generate Recipe and Image</button>
    </form>
  );
};

export default Form;
