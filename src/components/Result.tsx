import React from "react";

// Define the props for the Result component
interface ResultProps {
  recipe: string;
  image: string; // Add image to the interface
  error: string;
  loading: boolean;
}

const Result = ({ recipe, image, error, loading }: ResultProps) => {
  if (loading) {
    return <p>Loading your terrible recipe and image...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      {recipe && (
        <>
          <h3>Generated Recipe:</h3>
          <p>{recipe}</p>
        </>
      )}

      {image && (
        <>
          <h3>Generated Image:</h3>
          <img src={image} alt="Generated recipe" />
        </>
      )}
    </div>
  );
};

export default Result;
