import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

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
      <div className="flex h-full w-full flex-col items-center justify-center border-2 border-green-900">
        <div className="flex h-72 w-72 items-center justify-center">
          <LottiePlayer
            autoplay
            loop
            src="/loadanimation.json" // Assuming the JSON is in the public folder
            style={{ height: "400px", width: "400px" }}
          />
        </div>
        <p className="text-center text-xl lg:text-2xl">
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
    <div className="mx-2">
      {image && (
        <>
          <h2 className="my-4 text-center text-3xl lg:my-6">Recipe</h2>
          <div className="mx-2 lg:flex lg:justify-center">
            <Image
              src={image}
              alt="Generated recipe"
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
        </>
      )}

      {/* Recipe Details */}
      {recipe && (
        <div className="pt-6">
          <div className="">
            <h2 className="text-center text-xl font-medium lg:text-4xl lg:tracking-wide">
              {title}
            </h2>
            <p className="pt-2 text-xl italic">{firstSentence}</p>

            <h3 className="ml-2 font-serif text-xl font-semibold lg:text-2xl">
              Ingredients:
            </h3>
            <ul className="ml-2 mt-1 list-inside list-disc text-left">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="lg:text-lg">
                  {ingredient.trim()}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          {ingredients.length > 0 && instructions.length > 0 && (
            <div className="my-4 w-full border-t-2 border-gray-300"></div>
          )}
          <div className="">
            {/* Instructions */}
            <h3 className="ml-2 mt-5 text-left font-serif text-xl font-semibold lg:mb-4 lg:text-2xl">
              Instructions:
            </h3>
            <ol className="mx-2 list-inside">
              {instructions.map((instruction, index) => (
                <li key={index} className="mb-1 lg:mb-3 lg:text-lg">
                  {instruction.trim()}
                </li>
              ))}
            </ol>
            <p className="font- py-6 text-center italic">
              * Please note there may be errors in rendering. If recipe does not
              appear, please try again.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
