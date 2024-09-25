"use client";
import { useState } from "react";

interface RecipeResponse {
  recipe: string; // Defines the structure of the API response
}

export default function GenerateRecipe() {
  const [prompt, setPrompt] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateRecipe = async () => {
    if (!prompt) {
      setError("Please enter some ingredients or a recipe idea.");
      return;
    }

    setLoading(true);
    setError("");
    setRecipe("");

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      // Tell TypeScript that the response conforms to the RecipeResponse type
      const data: RecipeResponse = await response.json();
      setRecipe(data.recipe); // Set the recipe from the response
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError("Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Generate the Worst Recipe</h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter ingredients or a recipe idea"
      />
      <button onClick={handleGenerateRecipe} disabled={loading}>
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {recipe && (
        <div>
          <h2>Generated Recipe:</h2>
          <p>{recipe}</p>
        </div>
      )}
    </div>
  );
}
