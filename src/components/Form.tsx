import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Player from Lottie
const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

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
  loading?: boolean; // Make loading optional
}

const Form = ({
  setRecipe,
  setImage,
  setError,
  setLoading,
  loading = false,
}: FormProps) => {
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
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation when done
    }
  };

  return (
    <div>
      {/* Form to submit ingredients */}
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

      {/* Show Lottie animation during loading */}
      {loading && (
        <LottiePlayer
          autoplay
          loop
          src="/loadanimation.json" // Assuming the JSON is in the public folder
          style={{ height: "150px", width: "150px" }}
        />
      )}
    </div>
  );
};

export default Form;
