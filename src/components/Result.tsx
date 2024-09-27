import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Player from Lottie
const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

// Define the props for the Result component
interface ResultProps {
  recipe: string;
  image: string;
  error: string;
  loading: boolean;
}

// Helper function to parse the recipe content
const parseRecipe = (recipe: string) => {
  // Extract title (between **), first sentence, ingredients, and instructions
  const titleMatch = recipe.match(/\*\*(.*?)\*\*/); // Match title
  const firstSentenceMatch = recipe.match(/\*\*.*?\*\*(.*?)(?=Ingredients:)/s); // Match first sentence
  const ingredientsMatch = recipe.match(/Ingredients:(.*?)(Instructions:)/s); // Match ingredients
  const instructionsMatch = recipe.match(/Instructions:(.*)/s); // Match instructions

  const title = titleMatch ? titleMatch[1].trim() : "Recipe";
  const firstSentence = firstSentenceMatch ? firstSentenceMatch[1].trim() : "";
  const ingredients = ingredientsMatch
    ? ingredientsMatch[1].trim().split("*").filter(Boolean)
    : [];
  const instructions = instructionsMatch
    ? instructionsMatch[1].trim().split("\n").filter(Boolean)
    : [];

  return { title, firstSentence, ingredients, instructions };
};

const Result = ({ recipe, image, error, loading }: ResultProps) => {
  // Handle loading state with Lottie animation
  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-72 w-72 items-center justify-center">
          <LottiePlayer
            autoplay
            loop
            src="/loadanimation.json" // Assuming the JSON is in the public folder
            style={{ height: "400px", width: "400px" }}
          />
        </div>
        <p className="text-xl">
          Whipping up your culinary disaster... please wait!
        </p>
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  // Parse the recipe for structured content
  const { title, firstSentence, ingredients, instructions } =
    parseRecipe(recipe);

  return (
    <div className="flex h-screen flex-col items-center justify-center px-5">
      {image && (
        <>
          <h2 className="mb-6 text-3xl">Recipe</h2>
          <div className="mx-auto flex h-[420px] w-[420px] items-center justify-center rounded-lg border-2 border-gray-300 bg-white p-4">
            <img
              src={image}
              alt="Generated recipe"
              className="h-[400px] w-[400px] rounded-md object-contain"
            />
          </div>
        </>
      )}

      {/* Recipe Details */}
      {recipe && (
        <div className="mt-5 h-80 w-full overflow-auto px-12 py-8 font-serif">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-2 text-xl italic">{firstSentence}</p>

          {/* Ingredients */}
          <h3 className="mt-5 text-left font-serif text-2xl font-semibold">
            Ingredients:
          </h3>
          <ul className="mt-3 list-inside list-disc text-left">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.trim()}</li>
            ))}
          </ul>

          {/* Divider */}
          {ingredients.length > 0 && instructions.length > 0 && (
            <div className="my-4 w-full border-t-2 border-gray-300"></div>
          )}

          {/* Instructions */}
          <h3 className="mt-5 text-left font-serif text-2xl font-semibold">
            Instructions:
          </h3>
          <ol className="mt-3 list-inside text-left">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction.trim()}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Result;
