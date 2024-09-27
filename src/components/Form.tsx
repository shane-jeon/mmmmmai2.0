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
    setLoading(true); // Start loading animation

    try {
      // Step 1: Get the recipe from /api/recipe
      const recipeResponse = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: ingredients }),
      });

      const recipeData: RecipeResponse = await recipeResponse.json();

      if (!recipeResponse.ok) {
        setError(recipeData.error || "Failed to generate recipe");
        setLoading(false); // Stop loading animation
        return;
      }

      const generatedRecipe = recipeData.recipe || "";
      setRecipe(generatedRecipe);

      // Step 2: Use the generated recipe to call /generated_image API
      const imageResponse = await fetch(
        `/api/generated_image?recipe=${encodeURIComponent(generatedRecipe)}`
      );

      if (!imageResponse.ok) {
        setError("Failed to generate image");
        setLoading(false); // Stop loading animation
        return;
      }

      const imageBlob = await imageResponse.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImage(imageUrl); // Set the image URL for display in Results

      // Clear the input after submission
      setIngredients(""); // Reset the input field
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation when done
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Form to submit ingredients */}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <label htmlFor="ingredients" className="mb-4 block text-left text-xl">
          What ingredients do you have?:
        </label>
        <div className="mb-4 flex flex-col items-center font-poppins">
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Milk, eggs, flour, sugar..."
            className="placeholder-top-left mb-4 h-72 w-full rounded-md border-2 border-[#818181] p-2"
          />
          <button
            type="submit"
            className="w-full rounded bg-[#00464B] px-4 py-4 text-white hover:bg-blue-700">
            <p className="font-poppins text-2xl">Generate</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
